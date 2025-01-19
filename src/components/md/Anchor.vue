<script setup lang="ts">
const props = defineProps<{ href: string }>();
const is_internal: boolean = !props.href.startsWith("http");
</script>

<template>
    <router-link :to="encodeURI(href)" v-if="is_internal" class="cursor">
        <slot />
    </router-link>
    <a :href="href" v-else class="cursor external" target="_blank">
        <slot />
    </a>
</template>

<style scoped>
* {
    --color: #3083e8;
    --hover-color: #0454b3;
}

@media (prefers-color-scheme: dark) {
    * {
        --color: #98c6ff;
        --hover-color: #54a2ff;
    }
}

a {
    color: var(--color);
    transition: color 0.1s;
}

a:hover {
    color: var(--hover-color);
}

/* a.external::after {
    content: "✦";
    font-size: 0.7em;
    line-height: 1em;
    padding: 0 2px;
    vertical-align: super;
} */
</style>
