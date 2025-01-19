<script setup lang="ts">
import { onMounted } from "vue";
import { loadJS } from "@/assets/ts/utils";

import type { RouteMeta } from "vite-plugin-vue-xecades-note";

defineProps<{
    type: RouteMeta["type"];
    back: RouteMeta["back"];
}>();

const URL = "https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";
onMounted(() => loadJS(URL));
</script>

<template>
    <div class="metadata">
        <router-link :to="back.link" class="back">
            <span class="icon">
                <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </span>
            <span class="text">{{ back.title }}</span>
        </router-link>

        <span class="viewcount" v-if="type === 'post'">
            <span class="icon">
                <font-awesome-icon :icon="['fas', 'eye']" />
            </span>
            <span class="text" id="busuanzi_value_page_pv">
                <font-awesome-icon :icon="['fas', 'spinner']" spin />
            </span>
        </span>
    </div>
</template>

<style scoped lang="stylus">
@import "../assets/css/global.styl";

$header-main-spacing = 2.3rem;

$back-color = lighten($text-color, 30%);
$back-hover-color = $theme-color;

$viewcount-color = lighten($text-color, 30%);

.metadata
    margin: 0rem var(--margin-lr) $header-main-spacing;
    user-select: none;

.viewcount
    display: inline-flex;
    margin-left: 10px;
    color: $viewcount-color;
    height: 1.5rem;
    line-height: 1.5rem;

    .icon
        width: 19px;
        text-align: center;
        font-size: 0.7em;
        opacity: 0.85;

    .text
        font-size: 0.9em;

.back
    display: inline-flex;
    width: max-content;
    color: $back-color;
    transition: color 0.1s ease;
    height: 1.5rem;
    line-height: 1.5rem;
    margin-left: -2px;

    &:hover
        color: $back-hover-color;

    .icon, .text
        display: inline-block;

    .icon
        width: 15px;
        text-align: center;
        font-size: 0.7em;
        opacity: 0.85;

    .text
        font-size: 0.9em;
</style>
