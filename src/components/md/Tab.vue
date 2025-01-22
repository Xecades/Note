<script setup lang="ts">
import {
    computed,
    nextTick,
    onBeforeUnmount,
    onMounted,
    ref,
    useSlots,
    watch,
} from "vue";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import AnimateHeight from "vue-animate-height";

import type { Ref, VNodeRef } from "vue";
import type { JSX } from "vue/jsx-runtime";
import type { PartialOptions } from "overlayscrollbars";

type TabData = {
    title: JSX.Element[];
    content: JSX.Element[];
};

/** Map slots to tab data. */
const mapData = (parts: JSX.Element[]): TabData[] => {
    const res: TabData[] = [];

    for (const part of parts) {
        // @ts-expect-error
        if (part.type.__name === "Delimiter") {
            res.push({
                // @ts-expect-error
                title: part.children.default() as JSX.Element[],
                content: [],
            });
        } else {
            const last = res.length - 1;
            res[last].content.push(part);
        }
    }

    return res;
};

/** @see https://github.com/KingSora/OverlayScrollbars/ */
const osOptions: PartialOptions = {
    scrollbars: {
        autoHide: "move",
        autoHideDelay: 500,
    },
    overflow: { y: "visible-hidden" },
};

const active: Ref<number> = ref(0);
const height: Ref<number | "auto"> = ref("auto");

const target: VNodeRef = ref();
const listener: Ref<HTMLElement> = computed(() =>
    target.value.$el.querySelector(".tab-height-listener")
);

const parts: Ref<JSX.Element[]> = computed(() => useSlots().default!());
const data: Ref<TabData[]> = computed(() => mapData(parts.value));

const is_immensive: Ref<boolean> = ref(false);

let shifting = false;
let observer: ResizeObserver;

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

// If current tab is a single block, then set immensive mode.
watch(
    active,
    async () => {
        shifting = true;

        // Wait for the content to be rendered.
        await nextTick();
        const children = listener.value.children;

        is_immensive.value =
            children.length === 1 &&
            (children[0].classList.contains("block-code") ||
                children[0].classList.contains("quote") ||
                children[0].classList.contains("index-comp"));

        // Wait for immensive mode to be applied.
        await nextTick();
        height.value = listener.value.clientHeight;

        // Wait for animation to finish.
        await sleep(250);
        shifting = false;

        // For unknown reason when using block-code,
        // the height is not calculated correctly.
        height.value = listener.value.clientHeight;
    },
    { immediate: true }
);

onMounted(() => {
    const el: HTMLElement = listener.value;
    observer = new ResizeObserver(() => {
        if (shifting) return;
        height.value = "auto";
    });
    observer.observe(el);
});

onBeforeUnmount(() => {
    observer.disconnect();
});
</script>

<template>
    <div class="tab">
        <OverlayScrollbarsComponent
            element="div"
            :options="(osOptions as any)"
            class="header-container"
        >
            <div class="header">
                <div
                    class="item"
                    v-for="(tab, idx) in data"
                    @click="active = idx"
                    :class="{ active: idx === active }"
                >
                    <component :is="() => tab.title" />
                </div>
            </div>
        </OverlayScrollbarsComponent>
        <div class="content" :class="{ immensive: is_immensive }">
            <!-- @see https://www.npmjs.com/package/vue-animate-height -->
            <AnimateHeight
                ref="target"
                contentClass="tab-height-listener"
                :height="height"
            >
                <KeepAlive>
                    <component :is="() => data[active].content" />
                </KeepAlive>
            </AnimateHeight>
        </div>
    </div>
</template>

<style lang="stylus">
@import "../../assets/css/global.styl";

$header-height = 3rem;

// TODO 继续完成剩下的模块

.tab
    scheme(--border-color, #eaeaea, #2a2a2b);
    scheme(--header-color, #6d6e75, #b9bcc0);
    scheme(--content-background-color, #f9f9f9d4, #1b1c1d52);
    scheme(--header-background-color, #f4f4f4, #1a1a1a94);
    scheme(--title-hover-color, #e0e0e0, #242425);
    scheme(--title-underline-color, #9e9ea2, #5d5f61);

    margin: 2rem var(--block-extend);
    border: 1px solid var(--border-color);
    border-radius: 5px;
    overflow: hidden;

    .header-container
        height: $header-height;
        border-bottom: 1px solid var(--border-color);
        background-color: var(--header-background-color);

        .os-scrollbar-horizontal
            --os-size: 7px;

    .header
        display: flex;
        color: var(--header-color);
        height: $header-height;

        .item
            display: inline-block;
            padding: 0.5rem 1rem;
            line-height: $header-height - 1rem;
            font-size: 0.85em;
            flex-shrink: 0;
            transition: background-color 0.2s ease;
            position: relative;
            cursor: pointer;

            &:hover
                background-color: var(--title-hover-color);

            &::before
                content: "";
                text-decoration-color: transparent;
                transition: text-decoration-color 0.5s ease;

            &.active::before
                // A CSS hack to avoid skipping ink on specific tags :-)
                content: "............................................................................................................................................................................................................";
                user-select: none;
                color: transparent;
                width: calc(100% - 2rem);
                overflow: hidden;
                position: absolute;
                text-decoration-line: underline;
                text-underline-offset: 5px;
                text-decoration-style: wavy;
                text-decoration-color: var(--title-underline-color);

    .content
        --block-extend: 0;
        --listener-padding: 0.5rem 1.4rem;
        background-color: var(--content-background-color);

        &.immensive
            --listener-padding: 0;

            .block-code
                margin: 0;
                border: none;
                background: unset;

            .quote
                margin: 3rem 1.4rem;

            .index-comp
                margin: 2rem 1.4rem;

        .tab-height-listener
            padding: var(--listener-padding);
            // Fix margin collapse
            overflow: hidden;
</style>
