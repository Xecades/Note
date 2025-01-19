<script setup lang="ts">
import { computed } from "vue";
import dayjs from "@/assets/ts/dayjs";

import type { RouteMeta } from "vite-plugin-vue-xecades-note";
import type { Dayjs } from "dayjs";
import type { Ref } from "vue";

const props = defineProps<{
    created: RouteMeta["created"];
    updated: RouteMeta["updated"];
}>();

const FORMAT_STRING = "YYYY-MM-DD HH:mm:ss";

const creation: Ref<Dayjs> = computed(() => dayjs(props.created));
const modify: Ref<Dayjs> = computed(() => dayjs(props.updated));
const title: Ref<string> = computed(
    () =>
        `创建于 ${creation.value.format(FORMAT_STRING)}\n` +
        `更新于 ${modify.value.format(FORMAT_STRING)}`
);
</script>

<template>
    <div class="timestamp" :title="title">
        <div class="line" />
        <p class="modify">最后更新：{{ modify.fromNow() }}</p>
        <p class="creation">文章创建：{{ creation.fromNow() }}</p>
    </div>
</template>

<style scoped>
* {
    --color: #95989a;

    --line-width: 146px;
    --line-extend: 6px;
    --line-color: #e3e3e3;
    --line-gap: 15px;
}

@media (prefers-color-scheme: dark) {
    * {
        --color: #878787;
        --line-color: #393a3b;
    }
}

.timestamp {
    margin: 0 var(--margin-lr) 6rem;
    font-size: 0.8rem;
    color: var(--color);
    line-height: 1.3rem;
    width: max-content;
}

.line {
    height: 1px;
    width: var(--line-width);
    margin-left: calc(var(--line-extend) * -1);
    margin-bottom: var(--line-gap);
    background-color: var(--line-color);
}

@media (max-width: 768px) {
    .timestamp {
        font-size: 0.75rem;
    }
}
</style>
