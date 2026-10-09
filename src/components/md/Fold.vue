<script setup lang="ts">
import { computed, ref, useId } from "vue";

type Theme = "default" | "success" | "info" | "warning" | "danger";
const icons: Record<Theme, string> = {
    default: "asterisk",
    success: "lightbulb",
    info: "info-circle",
    warning: "exclamation-circle",
    danger: "exclamation-triangle",
};
const props = withDefaults(
    defineProps<{ expand?: boolean; always?: boolean; type?: Theme }>(),
    { type: "default" },
);
const expanded = ref(props.expand);
const foldable = computed(() => !(props.expand && props.always));
const id = useId();
</script>

<template>
    <div class="fold colors" :class="type">
        <component
            :is="foldable ? 'button' : 'div'"
            class="header"
            :class="{ cursor: foldable }"
            :type="foldable ? 'button' : undefined"
            :aria-expanded="foldable ? !!expanded : undefined"
            :aria-controls="foldable ? id : undefined"
            @click="foldable && (expanded = !expanded)"
        >
            <span class="icon"><font-awesome-icon :icon="icons[type]" /></span>
            <span class="title"><slot name="title" /></span>
            <span class="expand" v-if="foldable"
                ><font-awesome-icon
                    :icon="['fas', 'angle-right']"
                    :style="{ transform: `rotate(${expanded ? 90 : 0}deg)` }"
            /></span>
        </component>
        <div class="content" :class="{ expanded }" :id="id" :inert="!expanded">
            <div class="fold-height-listener">
                <div class="fold-body"><slot /></div>
            </div>
        </div>
    </div>
</template>

<style lang="stylus">
@import "../../assets/css/global.styl";

.fold
    scheme(--header-color, lighten($text-color, 10%), darken($text-color-d, 3%));

    border-radius: 5px;
    margin: 2rem var(--block-extend);
    overflow: hidden;
    border: 1px solid var(--border-color);
    border-left: 4px solid var(--icon-color);

    > .header
        display: flex;
        padding: 7px 8px;
        background-color: var(--background-color);
        user-select: none;

        &.cursor
            cursor: pointer;

        .title
            flex: 1;
            font-size: 0.9em;
            color: var(--header-color);

        .icon,
        .expand
            font-size: 1.1em;
            text-align: center;
            width: 36px;
            color: var(--icon-color);

        .icon
            margin-right: 7px;

        .expand
            margin-left: 7px;

            svg
                transition: transform 0.2s ease;

    > .content
        --wrapper-padding: 0.8em 1.4em;
        overflow: hidden;

        > .fold-height-listener > .fold-body
            --block-extend: 0px;
            padding: var(--wrapper-padding);

            > .fold:first-child
                margin-top: 0.2em;

            > .fold:last-child
                margin-bottom: 0.2em;
</style>

<style>
.fold-body:has(> :is(.block-code, .quote, .block-math):only-child) {
    --wrapper-padding: 0;
}
.fold-body > .block-code:only-child {
    margin: 0;
    border: none;
    background: unset;
}
.fold-body > .quote:only-child {
    margin: 3rem 1.4rem;
}
.fold-body > .block-math:only-child .katex-display {
    margin: 0.3em 0;
}
</style>

<style scoped>
.header {
    width: 100%;
    text-align: left;
    border: 0;
    font: inherit;
}
.content {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 200ms ease;
}
.content.expanded {
    grid-template-rows: 1fr;
}
.fold-height-listener {
    min-height: 0;
    overflow: hidden;
}
@media (prefers-reduced-motion: reduce) {
    .content {
        transition: none;
    }
}
</style>
