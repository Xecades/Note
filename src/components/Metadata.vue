<script setup lang="ts">
import { isSmallScreen, shuffle } from "@/assets/ts/utils";
import { throttle } from "throttle-debounce";
import confetti from "canvas-confetti";

import type { RouteMeta } from "vite-plugin-vue-xecades-note";

defineProps<{
    type: RouteMeta["type"];
    breadcrumb: RouteMeta["breadcrumb"];
}>();

const playConfetti = throttle(1500, () => {
    if (isSmallScreen()) return;

    // Code from https://www.kirilv.com/canvas-confetti/

    const defaults: confetti.Options = { particleCount: 3, spread: 55 };
    const colors = [
        "#26ccff",
        "#a25afd",
        "#ff5e7e",
        "#88ff5a",
        "#fcff42",
        "#ffa62d",
        "#ff36ff",
    ];

    const end = Date.now() + 2 * 1000;
    const frame = () => {
        shuffle(colors);
        confetti({ ...defaults, colors, angle: 60, origin: { x: 0, y: 0.7 } });
        confetti({ ...defaults, colors, angle: 120, origin: { x: 1, y: 0.7 } });

        if (Date.now() < end) requestAnimationFrame(frame);
    };

    frame();
});
</script>

<template>
    <div id="metadata">
        <span class="breadcrumb" v-if="breadcrumb.length !== 0">
            <template v-for="(item, index) in breadcrumb" :key="index">
                <router-link :to="item.link" class="text">
                    <span class="back" v-if="breadcrumb.length === 1">
                        <font-awesome-icon :icon="['fas', 'chevron-left']" />
                    </span>
                    {{ item.title }}
                </router-link>
                <span class="icon" v-if="index !== breadcrumb.length - 1">
                    <font-awesome-icon :icon="['fas', 'chevron-right']" />
                </span>
            </template>
        </span>

        <span class="root" v-else @click="playConfetti">
            <span class="text">惟学无际，际于天地。</span>
        </span>
    </div>
</template>

<style scoped lang="stylus">
@import "../assets/css/global.styl";

$header-main-spacing = 2.3rem;
$height = 1.5rem;

$breadcrumb-hover-color = $theme-color;

#metadata
    scheme(--breadcrumb-color, lighten($text-color, 30%), darken($text-color-d, 25%));

    margin: 0rem var(--margin-lr) $header-main-spacing;
    user-select: none;

.breadcrumb, .root
    display: inline-flex;
    height: $height;
    line-height: $height;
    margin-left: 2px;

    .icon, .text
        display: inline-block;
        color: var(--breadcrumb-color);

    .icon
        width: 20px;
        text-align: center;
        font-size: 0.7rem;
        opacity: 0.85;

    .text
        cursor: pointer;
        font-size: 0.9rem;
        transition: color 0.1s ease;

        .back
            font-size: 0.8rem;
            opacity: 0.85;

        &:hover
            color: $breadcrumb-hover-color;
</style>
