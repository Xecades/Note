<script setup lang="ts">
import { inject } from "vue";
import { render_inline } from "@/assets/ts/latex";
const props = defineProps<{ data: string }>();

const macros = inject("katex-macros", {});
const parsed: string = render_inline(props.data, macros);
</script>

<template>
    <span v-html="parsed"></span>
</template>
