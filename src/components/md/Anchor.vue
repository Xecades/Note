<script setup lang="ts">
const props = defineProps<{ href: string }>();
const isInternal = (href: string) => !/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href);
</script>

<template>
    <router-link :to="href" v-if="isInternal(href)">
        <slot />
    </router-link>
    <a
        :href="href"
        v-else
        class="external"
        :target="/^https?:/.test(href) ? '_blank' : undefined"
        rel="noopener"
    >
        <slot />
    </a>
</template>

<style scoped lang="stylus">
@import "../../assets/css/global.styl";

a
    scheme(--color, $theme-color, lighten($theme-color, 10%));
    scheme(--hover-color, darken($theme-color, 45%), darken($theme-color, 20%));
    scheme(--hover-underline-color, darken($theme-color, 30%), darken($theme-color, 20%));

    color: var(--color);
    transition: color 0.07s;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-style: dashed;

    &:hover
        color: var(--hover-color);
        text-decoration-style: solid;
        text-decoration-color: var(--hover-underline-color);
</style>
