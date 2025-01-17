<script setup lang="ts">
import { computed, useSlots } from "vue";

import type { Ref } from "vue";
import type { JSX } from "vue/jsx-runtime";

const props = defineProps<{
    width?: string | number;
    gap?: string | number;
    unpack?: boolean;
}>();

const width: number = Number(props.width) || 300;
const gap: number = Number(props.gap) || 16;

const slots: Ref<JSX.Element[]> = computed(() => useSlots().default!());
const parts = computed(() => {
    const els: JSX.Element[] = props.unpack
        ? (slots.value[0].children as JSX.Element[])
        : slots.value;

    return els.map((el) => el);
});
</script>

<template>
    <div class="waterfall">
        <template v-if="parts.length !== 1">
            <!-- https://www.npmjs.com/package/@yeger/vue-masonry-wall -->
            <masonry-wall :items="parts" :column-width="width" :gap="gap">
                <template #default="{ item, index }">
                    <component :key="index" :is="item" />
                </template>
            </masonry-wall>
        </template>
        <template v-else>
            <slot />
        </template>
    </div>
</template>

<style scoped>
.waterfall {
    margin: 3rem var(--block-extend);
}
</style>
