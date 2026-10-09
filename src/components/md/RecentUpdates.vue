<script setup lang="ts">
import stats from "@cache/stats";
import dayjs from "@/assets/ts/dayjs";
import Anchor from "./Anchor.vue";

defineProps<{ block?: boolean }>();
defineOptions({ inheritAttrs: false });
</script>
<template>
    <component
        :is="block ? 'p' : 'span'"
        v-for="(post, i) in stats.recent"
        :key="post.link"
        v-bind="$attrs"
        class="recent-update"
    >
        {{ "\u00a0"
        }}<font-awesome-icon
            class="icon"
            :icon="['fas', ['a', 'b', 'c'][i]]"
        />{{ " " }}
        <Anchor
            :href="post.link"
            :title="`更新于 ${dayjs(post.updated).format('YYYY-MM-DD HH:mm:ss')}`"
            >{{ post.title }}</Anchor
        >
    </component>
</template>
<style scoped>
.recent-update {
    display: block;
    margin: 1em 0;
}
</style>
