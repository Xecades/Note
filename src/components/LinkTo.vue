<script setup lang="ts">
import isRelativeUrl from "is-relative-url";

type fn = () => void;

const props = defineProps<{
    src: string | fn;
    mode?: "stay" | "jump";
}>();

const isButton: boolean = props.src instanceof Function;
const inside: boolean = !isButton && isRelativeUrl(props.src as string);
const rmode: "stay" | "jump" = props.mode ?? (inside ? "stay" : "jump");
</script>

<template>
    <template v-if="isButton">
        <a class="cursor" @click="(src as fn)()">
            <slot />
        </a>
    </template>

    <template v-else-if="rmode == 'stay'">
        <router-link
            :to="encodeURI(src as string)"
            v-if="inside"
            class="cursor"
        >
            <slot />
        </router-link>
        <a :href="(src as string)" v-else class="cursor">
            <slot />
        </a>
    </template>

    <template v-else>
        <a :href="(src as string)" target="_blank" class="cursor">
            <slot />
        </a>
    </template>
</template>

<style scoped>
* {
    --color: #5b8db2;
    --color-hover: #005d92;
    --color-active: #0d77b4;
}

@media (prefers-color-scheme: dark) {
    * {
        --color: #81beff;
        --color-hover: #90c1f5;
        --color-active: #accff5;
    }
}

a {
    /* 这里不能用 opacity，否则 Safari 下 <ruby> 会不显示 */
    color: var(--color);
    transition: color 0.1s;
}

a:hover {
    color: var(--color-hover);
}

a:active {
    color: var(--color-active);
}
</style>
