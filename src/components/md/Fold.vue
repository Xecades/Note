<script setup lang="ts">
import { onMounted, ref } from "vue";
import AnimateHeight from "vue-animate-height";

import type { Ref, VNodeRef } from "vue";
import type { JSX } from "vue/jsx-runtime";

type TYPE = "default" | "success" | "info" | "warning" | "danger";

const icon: Record<TYPE, string> = {
    default: "asterisk",
    success: "lightbulb",
    info: "info-circle",
    warning: "exclamation-circle",
    danger: "exclamation-triangle",
};

const props = defineProps<{
    expand?: boolean;
    always?: boolean;
    title?: JSX.Element;
    type?: TYPE;
}>();

const type: TYPE = props.type || "default";
const foldable: boolean = !(props.expand && props.always);
const expanded: Ref<boolean> = ref(props.expand || false);

const target: VNodeRef = ref();
const is_immensive: Ref<boolean> = ref(false);

onMounted(() => {
    const el: HTMLElement = target.value.$el.querySelector(
        ".fold-height-listener"
    )!;
    const children = el.children;

    is_immensive.value =
        children.length === 1 &&
        (children[0].classList.contains("block-code") ||
            children[0].classList.contains("quote") ||
            children[0].classList.contains("block-math"));
});
</script>

<template>
    <div class="fold colors" :class="type">
        <div
            class="header"
            :class="{ cursor: foldable }"
            @click="if (foldable) expanded = !expanded;"
        >
            <div class="icon">
                <font-awesome-icon :icon="icon[type]" />
            </div>
            <div class="title">
                <component :is="title" v-if="title" />
            </div>
            <div class="expand" v-if="foldable">
                <font-awesome-icon
                    :icon="['fas', 'angle-right']"
                    :style="{ transform: `rotate(${expanded ? 90 : 0}deg)` }"
                />
            </div>
        </div>

        <div class="content" :class="{ immensive: is_immensive }">
            <!-- @see https://www.npmjs.com/package/vue-animate-height -->
            <AnimateHeight
                ref="target"
                :height="expanded ? 'auto' : 0"
                contentClass="fold-height-listener"
            >
                <slot />
            </AnimateHeight>
        </div>
    </div>
</template>

<style lang="stylus">
@import "../../assets/css/global.styl";

.fold
    scheme(--header-color, lighten($text-color, 10%), darken($text-color-d, 3%));

    border-radius: 5px;
    margin: 2rem var(--block-extend);
    overflow: hidden;
    border: 1px solid var(--border-color);
    border-left: 4px solid var(--icon-color);

    .header
        display: flex;
        padding: 7px 8px;
        background-color: var(--background-color);
        user-select: none;

        &.cursor
            cursor: pointer;

        .title
            flex: 1;
            font-size: 0.9em;
            color: var(--header-color);

        .icon,
        .expand
            font-size: 1.1em;
            text-align: center;
            width: 36px;
            color: var(--icon-color);

        .icon
            margin-right: 7px;

        .expand
            margin-left: 7px;

            svg
                transition: transform 0.2s ease;

    .content
        --wrapper-padding: 0.8em 1.4em;
        overflow: hidden;

        .fold-height-listener
            --block-extend: 0;
            padding: var(--wrapper-padding);

        &.immensive
            --wrapper-padding: 0;

            .block-code
                margin: 0;
                border: none;
                background: unset;

            .quote
                margin: 3rem 1.4rem;

            .katex-display
                margin: 0.3em 0;
</style>
