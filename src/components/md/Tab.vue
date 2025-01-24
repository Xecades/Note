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
    scrollbars: { autoHide: "move", autoHideDelay: 500 },
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
        <div class="header-wrapper">
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
        </div>
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

$header-height = 2.8rem;

.tab
    scheme(--border-color, lighten(black, 89%), cyan);
    scheme(--header-border-color, lighten(black, 91%), cyan);
    scheme(--header-color, lighten($text-color, 44%), cyan);
    scheme(--header-active-color, $text-color, cyan);
    scheme(--header-active-border, lighten($text-color, 30%), cyan);
    scheme(--header-background-color, alpha(black, 3%), cyan);
    scheme(--title-hover-color, lighten(black, 92%), cyan);

    margin: 1.5em var(--block-extend);
    border: 1px solid var(--border-color);
    border-radius: 3px;
    overflow: hidden;

    > .header-wrapper
        padding: 0 0.8em;
        background-color: var(--header-background-color);

        > .header-container
            height: $header-height;
            border-bottom: 1px solid var(--header-border-color);

            .os-scrollbar-horizontal
                --os-size: 7px;
                bottom: -2px;

        > .header-container .header
            display: flex;
            color: var(--header-color);
            height: $header-height;

            > .item
                display: inline-block;
                padding: 0 0.9rem;
                line-height: $header-height;
                font-size: 0.8em;
                flex-shrink: 0;
                transition: background-color 0.06s ease;
                position: relative;
                cursor: pointer;

                &:hover
                    background-color: var(--title-hover-color);

                &.active
                    color: var(--header-active-color);
                    border-bottom: 1.5px solid var(--header-active-border);

    > .content
        --block-extend: 0;
        --listener-padding: 0.5rem 1.4rem;

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

        > div > .tab-height-listener
            padding: var(--listener-padding);
            // Fix margin collapse
            overflow: hidden;
</style>
