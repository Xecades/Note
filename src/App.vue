<script setup lang="ts">
import { computed } from "vue";
import { useWindowSize } from "@vueuse/core";
import { useRoute } from "vue-router";
import { get_leftbar_status } from "@/assets/ts/leftbar";
import { get_rightbar_status } from "@/assets/ts/rightbar";
import { assertType } from "@/assets/ts/types";

import LeftBar from "@/components/LeftBar.vue";
import RightBar from "@/components/RightBar.vue";
import Content from "@/components/Content.vue";
import Logo from "./components/Logo.vue";

import type { RouteMeta } from "vite-plugin-vue-xecades-note";

const route = useRoute();
const meta = computed(() => assertType<RouteMeta>(route.meta));
const { width } = useWindowSize();
const left_stat = computed(() => get_leftbar_status(width.value));
const right_stat = computed(() => get_rightbar_status(width.value));
</script>

<template>
    <div id="main" v-if="meta.attr">
        <LeftBar :status="left_stat" :current-category="meta.category" />
        <Content :meta="meta" />
        <RightBar :status="right_stat" :toc="meta.toc" />
        <Logo />
    </div>
</template>

<style scoped lang="stylus">
#main
    width 100vw
    display flex
</style>
