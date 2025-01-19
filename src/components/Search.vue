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
                    class="input cursor"
                    v-model.trim="query"
                    type="text"
                    placeholder="Search in the void."
                    @keydown.esc="$emit('close')"
                />

                <div class="icon cursor xmark" @click="$emit('close')">
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
                        class="post cursor"
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

<style scoped>
* {
    --margin-lr: 1rem;
    --line-color: #e1e1e1;
    --icon-color: #d1d5db;
    --input-color: #3b3c3e;
    --xmark-hover-color: #9a9ca0;

    --panel-width: 720px;
    --panel-height: 430px;
    --panel-radius: 15px;
    --panel-background-color: #ffffffe6;

    --search-gap: 5px;
    --search-height: 50px;
    --search-margin-top: 5px;
    --search-icon-width: 27px;

    --results-bottom: 16px;

    --empty-icon-color: #f6f6f6;

    --post-hover-color: #f3f3f382;
    --post-title-color: #56585d;
    --post-icon-color: #737477;
    --post-content-color: #969797;
    --post-mark-background-color: #fef08a;
}

@media (prefers-color-scheme: dark) {
    * {
        --line-color: #303030;
        --icon-color: #505256;
        --input-color: #c1c5cd;
        --panel-background-color: #1d1e1fe6;
        --xmark-hover-color: #9a9ca0;
        --empty-icon-color: #303030b5;
        --post-hover-color: #21212182;
        --post-title-color: #c4c7cc;
        --post-icon-color: #96989c;
        --post-content-color: #9c9c9c;
        --post-mark-background-color: #57522b;
    }
}

.results {
    height: calc(
        100% - var(--search-height) - var(--search-margin-top) -
            var(--results-bottom)
    );
    overflow-y: hidden;
    margin: 0 var(--margin-lr) var(--results-bottom) var(--margin-lr);
    user-select: none;
}

.results .empty {
    width: 100%;
    height: 100%;
    position: relative;
}

.results .empty .icon {
    position: absolute;
    top: 50%;
    left: 50%;
    scale: 6.7;
    translate: -50%, -50%;
    color: var(--empty-icon-color);
}

.results .empty .icon.fa-spin {
    scale: 4;
}

.results .post {
    display: block;
    padding: 12px 16px;
    transition: background-color 0.15s;
}

.results .post:hover {
    background-color: var(--post-hover-color);
}

.results .post .meta {
    display: flex;
}

.results .post .meta .title {
    color: var(--post-title-color);
}

.results .post .meta .icon {
    color: var(--post-icon-color);
    padding: 2px 7px 0 4px;
    width: 17px;
    text-align: center;
    display: inline-block;
}

.results .post .meta .icon[data-type="index"] {
    font-size: 0.93rem;
}

.results .post .content {
    color: var(--post-content-color);
    margin: 6px 13px 0;
    font-size: 0.94rem;
    height: 1.6rem;
    line-height: 1.6rem;
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
}

.results .post mark {
    background-color: var(--post-mark-background-color);
    color: unset;
}

.search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: var(--search-margin-top) var(--margin-lr) 0;
    border-bottom: 1px solid var(--line-color);
    height: var(--search-height);
    gap: var(--search-gap);
}

.search .icon {
    flex: none;
    color: var(--icon-color);
    width: var(--search-icon-width);
    display: block;
    height: 100%;
    line-height: var(--search-height);
    text-align: center;
    padding: 0 4px;
}

.search .icon.glass {
    font-size: 1.2rem;
}

.search .icon.xmark {
    font-size: 1.4rem;
    transition: color 0.15s, transform 0.15s ease-in-out;
}

.search .icon.xmark:hover {
    color: var(--xmark-hover-color);
    transform: scale(1.05);
}

.search .input {
    appearance: none;
    flex: 1;
    height: 100%;
    outline: none;
    padding: 0 5px;
    color: var(--input-color);
    background-color: transparent;
    opacity: 0.9;
}

#search {
    z-index: 10000;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    backdrop-filter: blur(12px);
}

.panel {
    width: var(--panel-width);
    height: var(--panel-height);
    background-color: var(--panel-background-color);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid var(--line-color);
    border-radius: var(--panel-radius);
}

@media (max-width: 768px) {
    * {
        --panel-width: calc(100% - 3rem);
        --panel-height: calc(100% - 6rem);
    }

    .results .empty .icon {
        transform: translate(-50%, -50%) scale(5.7);
    }

    .results .post {
        padding: 12px 9px;
    }

    .results .post .content {
        margin: 6px 0 0 27px;
        font-size: 0.84rem;
    }
}
</style>
