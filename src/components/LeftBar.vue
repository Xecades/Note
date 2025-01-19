<script setup lang="ts">
import {
    nextTick,
    onBeforeUnmount,
    onMounted,
    ref,
    watch,
    watchEffect,
} from "vue";
import { render_list } from "@/assets/ts/leftbar";
import { LEFTBAR_STATUS } from "@/assets/ts/types";
import hotkeys from "hotkeys-js";
import Search from "./Search.vue";

// Cache
import config from "@cache/config";

// Types
import type { Ref } from "vue";
import type { JSX } from "vue/jsx-runtime";
import type { HotkeysEvent } from "hotkeys-js";

const props = defineProps<{
    status: LEFTBAR_STATUS;
    currentCategory: string;
}>();

/** Attributes attached to a category */
interface Category {
    name: string;
    link: string;
    opacity: number;
    timeout?: NodeJS.Timeout;
}

/** Categories to be displayed as buttons. */
const categories: Ref<Category[]> = ref(
    config.nav.map((c) => ({
        name: c.title,
        link: c.link,
        opacity: 0,
    }))
);

/** ID of category of current page, -1 iff current location is index page. */
const category_id: number = categories.value.findIndex(
    (c) => c.link === "/" + props.currentCategory
);

/** ID of active category. */
const active_id: Ref<number> = ref(category_id === -1 ? 0 : category_id);

// This variable may be true only when status == HOVER_TO_SHOW.
const do_show_detail: Ref<boolean> = ref(false);
const is_searching: Ref<boolean> = ref(false);

const REVEAL_DELAY = 15;

const category = {
    reveal: () => {
        let len = categories.value.length;

        for (let i = 0; i < len; i++) {
            clearTimeout(categories.value[i].timeout);

            let timeout: NodeJS.Timeout = setTimeout(() => {
                categories.value[i].opacity = 1;
            }, REVEAL_DELAY * i);

            categories.value[i].timeout = timeout;
        }
    },
    hide: () => {
        let len = categories.value.length;

        for (let i = len - 1; i >= 0; i--) {
            clearTimeout(categories.value[i].timeout);

            let timeout: NodeJS.Timeout = setTimeout(() => {
                categories.value[i].opacity = 0;
            }, REVEAL_DELAY * (len - 1 - i));

            categories.value[i].timeout = timeout;
        }
    },
};

const search = {
    reveal: async () => {
        is_searching.value = true;
        await nextTick();

        const input = document.querySelector(".search .input") as any;
        input.focus();
    },
    hide: () => {
        is_searching.value = false;
    },
};

const mouse = {
    // Handle mouse events only if current status is HOVER_TO_SHOW
    enter: () => {
        if (props.status === LEFTBAR_STATUS.HOVER_TO_SHOW) {
            do_show_detail.value = true;
            category.reveal();
        }
    },
    leave: () => {
        if (props.status === LEFTBAR_STATUS.HOVER_TO_SHOW) {
            do_show_detail.value = false;
            category.hide();
        }
    },
    /** Switch category to `index` */
    switch: (index: number) => {
        active_id.value = index;
    },
};

const keyboard = {
    command_k: (event: KeyboardEvent, handler: HotkeysEvent) => {
        if (!is_searching.value) {
            search.reveal();
        }
    },

    esc: (event: KeyboardEvent, handler: HotkeysEvent) => {
        if (is_searching.value) {
            search.hide();
        }
    },
};

const VBody_fn = () => () => render_list(config.nav[active_id.value], true);
const VBody: Ref<() => JSX.Element> = ref(VBody_fn());
watch(active_id, () => (VBody.value = VBody_fn()));

onMounted(() => {
    hotkeys("command+k,ctrl+k", keyboard.command_k);
    hotkeys("esc", keyboard.esc);
});

onBeforeUnmount(() => {
    hotkeys.unbind("command+k,ctrl+k");
    hotkeys.unbind("esc");
});

watchEffect(() => {
    if (props.status === LEFTBAR_STATUS.SHOW_SEARCH_AND_CATEGORY) {
        category.reveal();
    }
});
</script>

<template>
    <div id="left" @mouseenter="mouse.enter" @mouseleave="mouse.leave">
        <ul class="nav">
            <li class="btn" id="search" @click="search.reveal">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
            </li>
        </ul>

        <div
            class="category"
            v-if="status != LEFTBAR_STATUS.ONLY_SEARCH_BUTTON"
        >
            <template v-for="(item, idx) in categories">
                <a
                    class="item"
                    :class="idx == active_id && 'active'"
                    :style="{ opacity: item.opacity }"
                    @click.prevent="$router.push(item.link)"
                    @mouseover="mouse.switch(idx)"
                    :href="item.link"
                >
                    {{ item.name }}
                </a>
            </template>
        </div>

        <Transition name="content">
            <component class="content" :is="VBody" v-if="do_show_detail" />
        </Transition>

        <!-- https://cn.vuejs.org/guide/built-ins/teleport.html -->
        <Teleport to="body">
            <Transition name="search">
                <KeepAlive>
                    <Search v-if="is_searching" @close="search.hide" />
                </KeepAlive>
            </Transition>
        </Teleport>
    </div>
