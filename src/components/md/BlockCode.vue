<script setup lang="ts">
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

import type { PartialOptions } from "overlayscrollbars";

const props = defineProps<{
    lang: string;
    html: string;
}>();

/** @see https://github.com/KingSora/OverlayScrollbars/ */
const osOptions: PartialOptions = {
    scrollbars: {
        autoHide: "move",
        autoHideSuspend: true,
    },
    overflow: { y: "visible-hidden" },
};
</script>

<template>
    <OverlayScrollbarsComponent
        element="pre"
        :class="`language-${lang} block-code`"
        :options="(osOptions as any)"
        v-html="html"
    />
</template>

<style>
@import url(@/assets/css/prism-one-light.css) (prefers-color-scheme: light);
@import url(@/assets/css/prism-one-dark.css) (prefers-color-scheme: dark);
</style>
