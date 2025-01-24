<script setup lang="ts">
import type { RouteMeta } from "vite-plugin-vue-xecades-note";

defineProps<{
    type: RouteMeta["type"];
    breadcrumb: RouteMeta["breadcrumb"];
}>();
</script>

<template>
    <div class="metadata">
        <span class="breadcrumb">
            <template v-for="(item, index) in breadcrumb" :key="index">
                <router-link :to="item.link" class="text">
                    {{ item.title }}
                </router-link>
                <span class="icon" v-if="index !== breadcrumb.length - 1">
                    <font-awesome-icon :icon="['fas', 'chevron-right']" />
                </span>
            </template>
        </span>
    </div>
</template>

<style scoped lang="stylus">
@import "../assets/css/global.styl";

$header-main-spacing = 2.3rem;
$height = 1.5rem;

$breadcrumb-color = lighten($text-color, 30%);
$breadcrumb-hover-color = $theme-color;

.metadata
    margin: 0rem var(--margin-lr) $header-main-spacing;
    user-select: none;

.breadcrumb
    display: inline-flex;
    height: $height;
    line-height: $height;
    margin-left: 3px;

    .icon, .text
        display: inline-block;
        color: $breadcrumb-color;

    .icon
        width: 20px;
        text-align: center;
        font-size: 0.7em;
        opacity: 0.85;

    .text
        font-size: 0.9em;
        transition: color 0.1s ease;

        &:hover
            color: $breadcrumb-hover-color;
</style>
