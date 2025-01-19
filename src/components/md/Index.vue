<script setup lang="ts">
import { computed } from "vue";
import { leaf_nodes, locate_node, meta_of } from "@/assets/ts/markdown";
import Waterfall from "./Waterfall.vue";
import dayjs from "@/assets/ts/dayjs";
import config from "@cache/config";

import type { Ref } from "vue";
import type { NavNode, URL } from "vite-plugin-vue-xecades-note";

const props = defineProps<{ target: URL }>();

const timeago = (node: NavNode): string =>
    dayjs(meta_of(node).created).fromNow();

const article_count = (node: NavNode): number => {
    let count = 0;
    for (const child of node.children) {
        count += child.children.length === 0 ? 1 : article_count(child);
    }
    return count;
};

const meta_text = (node: NavNode): string =>
    node.children.length === 0
        ? timeago(node)
        : `${article_count(node)} 篇文章`;

const meta_title = (node: NavNode): string =>
    `更新于 ${dayjs(meta_of(node).updated).format("YYYY-MM-DD HH:mm:ss")}`;

const category_link = (node: NavNode): URL =>
    node.link.split("/").slice(0, 2).join("/") as URL;

const category_title = (node: NavNode): string =>
    `「${meta_of(category_link(node)).attr.title}」分类`;

const root: Ref<NavNode> = computed(() => locate_node(props.target)!);
const leaves: Ref<NavNode[]> = computed(() => leaf_nodes(root.value));
</script>

<template>
    <Waterfall class="index-comp" :width="300" :gap="16" unpack>
        <div class="leaf" v-for="leaf in leaves" :key="leaf.link">
            <!-- node -->
            <div class="header">
                <!-- text -->
                <router-link
                    v-if="leaves.length !== 1"
                    :to="leaf.link"
                    class="text"
                    :title="leaf.title"
                >
                    {{ leaf.title }}
                </router-link>
                <span v-else class="text static">文章目录</span>

                <!-- icon -->
                <router-link
                    :to="category_link(leaf)"
                    class="icon"
                    :title="category_title(leaf)"
                >
                    <font-awesome-icon
                        :icon="['fas', config.icon[meta_of(leaf).category]]"
                    />
                </router-link>
            </div>
            <div class="children">
                <!-- child -->
                <div
                    class="child"
                    v-for="child in leaf.children"
                    :key="child.link"
                >
                    <!-- title -->
                    <router-link
                        :to="child.link"
                        class="title"
                        :title="child.title"
                    >
                        <!-- icon -->
                        <span class="icon">
                            <font-awesome-icon
                                :icon="[
                                    'fas',
                                    child.children.length === 0
                                        ? 'file'
                                        : 'folder',
                                ]"
                            />
                        </span>

                        <!-- text -->
                        <span class="text">
                            {{ child.title }}
                        </span>
                    </router-link>

                    <!-- meta -->
                    <span class="meta" :title="meta_title(child)">
                        {{ meta_text(child) }}
                    </span>
                </div>
            </div>
        </div>
    </Waterfall>
</template>

<style scoped>
.index-comp {
    --border-color: #e1e1e1c4;
    --max-width: 370px;

    /* header */
    --h-height: 3.5rem;
    --h-background: #eeeeee87;
    --h-color: #3c3c3e;
    --h-hover-color: #60a5fa;
    --h-icon-color: #b5bcbe9e;
    --h-icon-hover-color: #3c3c3e;

    /* child */
    --c-height: 3.5rem;
    --c-color: #3c3c3e;
    --c-hover-color: #60a5fa;
    --c-icon-color: #b5bcbe9e;
    --c-meta-color: #787b7e;
}

@media (prefers-color-scheme: dark) {
    .index-comp {
        --border-color: #333333c4;

        /* header */
        --h-background: #2d2d2d6e;
        --h-color: #c6c6c6;
        --h-hover-color: #87b3ea;
        --h-icon-color: #787b7c9e;
        --h-icon-hover-color: #c6c6c6;

        /* child */
        --c-color: #c6c6c6;
        --c-hover-color: #87b3ea;
        --c-icon-color: #787b7c9e;
        --c-meta-color: #919599;
    }
}

.leaf {
    border: 1px solid var(--border-color);
    border-radius: 4px;
    max-width: var(--max-width);
    margin: 0 auto;
}

.header {
    display: flex;
    height: var(--h-height);
    align-items: center;
    padding-left: 9px;
    padding-right: 14px;
    background-color: var(--h-background);
}

.header .text {
    color: var(--h-color);
    padding: 0 8px;
    transition: color 0.15s ease-out;
}

.header .text:not(.static):hover {
    color: var(--h-hover-color);
}

.header .icon {
    margin-left: auto;
    width: 1.5rem;
    text-align: center;
    color: var(--h-icon-color);
    transition: color 0.15s ease-out, transform 0.15s ease;
}

.header .icon:hover {
    color: var(--h-icon-hover-color);
    transform: scale(1.1);
}

.child {
    display: flex;
    border-bottom: 1px solid var(--border-color);
    height: var(--c-height);
    align-items: center;
    padding-left: 9px;
    padding-right: 18px;
}

.child:last-of-type {
    border-bottom: none;
}

.child .title {
    padding: 0 8px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: var(--c-color);
}

.child .title:hover {
    color: var(--c-hover-color);
}

.child .title .icon {
    color: var(--c-icon-color);
    width: 1.6rem;
    display: inline-block;
    text-align: center;
}

.child .title .text {
    transition: color 0.15s ease-out;
}

.child .meta {
    color: var(--c-meta-color);
    margin-left: auto;
    font-size: 0.85rem;
    white-space: nowrap;
    user-select: none;
}
</style>
