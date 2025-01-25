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

<style scoped lang="stylus">
@import "../../assets/css/global.styl";

.index-comp
    scheme(--border-color, lighten(black, 88%), lighten(black, 25%));
    dual(--max-width, 370px, 0);

    // header
    dual(--h-height, 3.4em, 0);
    scheme(--h-background, lighten(black, 94%), lighten(black, 20%));
    scheme(--h-color, $text-color, $text-color-d);
    scheme(--h-hover-color, $theme-color, $theme-color);
    scheme(--h-icon-color, lighten($text-color, 60%), darken($text-color-d, 10%));
    scheme(--h-icon-hover-color, $theme-color, $theme-color);

    // child
    dual(--c-height, 3.4em, 0);
    scheme(--c-color, $text-color, $text-color-d);
    scheme(--c-hover-color, $theme-color, $theme-color);
    scheme(--c-icon-color, lighten($text-color, 78%), darken($text-color-d, 23%));
    scheme(--c-meta-color, lighten($text-color, 30%), darken($text-color-d, 18%));

    .leaf
        border: 1px solid var(--border-color);
        border-radius: 3px;
        overflow: hidden;
        max-width: var(--max-width);
        margin: 0 auto;

        .header
            display: flex;
            height: var(--h-height);
            align-items: center;
            padding-left: 9px;
            padding-right: 14px;
            background-color: var(--h-background);

            .text
                color: var(--h-color);
                padding: 0 8px;
                transition: color 0.07s ease-out;

                &:not(.static):hover
                    color: var(--h-hover-color);

            .icon
                margin-left: auto;
                width: 1.5rem;
                text-align: center;
                color: var(--h-icon-color);
                transition: color 0.07s ease-out, transform 0.07s ease;

                &:hover
                    color: var(--h-icon-hover-color);
                    transform: scale(1.1);

    .children .child
        display: flex;
        border-bottom: 1px solid var(--border-color);
        height: var(--c-height);
        align-items: center;
        padding-left: 9px;
        padding-right: 18px;

        &:last-of-type
            border-bottom: none;

        .title
            padding: 0 8px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            color: var(--c-color);

            &:hover
                color: var(--c-hover-color);

            .icon
                color: var(--c-icon-color);
                width: 1.6rem;
                display: inline-block;
                text-align: center;

            .text
                transition: color 0.07s ease-out;

        .meta
            color: var(--c-meta-color);
            margin-left: auto;
            font-size: 0.85rem;
            white-space: nowrap;
            user-select: none;
</style>
