<script setup lang="ts">
import "lazysizes";
import mediumZoom from "medium-zoom";
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";

import type { Ref } from "vue";

const props = defineProps<{
    alt: string;
    src: string;
    size: {
        width: number;
        height: number;
    };
}>();

const placehold = (width: number, height: number): string => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (ctx) {
        ctx.fillStyle = "#52525229";
        ctx.fillRect(0, 0, width, height);
    }

    return canvas.toDataURL();
};

const { width, height } = props.size;
const img: Ref<HTMLImageElement | null> = ref(null);
const placeholder: string = placehold(width, height);

onMounted(() => {
    const zoom = mediumZoom(img.value as HTMLElement, {
        background: "var(--overlay-color)",
    });

    zoom.on("open", async () => {});
    onBeforeUnmount(zoom.detach.bind(zoom));
});
</script>

<template>
    <figure>
        <img
            ref="img"
            class="lazyload"
            :class="src.endsWith('.svg') && 'svg'"
            :alt="alt"
            :data-src="src"
            :src="placeholder"
            data-ic-zoomable
        />
        <figcaption v-if="alt" :title="alt">
            <slot />
        </figcaption>
    </figure>
</template>

<style>
.medium-zoom-image[data-ic-zoomable] {
    z-index: 10000;
    border-radius: 0;
}

.medium-zoom-overlay {
    z-index: 9999;
}

:root {
    --overlay-color: #47484a85;
}

@media (prefers-color-scheme: dark) {
    :root {
        --overlay-color: #0e0e0ed6;
    }
}
</style>

<style scoped>
figure {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2em 0 2em;
    padding: 0;
}

img {
    max-width: 100%;
    max-height: 20em;
    margin: 0;
    padding: 0;
    border-radius: 2px;
    transition: border-radius 0.3s;
    cursor: pointer;
}

figcaption {
    margin-top: 1em;
    font-size: 0.8em;
    color: #8d8d8d;
    text-align: center;
    text-decoration: underline dotted;
    text-underline-offset: 4px;
}

@media (prefers-color-scheme: dark) {
    img {
        filter: brightness(0.8);
    }

    img.svg {
        filter: invert(0.75);
    }
}

@media (max-width: 768px) {
    img {
        max-height: 15em;
    }
}
</style>
