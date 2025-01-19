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
    <Transition name="rightbar" appear v-if="status === RIGHTBAR_STATUS.SHOW">
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

<style scoped>
* {
    --offset-top: 10rem;
    --offset-bottom: 5rem;
    --offset-right: 51px;

    --width: 270px;
    --height: calc(100vh - var(--offset-top) - var(--offset-bottom));
    --theme-color: #60a5fa;

    --toc-gap: 15px;
    --toc-padding: 0.5rem;
    --toc-margin: 1.5rem;
    --toc-offset-top: calc(11rem - var(--offset-top));

    --toc-background-image: linear-gradient(90deg, #f7f7f780, #f7f7f7f5);
    --toc-border-radius: 4px;
    --toc-translate-offset: 7px;

    --detail-color: #6e758c;
    --detail-title-indent: 0.5rem;

    --bar-background-color: #e3e2e0;
    --bar-active-background-color: #bdbbb8;

    --bar-height: 4px;
    --bar-padding: 4px;

    --detail-color-passed: #acb1c1;
}

@media (prefers-color-scheme: dark) {
    * {
        --theme-color: #87b3ea;
        --toc-background-image: linear-gradient(90deg, #1c1d1e80, #1c1d1ef5);

        --bar-background-color: #363636;
        --bar-active-background-color: #9e9e9e;

        --detail-color: #c4c6ce;
        --detail-color-passed: #5f6064;
    }
}

#right {
    position: fixed;
    width: var(--width);
    height: var(--height);
    top: var(--offset-top);
    z-index: 100;
    /** To avoid scrollbar flickering. */
    left: calc(100vw - var(--offset-right) - var(--width));
}

.toc {
    width: max-content;
    display: flex;
    flex-direction: column;
    gap: calc(var(--toc-gap) - 2 * var(--bar-padding));
    position: absolute;
    top: var(--toc-offset-top);
    right: 0;
    padding: var(--toc-padding);
    margin: var(--toc-margin);
    /** To avoid flickering on hovering edges */
    margin-right: var(--toc-translate-offset);
    background-image: var(--toc-background-image);
    border-radius: var(--toc-border-radius);
}

:global(#right .toc .katex) {
    font-size: 1rem;
}

:global(#right .toc code) {
    font-family: var(--monospace);
    font-size: 0.85em;
}

:global(#right .toc em) {
    font-style: italic;
}

:global(#right .toc strong) {
    font-weight: bold;
}

.bar {
    margin-top: var(--bar-padding);
    margin-left: auto;
    background-color: var(--bar-background-color);
    border-radius: 4px;
    height: var(--bar-height);
    transition: background-color 0.15s;
}

.bar.active {
    background-color: var(--bar-active-background-color);
}

.detail {
    line-height: 1.6rem;
    transition: color 0.15s;
    margin-left: auto;
    display: inline-block;
    color: var(--detail-color);
    font-size: 0.95rem;
    position: relative;
}

.detail.active {
    color: var(--theme-color);
}

.detail.passed {
    color: var(--detail-color-passed);
}

.detail .sign {
    color: var(--theme-color);
    opacity: 0;
    transition: opacity 0.1s;
    font-size: 0.7rem;
    display: block;
    float: inline-end;
    animation: shake-x 1s infinite ease-in-out;
}

.detail .text {
    padding-right: var(--detail-title-indent);
}

.detail:hover .text {
    color: var(--theme-color);
}

.detail:hover .sign {
    opacity: 1;
}

.rightbar-enter-active,
.rightbar-leave-active {
    transition-property: opacity;
}

.rightbar-enter-active {
    transition-duration: 0.37s;
    transition-timing-function: ease-out;
}

.rightbar-leave-active {
    transition-duration: 0.2s;
    transition-timing-function: cubic-bezier(0.15, 0.79, 0.69, 0.68);
}

.rightbar-enter-from,
.rightbar-leave-to {
    opacity: 0;
}

.bars-enter-active,
.bars-leave-active {
    transition-property: opacity, transform;
}

.bars-enter-active {
    transition-duration: 0.37s;
    transition-timing-function: ease-out;
}

.bars-leave-active {
    transition-duration: 0.2s;
    transition-timing-function: cubic-bezier(0.15, 0.79, 0.69, 0.68);
}

.bars-enter-from,
.bars-leave-to {
    opacity: 0;
    transform: translateX(var(--toc-translate-offset));
}
</style>
