<script setup lang="ts">
// TODO: add small screen support (sm:xxx)
import { computed, useSlots } from "vue";

import type { Ref } from "vue";
import type { JSX } from "vue/jsx-runtime";

type GridData = {
    content: JSX.Element[];
    props: { start: number; smstart: number; span: number; smspan: number };
};

const props = defineProps<{
    align?: "bottom" | "top" | "equal";
    gap?: string;
    gapx?: string;
    gapy?: string;
}>();

const align = props.align ?? "bottom";
const gapx = props.gap ?? props.gapx ?? "0";
const gapy = props.gap ?? props.gapy ?? "0";

/** Map slots to grid data. */
const mapData = (parts: JSX.Element[]): GridData[] => {
    let res: GridData[] = [];
    let start = 1;
    let smstart = 1;

    for (const part of parts) {
        // @ts-expect-error
        if (part.type.__name === "Delimiter") {
            start %= 24;
            smstart %= 24;

            let span = +(part.props?.span ?? 24);
            let smspan = +(part.props!["sm:span"] ?? span);
            let offset = +(part.props?.offset ?? 0);

            start += offset;
            smstart += offset;
            res.push({ content: [], props: { start, smstart, span, smspan } });
            start += span;
            smstart += smspan;
        } else {
            const last = res.length - 1;
            res[last].content.push(part);
        }
    }

    return res;
};

const isImmensive = (parts: JSX.Element[]): boolean => {
    if (parts.length > 1) return false;

    // @ts-expect-error
    return parts[0].type.__name === "Fold";
};

const parts: Ref<JSX.Element[]> = computed(() => useSlots().default!());
const data: Ref<GridData[]> = computed(() => mapData(parts.value));
</script>

<template>
    <div
        class="grid"
        :class="align"
        :style="{
            '--grid-gapx': gapx,
            '--grid-gapy': gapy,
        }"
    >
        <template v-for="(col, idx) in data" :key="idx">
            <div
                class="column"
                :class="{ immensive: isImmensive(col.content) }"
                :style="{
                    '--grid-start-normal': col.props.start,
                    '--grid-start-small': col.props.smstart,
                    '--grid-span-normal': col.props.span,
                    '--grid-span-small': col.props.smspan,
                }"
            >
                <component :is="() => col.content" />
            </div>
        </template>
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

    .column
        dual(--grid-span, var(--grid-span-normal), var(--grid-span-small));
        dual(--grid-start, var(--grid-start-normal), var(--grid-start-small));

        --block-extend: 0;
        grid-column: var(--grid-start) / span var(--grid-span);

        &.immensive
            > .fold
                margin: 0;

.grid.equal
    .column.immensive
        > .fold
            height: 100%;

.grid.bottom
    align-items: end;
</style>
