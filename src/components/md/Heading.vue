<script setup lang="ts">
import { navigate } from "@/assets/ts/utils";

const props = defineProps<{ level: number; id: number }>();

const anchorClick = (e: Event) => {
    e.preventDefault();
    navigate(props.id.toString());
};
</script>

<template>
    <component :is="`h${level}`" :id="id" :tabindex="-1" class="heading">
        <a :href="`#${id}`" class="anchor" @click="anchorClick">#</a>
        <slot />
    </component>
</template>

<style scoped lang="stylus">
@import "../../assets/css/global.styl";

$anchor-width = 1.65rem;

.heading
    scheme(--heading-color, lighten($text-color, 10%), darken($text-color-d, 7%));
    dual(--heading-margin-left, (- $anchor-width), 0);

    position: relative;
    margin: 1.5rem 0;
    color: var(--heading-color);
    font-weight: 500;

    > .anchor
        font-family: $monospace;
        color: lighten(black, 65%);
        transition: color 0.1s;
        user-select: none;
        display: inline-block;
        margin: 0;
        width: $anchor-width;
        margin-left: var(--heading-margin-left);
        font-size: 1.05em;

        &:hover
            color: darken($theme-color, 20%);
</style>
