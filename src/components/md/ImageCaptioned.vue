<script setup lang="ts">
import mediumZoom from "medium-zoom";
import { onBeforeUnmount, onMounted, ref } from "vue";

import type { Ref } from "vue";

defineOptions({ inheritAttrs: false });
defineProps<{ alt: string; src: string }>();

const img: Ref<HTMLElement | undefined> = ref();

onMounted(() => {
    const zoom = mediumZoom(img.value, { background: "var(--overlay-color)" });
    onBeforeUnmount(zoom.detach.bind(zoom));
});
</script>

<template>
    <figure v-bind="{}">
        <img ref="img" v-bind="$attrs" :src="src" :alt="alt" data-ic-zoomable />
        <figcaption v-if="alt" :title="alt">
            <slot />
        </figcaption>
    </figure>
</template>

<style scoped lang="stylus">
@import "../../assets/css/global.styl";

figure
    scheme(--caption-color, lighten($text-color, 40%), alpha($text-color-d, 80%));

    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1.5em 0 2em;

    img
        max-width: 100%;
        max-height: 25em;
        cursor: pointer;

    img.full-height
        max-height: unset;

    figcaption
        margin-top: 0.6em;
        font-size: 0.8em;
        color: var(--caption-color);
        text-align: center;

@media (prefers-color-scheme: dark)
    img
        filter: brightness(0.8);

    img.svg, img.inv
        filter: invert(0.9);

@media only screen and (max-width: 748px)
    img
        max-height: 15em;
</style>
