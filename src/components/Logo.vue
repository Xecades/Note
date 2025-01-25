<script setup lang="ts">
import { sleep } from "@/assets/ts/utils";
import Vivus from "vivus";
import { onMounted } from "vue";

const paths = [
    "M91,8.93s-17.45,32.09-50.86,36.65S15.56,21.58,48.56,8.93,117.88-.96,98.55,33.29s-56.21,44.95-65.89,46.33S.25,81.49,2.11,68.77c.91-6.3,7.23-5.19,7.23-5.19",
    "M159.57,23.87s14.95-9.39,7.7-18.63c-5.92-7.01-61.84.77-82.38,60.89-12.3,35.18,12.92,53.76,57.26,44.82,27.1-5.86,32.01-23.03-7.92-24.5s-84.98,12.45-112.99,51.1",
    "M105.75,56.78s4.45,1.81,19.55-6.55,3.56-15.17-14.8,1.33c-18.36,16.5-11.09,30.75,27.54,2.16",
    "M157.1,47.97c5.01.37,8.47-7.36,1.02-6.51-3.42.39-10.82,3.39-16.77,8.85-7,6.42-12.13,15.65-8.37,19.14,6.1,5.22,27.66-11.15,31.43-14.71",
];
const svgs = [
    { duration: 25, start: 0, path: paths[0] },
    { duration: 30, start: 22, path: paths[1] },
    { duration: 19, start: 47, path: paths[2] },
    { duration: 19, start: 62, path: paths[3] },
];

const SPEED_NOR = 0.6;
const SPEED_REV = 1.2;

const play = (vivus: Vivus, speed: number) =>
    new Promise<void>((res) => vivus.play(speed, res));

onMounted(async () => {
    const vivus = new Vivus("logo-svg", {
        pathTimingFunction: Vivus.EASE,
        animTimingFunction: Vivus.EASE,
        type: "scenario",
        start: "manual",
    });

    while (true) {
        await play(vivus, SPEED_NOR);
        await sleep(7000);
        await play(vivus, -SPEED_REV);
    }
});
</script>

<template>
    <a
        id="logo"
        href="https://xecades.xyz/"
        target="_blank"
        title="点击跳转主页"
    >
        <svg
            id="logo-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 171.26 139.54"
        >
            <path
                :d="svg.path"
                :data-start="svg.start"
                :data-duration="svg.duration"
                v-for="svg in svgs"
            />
        </svg>
    </a>
</template>

<style scoped lang="stylus">
@import "../assets/css/global.styl";

$right = 40px;

#logo
    dual(--display, block, none);
    scheme(--invert, 0.45, 0.7);
    scheme(--hover-invert, 0.15, 0.9);

    display: var(--display);
    position: fixed;
    top: 35px;
    width: 50px;
    left: "calc(100vw - %dpx - 50px - 16px)" % $right;
    filter: invert(var(--invert));
    transition: filter 0.2s;

    &:hover
        filter: invert(var(--hover-invert));

    svg path
        fill: none;
        stroke: $text-color;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 5.5px;
</style>
