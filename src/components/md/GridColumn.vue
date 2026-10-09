<script setup lang="ts">
defineProps<{ start: number; smallStart: number; span: number; smallSpan: number }>();
</script>
<template>
    <div
        class="column"
        :style="{
            '--grid-start-normal': start,
            '--grid-start-small': smallStart,
            '--grid-span-normal': span,
            '--grid-span-small': smallSpan,
        }"
    >
        <slot />
    </div>
</template>
