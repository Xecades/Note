<script setup lang="tsx">
/** @todo 图片缓存，不能每次都重新加载一遍 */

import { computed, onMounted, onUpdated, ref, watch } from "vue";
import { RouterView, useRoute } from "vue-router";
import { assertType } from "@/assets/ts/types";
import router from "@/router";

import Timestamp from "./Timestamp.vue";
import Comment from "./Comment.vue";
import Metadata from "./Metadata.vue";

import "@/assets/css/markdown.css";

// Types
import type { Ref } from "vue";
import type { RouteMeta } from "vite-plugin-vue-xecades-note";

const props = defineProps<{ meta: RouteMeta }>();
const emit = defineEmits(["update"]);

/**
 * Whether to show timestamp.
 *
 *  - If not specified in front-matter, return true if it is a post.
 *  - Otherwise, return the value in front-matter.
 */
const show_timestamp: Ref<boolean> = computed(() => {
    if (props.meta.attr.timestamp === undefined)
        return props.meta.type === "post";
    return props.meta.attr.timestamp;
});

/**
 * Whether to show comments.
 *
 *  - If not specified in front-matter, return true if it is a post.
 *  - Otherwise, return the value in front-matter.
 */
const show_comment: Ref<boolean> = computed(() => {
    if (props.meta.attr.comment === undefined)
        return props.meta.type === "post";
    return props.meta.attr.comment;
});

/**
 * Iterate through headings and register anchor click event.
 */
const registerAnchor = () => {
    const headings = document.querySelectorAll(".heading");

    headings.forEach((heading) => {
        const anchor = heading.querySelector(".header-anchor");
        if (anchor) {
            anchor.addEventListener("click", (e: Event) => {
                e.preventDefault();

                const offset = -4 * 16;
                const y =
                    heading.getBoundingClientRect().top +
                    window.scrollY +
                    offset;

                window.scrollTo({ top: y, behavior: "smooth" });
            });
        }
    });
};

onMounted(registerAnchor);
onUpdated(registerAnchor);

/**
 * Callback function when JSX lazyload updates.
 */
// const lazyload_update = (index: number) => {
//     const selector: string = ".markdown > *";
//     const els: NodeListOf<HTMLElement> = document.querySelectorAll(selector);
//     const target: HTMLElement = els[index - 1];

//     emit("update", target);
// };
</script>

<template>
    <div id="content">
        <header>
            <h1>{{ meta.attr.title }}</h1>
        </header>

        <!-- 通过 key 强制组件刷新，从而正常触发 busuanzi 统计更新 -->
        <!-- @todo 改进一下 -->
        <Metadata :back="meta.back" :type="meta.type" :key="meta.attr.title" />

        <main class="markdown">
            <RouterView />
        </main>

        <Timestamp
            v-if="show_timestamp"
            :created="meta.created"
            :updated="meta.updated"
        />

        <Comment v-if="show_comment" />
    </div>
</template>

<style scoped>
* {
    --width: 740px;

    --margin-lr: 3rem;
    --margin-top: 4rem;
    --margin-bottom: 4rem;

    --header-main-spacing: 2.3rem;

    --header-color: #535353;
    --header-size: 2.2rem;
    --header-line-height: 3.5rem;
}

@media (prefers-color-scheme: dark) {
    * {
        --header-color: #f3f4f6;
    }
}

#content {
    width: var(--width);
    margin: 0 auto;
    z-index: 10;
}

#content.fade {
    transition: opacity 0.1s ease-in;
    opacity: 0;
}

main {
    margin: 0 var(--margin-lr) var(--margin-bottom);
}

header {
    margin: var(--margin-top) var(--margin-lr) 0.6rem;
}

h1 {
    font-size: var(--header-size);
    color: var(--header-color);
    letter-spacing: 0.12rem;
    line-height: var(--header-line-height);
    font-weight: 500;
}

@media (max-width: 768px) {
    * {
        --width: 100%;
        --margin-lr: 2.5rem;
        --margin-top: 5.5rem;
        --margin-bottom: 5rem;
        --header-size: 2rem;
        --header-line-height: 3rem;
    }
}
</style>