</template>

<style lang="stylus">
@import "../assets/css/global.styl";

// Nav
$nav-width = 42px;
$nav-height = 40px;
$nav-gap = 2px;

$nav-color = lighten($text-color, 45%);
$nav-hover-color = $theme-color;
$nav-hover-background-color = alpha($theme-color, 12%);

$item-color = lighten($text-color, 10%);
$item-active-color = $theme-color;
$item-underline-color = lighten($theme-color, 50%);
$item-hover-background-color = alpha($theme-color, 12%);

// TOC
$toc-translate-offset = -8px;
$toc-offset-left = 28px;
$toc-offset-top = 11px + $nav-height;
$toc-width = 240px;
$toc-title-height = 1.45rem;
$toc-title-indent = 0.5rem;

$toc-color = lighten($text-color, 30%);

// Search
$search-scale = 0.99;

// Global
$offset-top = 28px;
$offset-left = 35px;
$background-radius = 4px;
$width = $toc-offset-left + $toc-width;
$height = 100vh - $offset-top * 2;

#left
    position: fixed;
    left: $offset-left;
    top: $offset-top;
    width: $width;
    height: $height;

    .nav
        display: flex;
        flex-direction: row;
        gap: $nav-gap;

        .btn
            height: $nav-height;
            width: $nav-width;
            text-align: center;
            line-height: $nav-height;
            font-size: 1.2rem;
            border-radius: 3px;
            transition: background-color 0.07s, color 0.08s;
            color: $nav-color;
            cursor: pointer;
            display: block;

            &:hover
                background-color: $nav-hover-background-color;
                color: $nav-hover-color;

    .category
        position: absolute;
        display: flex;
        flex-direction: row;
        top: 0;
        left: $nav-width + $nav-gap;
        height: $nav-height;
        text-wrap: nowrap;
        overflow: hidden;
        border-radius: background-radius;
        user-select: none;

        .item
            height: $nav-height;
            line-height: $nav-height;
            font-size: 0.94rem;
            padding: 0 12px;
            color: $item-color;
            text-decoration-color: transparent;
            border-radius: 3px;
            transition: background-color 0.07s, opacity 0.08s, text-decoration-color 0.08s;

            &:hover
                color: $item-active-color;
                background-color: $item-hover-background-color;

            &.active
                color: $item-active-color;
                text-decoration-line: underline;
                text-underline-offset: 5px;
                text-decoration-style: wavy;
                text-decoration-color: $item-underline-color;

    .content
        position: absolute;
        left: $toc-offset-left;
        top: $toc-offset-top;
        width: $toc-width;
        display: block;
        border-radius: $background-radius;
        padding: 15px 0;

    .content .title
        color: $toc-color;
        font-size: 0.95rem;
        line-height: $toc-title-height;
        margin-bottom: 5px;
        padding-right: 10px;
        display: flex;
        gap: 8px;
        transition: color 0.2s;

    .content .title.router-link-exact-active .text
        color: $theme-color;

    .content .title .sign
        color: $theme-color;
        opacity: 0;
        transition: opacity 0.1s;
        font-size: 0.7rem;
        display: block;
        animation: shake-x 1s infinite ease-in-out;

    .content .title .text
        text-indent: 0 - $toc-title-indent;
        padding-left: $toc-title-indent;

    .content .title:hover .text
        color: $theme-color;

    .content .title:hover .sign
        opacity: 1;

    .content .children
        margin-left: 1rem;

    .content > .children
        margin: 0;

    .content-enter-active,
    .content-leave-active
        transition-property: opacity, transform;

    .content-enter-active
        transition-duration: 0.12s;
        transition-timing-function: ease-out;

    .content-leave-active
        transition-duration: 0.07s;
        transition-timing-function: cubic-bezier(0.15, 0.79, 0.69, 0.68);

    .content-enter-from,
    .content-leave-to
        opacity: 0;
        transform: translateY($toc-translate-offset);


.search-enter-active,
.search-leave-active
    transition-property: opacity, transform;
    transition-duration: 0.12s;

.search-enter-active
    transition-timing-function: cubic-bezier(0.41, 0.16, 0.83, 0.74);

.search-leave-active
    transition-timing-function: cubic-bezier(0.08, 0.46, 0.76, 0.89);

.search-enter-from,
.search-leave-to
    opacity: 0;
    transform: scale($search-scale);


@media (max-width: 768px) // TODO
    *
        --offset-top: 28px;
        --offset-left: 35px;

        --item-hover-background-color: unset;
        --$nav-hover-background-color: unset;

        --width: unset;
        --height: unset;

        --$nav-width: 35px;
        --$nav-gap: 0px;

    #left
        position: absolute;

    .nav .btn
        font-size: 1rem;

    .category .item
        font-size: 0.85rem;
        padding: 0 9px;
</style>
