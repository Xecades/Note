<script setup lang="ts">
import stats from "@cache/stats";
import dayjs from "@/assets/ts/dayjs";
defineProps<{ kind: "pages" | "words" | "updated" }>();
</script>
<template>
    <span>{{ kind === "updated" ? dayjs(stats.updated).fromNow() : stats[kind] }}</span>
</template>
