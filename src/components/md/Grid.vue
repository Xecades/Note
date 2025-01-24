<script setup lang="ts">
import { computed, useSlots } from "vue";

import type { Ref } from "vue";
import type { JSX } from "vue/jsx-runtime";

type GridData = {
    content: JSX.Element[];
    props: { [key: string]: any };
};

/** Map slots to grid data. */
const mapData = (parts: JSX.Element[]): GridData[] => {
    let res: GridData[] = [];

    for (const part of parts) {
        // @ts-expect-error
        if (part.type.__name === "Delimiter") {
            res.push({
                content: [],
                props: part.props ?? {},
            });
        } else {
            const last = res.length - 1;
            res[last].content.push(part);
        }
    }

    return res;
};

const parts: Ref<JSX.Element[]> = computed(() => useSlots().default!());
const data: Ref<GridData[]> = computed(() => mapData(parts.value));
</script>

<template>
    <div class="grid">
        <template v-for="(col, idx) in data" :key="idx">
            <div class="column" :style="{ '--width': col.props?.width }">
                <div class="content">
                    <component :is="() => col.content" />
                </div>
            </div>
        </template>
    </div>
</template>

<style scoped lang="stylus">
@import "../../assets/css/global.styl";

$padding-lr = 0.5em;
$min-width = 160px;

.grid
    margin: 0.5em (-1 * $padding-lr);
    display: flex;
    flex-wrap: wrap;

    .column
        width: var(--width);
        min-width: $min-width;
        flex-grow: 1;
        align-content: flex-end;

        .content
            --block-extend: 0;
            padding: 0 $padding-lr;
</style>
