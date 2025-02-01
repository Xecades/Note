<script setup lang="ts">
import { computed, onMounted, onUpdated, ref } from "vue";
import { serial_toc, ScrollListener, cascade_toc } from "@/assets/ts/rightbar";
import { RIGHTBAR_STATUS } from "@/assets/ts/types";
import RightBarDetail from "./RightBarDetail.vue";

import type { Ref } from "vue";
import type { CascadeHeader, SerialHeader } from "@/assets/ts/rightbar";
import type { RouteMeta } from "vite-plugin-vue-xecades-note";

const props = defineProps<{ status: RIGHTBAR_STATUS; toc: RouteMeta["toc"] }>();
const s_toc: Ref<SerialHeader[]> = computed(() => serial_toc(props.toc));
const c_toc: Ref<CascadeHeader[]> = computed(() => cascade_toc(s_toc.value));

const show_text: Ref<boolean> = ref(false);
const mouse = {
    enter: () => (show_text.value = true),
    leave: () => (show_text.value = false),
};

const in_view: Ref<number> = ref(-1);
const sl = new ScrollListener(in_view);

const registerScrollListener = () => {
    sl.reset();
    document.querySelectorAll(".heading").forEach(sl.listen.bind(sl));
};

onUpdated(registerScrollListener);
onMounted(registerScrollListener);
</script>

<template>
    <!-- https://cn.vuejs.org/guide/built-ins/transition.html#transition-on-appear -->
    <Transition
        name="rightbar"
        appear
        v-if="status === RIGHTBAR_STATUS.SHOW && s_toc.length"
    >
        <div
            id="right"
            :key="$route.path"
            @mouseenter="mouse.enter"
            @mouseleave="mouse.leave"
            :style="{ '--z-index': show_text ? 1001 : 0 }"
        >
            <!-- https://cn.vuejs.org/guide/built-ins/transition.html#javascript-hooks -->
            <Transition name="bars">
                <!-- bar -->
                <div class="toc" v-if="!show_text">
                    <template v-for="(item, idx) in s_toc">
                        <div
                            class="bar"
                            :style="{ width: item.width }"
                            :class="{ active: idx === in_view }"
                        ></div>
                    </template>
                </div>

                <!-- detail -->
                <div class="toc" v-else>
                    <template v-for="item in c_toc">
                        <RightBarDetail
                            class="root"
                            :item="item"
                            :in_view="in_view"
                            :class="{
                                expand:
                                    item.children.length &&
                                    (item.index === in_view ||
                                        item.children.some(
                                            (c) => c.index === in_view
                                        )),
                            }"
                        />

                        <div class="subs-wrapper">
                            <div class="subs">
                                <RightBarDetail
                                    v-for="child in item.children"
                                    class="sub"
                                    :item="child"
                                    :in_view="in_view"
                                    :key="child.index"
                                />
                            </div>
                            <div class="indicator"></div>
                        </div>
                    </template>
                </div>
            </Transition>
        </div>
    </Transition>
</template>

<style lang="stylus">
@import "../assets/css/global.styl";

$offset-top = 10rem;
$offset-bottom = 5rem;
$offset-right = 51px;
$width = 270px;
$height = "calc(100vh - %s)" % ($offset-top + $offset-bottom);

$toc-gap = 15px;
$toc-padding = 0.5rem;
$toc-margin = 1.5rem;
$toc-offset-top = 11rem - $offset-top;
$toc-translate-offset = 7px;

$bar-height = 4px;
$bar-padding = 4px;

$indicator-margin = 4px;

#right
    scheme(--background-color, alpha($background-light, 90%), alpha($background-dark, 90%));
    scheme(--detail-color, lighten($text-color, 10%), $text-color-d);
    scheme(--detail-color-passed, lighten($text-color, 55%), darken($text-color-d, 50%));
    scheme(--bar-background-color, lighten(black, 88%), lighten(black, 28%));
    scheme(--bar-active-background-color, lighten(black, 68%), lighten(black, 65%));

    position: fixed;
    width: $width;
    height: $height;
    top: $offset-top;
    z-index: var(--z-index);

    // To avoid scrollbar flickering
    left: "calc(100vw - %s)" % ($offset-right + $width);

    .toc
        width: max-content;
        display: flex;
        flex-direction: column;
        gap: $toc-gap - 2 * $bar-padding;
        position: absolute;
        top: $toc-offset-top;
        right: 0;
        padding: $toc-padding;
        margin: $toc-margin;
        background-color: var(--background-color);
        border-radius: 4px;

        // To avoid flickering on hovering edges
        margin-right: $toc-translate-offset;

        .bar
            margin-top: $bar-padding;
            margin-left: auto;
            background-color: var(--bar-background-color);
            border-radius: 4px;
            height: $bar-height;
            transition: background-color 0.1s;

            &.active
                background-color: var(--bar-active-background-color);

        .root, .sub
            line-height: 1.4rem;
            transition: color 0.1s;
            margin-left: auto;
            display: inline-block;
            color: var(--detail-color);
            font-size: 0.95rem;
            position: relative;

            &.active
                color: $theme-color;

            &.passed:not(.expand)
                color: var(--detail-color-passed);

        .subs-wrapper
            position: relative;
            display: none;

            .subs
                display: flex;
                width: max-content;
                margin-left: auto;
                flex-direction: column;
                gap: $toc-gap - 2 * $bar-padding;

            .indicator
                top: $indicator-margin;
                right: 19px;
                width: 1.5px;
                height: "calc(100% - 2 * %dpx)" % $indicator-margin;
                background-color: var(--detail-color);
                opacity: 0.35;
                position: absolute;

        .root.expand + .subs-wrapper
            display: block;

        .text
            .katex
                font-size: 1rem;

            code
                font-family: $monospace;
                font-size: 0.85em;

            em
                font-style: italic;

            strong
                font-weight: bold;

.rightbar-enter-active,
.rightbar-leave-active
    transition-property: opacity;

.rightbar-enter-active
    transition-duration: 0.17s;
    transition-timing-function: ease-out;

.rightbar-leave-active
    transition-duration: 0.08s;
    transition-timing-function: cubic-bezier(0.15, 0.79, 0.69, 0.68);

.rightbar-enter-from,
.rightbar-leave-to
    opacity: 0;

.bars-enter-active,
.bars-leave-active
    transition-property: opacity, transform;

.bars-enter-active
    transition-duration: 0.17s;
    transition-timing-function: ease-out;

.bars-leave-active
    transition-duration: 0.08s;
    transition-timing-function: cubic-bezier(0.15, 0.79, 0.69, 0.68);

.bars-enter-from,
.bars-leave-to
    opacity: 0;
    transform: translateX($toc-translate-offset);
</style>
