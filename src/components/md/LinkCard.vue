<script setup lang="ts">
import LinkTo from "../LinkTo.vue";

const props = defineProps<{ href: string }>();
const external: boolean =
    props.href.startsWith("http") || props.href.startsWith("/assets/");

const isGitHub: boolean = /github\.com/.test(props.href);
</script>

<template>
    <div class="linkcard">
        <LinkTo :src="href" :mode="external ? 'jump' : 'stay'">
            <!-- Left -->
            <div class="content">
                <div class="item title"><slot /></div>
                <div class="item link">
                    <span class="icon">
                        <font-awesome-icon
                            v-if="external"
                            :icon="['fas', 'arrow-up-right-from-square']"
                        />
                        <font-awesome-icon v-else :icon="['far', 'star']" />
                    </span>
                    <span class="href">{{ href }}</span>
                </div>
            </div>

            <!-- Right -->
            <div class="logo">
                <font-awesome-icon v-if="isGitHub" :icon="['fab', 'github']" />
                <font-awesome-icon v-else :icon="['fas', 'link']" />
            </div>
        </LinkTo>
    </div>
</template>

<style scoped>
.linkcard {
    --width: 24rem;
    --height: 4.2rem;

    --background: #fafafa;
    --border: #e5e5e5;
    --border-hover: #e8e8e8;

    --logo-color: #e6e6e6;
    --title-color: #4b5563;
    --icon-color: #b0b4bc;
    --href-color: #898d94;

    --logo-size: 3rem;
    --gap: 1.4rem;
}

@media (prefers-color-scheme: dark) {
    .linkcard {
        --background: #222324;
        --border: #272829;
        --border-hover: #3d3f43;

        --logo-color: #44464a;
        --title-color: #d8dee9;
        --icon-color: #aeb4bc;
        --href-color: #9ba0a6;
    }
}

.linkcard > * {
    width: var(--width);
    max-width: calc(100% - 1.5rem * 2 - 0.5rem);
    height: var(--height);
    margin: 2rem auto;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    background-color: var(--background);
    display: flex;
    gap: var(--gap);
    box-shadow: 0 0 0 1px var(--border);
    transition: box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.linkcard > *:hover {
    box-shadow: 0 0 0 3px var(--border-hover);
}

.logo {
    color: var(--logo-color);
}

.logo svg {
    width: var(--logo-size);
    height: var(--logo-size);
    padding: calc((var(--height) - var(--logo-size)) / 2) 0;
}

.content {
    flex: 1;
    width: calc(100% - var(--logo-size) - var(--gap));
}

.content .item {
    height: calc(var(--height) / 2);
    line-height: calc(var(--height) / 2);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.content .item.title {
    color: var(--title-color);
}

.content .item.link .icon {
    font-size: 0.8em;
    margin-right: 6px;
    color: var(--icon-color);
}

.content .item.link .href {
    font-size: 0.9em;
    color: var(--href-color);
}
</style>
