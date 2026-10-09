<script setup lang="ts">
withDefaults(
    defineProps<{
        align?: "bottom" | "top" | "equal";
        gap?: string;
        gapx?: string;
        gapy?: string;
    }>(),
    { align: "bottom" },
);
</script>
<template>
    <div
        class="grid"
        :class="align"
        :style="{ '--grid-gapx': gap ?? gapx ?? '0', '--grid-gapy': gap ?? gapy ?? '0' }"
    >
        <slot />
    </div>
</template>
<style lang="stylus">
@import "../../assets/css/global.styl";

.grid
    margin: 0.5em 0;
    display: grid;
    grid-template-columns: repeat(24, 1fr);
    grid-column-gap: var(--grid-gapx);
    grid-row-gap: var(--grid-gapy);

    > .column
        dual(--grid-span, var(--grid-span-normal), var(--grid-span-small));
        dual(--grid-start, var(--grid-start-normal), var(--grid-start-small));

        --block-extend: 0px;
        grid-column: var(--grid-start) / span var(--grid-span);

        &:has(> .fold:only-child)
            > .fold
                margin: 0;

        &.center
            place-self: center;

.grid.equal
    > .column:has(> .fold:only-child)
        > .fold
            height: 100%;

.grid.bottom
    align-items: end;
</style>
