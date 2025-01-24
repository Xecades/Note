<script setup lang="ts">
const props = defineProps<{ href: string }>();
const is_internal: boolean = !props.href.startsWith("http");
</script>

<template>
    <router-link :to="encodeURI(href)" v-if="is_internal">
        <slot />
    </router-link>
    <a :href="href" v-else class="external" target="_blank">
        <slot />
    </a>
</template>

<style scoped lang="stylus">
@import "../../assets/css/global.styl";

a
    scheme(--color, $theme-color, cyan);
    scheme(--hover-color, darken($theme-color, 45%), cyan);

    color: var(--color);
    transition: color 0.07s;

    &:hover
        color: var(--hover-color);
</style>
