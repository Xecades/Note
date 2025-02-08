<script setup lang="ts">
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import type { PartialOptions } from "overlayscrollbars";

defineProps<{ lang: string; html: string }>();

/** @see https://github.com/KingSora/OverlayScrollbars/ */
const osOptions: PartialOptions = {
    scrollbars: { autoHide: "move", autoHideSuspend: true },
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
