<script setup lang="ts">
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

import type { PartialOptions } from "overlayscrollbars";

defineProps<{ html: string }>();

/** @see https://github.com/KingSora/OverlayScrollbars/ */
const osOptions: PartialOptions = {
    scrollbars: { autoHide: "move", autoHideSuspend: true },
    overflow: { y: "visible-hidden" },
};
</script>

<template>
    <OverlayScrollbarsComponent
        element="p"
        :options="(osOptions as any)"
        class="block-math"
        v-html="html"
    />
</template>
