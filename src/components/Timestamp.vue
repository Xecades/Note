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
    <div id="timestamp" :title="title">
        <div class="line" />
        <p class="modify">最后更新：{{ modify.fromNow() }}</p>
        <p class="creation">文章创建：{{ creation.fromNow() }}</p>
    </div>
</template>

<style scoped lang="stylus">
@import "../assets/css/global.styl";

$line-width = 146px;
$line-extend = 6px;
$line-gap = 15px;

#timestamp
    scheme(--color, lighten($text-color, 34%), darken($text-color-d, 20%));
    scheme(--line-color, lighten(black, 85%), lighten(black, 36%));
    dual(--font-size, 0.8rem, 0.75rem);

    margin: 0 var(--margin-lr) 6rem;
    font-size: var(--font-size);
    color: var(--color);
    line-height: 1.3rem;
    width: max-content;

.line
    height: 1px;
    width: $line-width;
    margin-left: 0 - $line-extend;
    margin-bottom: $line-gap;
    background-color: var(--line-color);
</style>
