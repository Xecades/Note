<script setup lang="ts">
import { ref, watch } from "vue";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import { search } from "@/assets/ts/search";

// Types
import type { Ref } from "vue";
import type { PartialOptions } from "overlayscrollbars";
import type { Result } from "@/assets/ts/search";

const query: Ref<string> = ref("");
const results: Ref<Result[]> = ref([]);
const isLoading: Ref<boolean> = ref(true);

const osOptions: PartialOptions = {
    scrollbars: { autoHide: "move" },
    overflow: { x: "hidden" },
};

watch(
    query,
    async () => {
        results.value = await search(query.value, () => {
            isLoading.value = false;
        });
    },
    { immediate: true }
);
</script>

<template>
    <div id="search" @click.self="$emit('close')">
        <div class="panel">
            <div class="search">
                <div class="icon glass">
                    <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                </div>

                <input
                    class="input"
                    v-model.trim="query"
                    type="text"
                    placeholder="Search in the void."
                    @keydown.esc="$emit('close')"
                />

                <div class="icon xmark" @click="$emit('close')">
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                </div>
            </div>

            <OverlayScrollbarsComponent
                element="ul"
                class="results"
                :options="(osOptions as any)"
                defer
            >
                <li class="empty" v-if="results.length === 0">
                    <font-awesome-icon
                        class="icon"
                        :icon="['fas', isLoading ? 'spinner' : 'face-frown']"
                        :spin="isLoading"
                    />
                </li>
                <li v-for="res in results">
                    <router-link
                        :to="res.link"
                        class="post"
                        @click="$emit('close')"
                    >
                        <div class="meta">
                            <span
                                class="icon"
                                :data-type="res.is_index ? 'index' : 'post'"
                            >
                                <font-awesome-icon
                                    :icon="[
                                        'fas',
                                        res.is_index ? 'folder' : 'file',
                                    ]"
                                />
                            </span>
                            <span class="title">
                                <template v-if="res.type === 'title'">
                                    <span>{{ res.before }}</span>
                                    <mark>{{ res.mark }}</mark>
                                    <span>{{ res.after }}</span>
                                </template>
                                <template v-else>
                                    <span>{{ res.title || "[无标题]" }}</span>
                                </template>
                            </span>
                        </div>
                        <div class="content">
                            <template v-if="res.type === 'content'">
                                <span>{{ res.before }}</span>
                                <mark>{{ res.mark }}</mark>
                                <span>{{ res.after }}</span>
                            </template>
                            <template v-else>
                                <span>{{ res.content || "[空]" }}</span>
                            </template>
                        </div>
                    </router-link>
                </li>
            </OverlayScrollbarsComponent>
        </div>
    </div>
</template>

<style scoped lang="stylus">
@import "../assets/css/global.styl";

$margin-lr = 1rem;
$line-color = lighten(black, 87%);
$icon-color = lighten(black, 50%);
$input-color = $text-color;
$xmark-hover-color = lighten(black, 30%);

$panel-width = 720px;
$panel-height = 430px;
$panel-width-sm = calc(100% - 2rem);
$panel-height-sm = calc(100% - 4rem);
$panel-radius = 15px;
$panel-background-color = alpha(white, 95%);

$search-gap = 5px;
$search-height = 50px;
$search-margin-top = 5px;
$search-icon-width = 27px;

$results-bottom = 16px;

$empty-icon-color = lighten(black, 85%);

$post-hover-background-color = alpha(black, 6%);
$post-title-color = lighten($text-color, 15%);
$post-icon-color = lighten($text-color, 38%);
$post-content-color = lighten($text-color, 48%);
$post-mark-background-color = #fef08a;

.results
    height: "calc(100% - %s)" % ($search-height + $search-margin-top + $results-bottom)
    overflow-y: hidden;
    margin: 0 $margin-lr $results-bottom $margin-lr;
    user-select: none;

    .empty
        width: 100%;
        height: 100%;
        position: relative;

        .icon
            position: absolute;
            top: 50%;
            left: 50%;
            scale: 6.7;
            translate: -50%, -50%;
            color: $empty-icon-color;

            &.fa-spin
                scale: 4;

    .post
        display: block;
        padding: 12px 16px;
        transition: background-color 0.15s;

        &:hover
            background-color: $post-hover-background-color;

        .meta
            display: flex;

            .title
                color: $post-title-color;

            .icon
                color: $post-icon-color;
                padding: 2px 7px 0 4px;
                width: 17px;
                text-align: center;
                display: inline-block;

                &[data-type="index"]
                    font-size: 0.93rem;

        .content
            color: $post-content-color;
            margin: 6px 13px 0;
            font-size: 0.94rem;
            height: 1.6rem;
            line-height: 1.6rem;
            overflow: hidden;
            text-overflow: ellipsis;
            text-wrap: nowrap;

        mark
            background-color: $post-mark-background-color;
            color: unset;

.search
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: $search-margin-top $margin-lr 0;
    border-bottom: 1px solid $line-color;
    height: $search-height;
    gap: $search-gap;

    .icon
        flex: none;
        color: $icon-color;
        width: $search-icon-width;
        display: block;
        height: 100%;
        line-height: $search-height;
        text-align: center;
        padding: 0 4px;

        &.glass
            font-size: 1.2rem;

        &.xmark
            cursor: pointer;
            font-size: 1.4rem;
            transition: color 0.15s, transform 0.15s ease-in-out;

        &.xmark:hover
            color: $xmark-hover-color;
            transform: scale(1.1);

    .input
        appearance: none;
        flex: 1;
        height: 100%;
        outline: none;
        padding: 0 5px;
        color: $input-color;
        background-color: transparent;
        opacity: 0.9;
        padding-bottom: 3px;

        &::placeholder
            color: $input-color;
            opacity: 0.7;

#search
    z-index: 10000;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    backdrop-filter: blur(12px);

.panel
    width: $panel-width;
    height: $panel-height;
    background-color: $panel-background-color;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid $line-color;
    border-radius: $panel-radius;

@media (max-width: 768px)
    .panel
        width: $panel-width-sm;
        height: $panel-height-sm;

    .results .empty .icon
        transform: translate(-50%, -50%) scale(5.7);

    .results .post
        padding: 12px 9px;

    .results .post .content
        margin: 6px 0 0 27px;
        font-size: 0.84rem;
</style>
