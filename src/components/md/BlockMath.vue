<script setup lang="ts">
import { render_block } from "@/assets/ts/latex";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

import type { PartialOptions } from "overlayscrollbars";

const props = defineProps<{ data: string }>();
const parsed: string = render_block(props.data);

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
        v-html="parsed"
    />
</template>
