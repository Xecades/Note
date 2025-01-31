<script setup lang="ts">
import { navigate } from "@/assets/ts/utils";
import type { SerialHeader } from "@/assets/ts/rightbar";

defineProps<{ item: SerialHeader; in_view: number }>();
</script>

<template>
    <a
        :href="'#' + item.hash"
        @click.prevent="navigate(item.hash, true, false)"
        :style="{
            marginRight: item.indent,
            opacity: item.opacity,
        }"
        :class="{
            active: item.index === in_view,
            passed: item.index < in_view,
        }"
    >
        <span class="text">
            <component :is="item.title" />
        </span>
        <span class="sign" v-if="item.level === 0">
            <font-awesome-icon :icon="['fas', 'caret-left']" />
        </span>
    </a>
</template>

<style scoped lang="stylus">
@import "../assets/css/global.styl";

$title-indent = 0.5rem;

a
    .sign
        color: $theme-color;
        opacity: 0;
        transition: opacity 0.07s;
        font-size: 0.7rem;
        display: block;
        float: inline-end;
        animation: shake-x 1s infinite ease-in-out;

    .text
        padding-right: $title-indent;

    &:hover
        .text
            color: $theme-color;

        .sign
            opacity: 1;
</style>
