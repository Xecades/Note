<script setup lang="ts">
import { computed, onMounted, onUpdated, ref } from "vue";
import { navigate, normalize_toc, ScrollListener } from "@/assets/ts/rightbar";
import { RIGHTBAR_STATUS } from "@/assets/ts/types";

import type { Ref } from "vue";
import type { HeaderRef } from "@/assets/ts/rightbar";
import type { RouteMeta } from "vite-plugin-vue-xecades-note";

const props = defineProps<{ status: RIGHTBAR_STATUS; toc: RouteMeta["toc"] }>();
const toc: Ref<HeaderRef[]> = computed(() => normalize_toc(props.toc));

const show_text: Ref<boolean> = ref(false);
const mouse = {
    enter: () => (show_text.value = true),
    leave: () => (show_text.value = false),
};

const in_view: Ref<number | null> = ref(null);
const sl: ScrollListener = new ScrollListener(in_view);

const registerScrollListener = () => {
    sl.reset();

    const headings = document.querySelectorAll(".heading");
    headings.forEach(sl.listen.bind(sl));
};

onUpdated(registerScrollListener);
onMounted(registerScrollListener);
</script>

<template>
    <!-- https://cn.vuejs.org/guide/built-ins/transition.html#transition-on-appear -->
    <Transition
        name="rightbar"
        appear
        v-if="status === RIGHTBAR_STATUS.SHOW && toc.length"
    >
        <div
            id="right"
            :key="$route.path"
            @mouseenter="mouse.enter"
            @mouseleave="mouse.leave"
        >
            <!-- https://cn.vuejs.org/guide/built-ins/transition.html#javascript-hooks -->
            <Transition name="bars">
                <!-- bar -->
                <div class="toc" v-if="!show_text">
                    <template v-for="(item, idx) in toc">
                        <div
                            class="bar"
                            :style="{ width: item.width }"
                            :class="{ active: idx === in_view }"
                        ></div>
                    </template>
                </div>

                <!-- detail -->
                <div class="toc" v-else>
                    <template v-for="(item, idx) in toc">
                        <a
                            class="detail"
                            :href="'#' + item.hash"
                            @click.prevent="navigate(item.hash)"
                            :style="{
                                marginRight: item.indent,
                                opacity: item.opacity,
                            }"
                            :class="{ 'active': idx === in_view, 'passed': idx < (in_view as number) }"
                        >
                            <span class="text">
                                <component :is="item.title" />
                            </span>
                            <span class="sign">
                                <font-awesome-icon
                                    :icon="['fas', 'caret-left']"
                                />
                            </span>
                        </a>
                    </template>
                </div>
            </Transition>
        </div>
    </Transition>
</template>

<style scoped lang="stylus">
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

$detail-title-indent = 0.5rem;
$detail-color = lighten($text-color, 10%);
$detail-color-passed = lighten($text-color, 55%);

$bar-height = 4px;
$bar-padding = 4px;
$bar-background-color = lighten(black, 88%);
$bar-active-background-color = lighten(black, 68%);

#right
    position: fixed;
    width: $width;
    height: $height;
    top: $offset-top;
    z-index: 100;
    left: "calc(100vw - %s)" % ($offset-right + $width); // To avoid scrollbar flickering

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
    margin-right: $toc-translate-offset; // To avoid flickering on hovering edges

:global(#right .toc .katex)
    font-size: 1rem;

:global(#right .toc code)
    font-family: $monospace;
    font-size: 0.85em;

:global(#right .toc em)
    font-style: italic;

:global(#right .toc strong)
    font-weight: bold;

.bar
    margin-top: $bar-padding;
    margin-left: auto;
    background-color: $bar-background-color;
    border-radius: 4px;
    height: $bar-height;
    transition: background-color 0.1s;

    &.active
        background-color: $bar-active-background-color;

.detail
    line-height: 1.6rem;
    transition: color 0.1s;
    margin-left: auto;
    display: inline-block;
    color: $detail-color;
    font-size: 0.95rem;
    position: relative;

    &.active
        color: $theme-color;

    &.passed
        color: $detail-color-passed;

    .sign
        color: $theme-color;
        opacity: 0;
        transition: opacity 0.1s;
        font-size: 0.7rem;
        display: block;
        float: inline-end;
        animation: shake-x 1s infinite ease-in-out;

    .text
        padding-right: $detail-title-indent;

    &:hover
        .text
            color: $theme-color;

        .sign
            opacity: 1;

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
