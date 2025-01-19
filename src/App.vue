<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { get_leftbar_status } from "@/assets/ts/leftbar";
import { get_rightbar_status } from "@/assets/ts/rightbar";
import { assertType, LEFTBAR_STATUS, RIGHTBAR_STATUS } from "@/assets/ts/types";
import router from "@/router";

import LeftBar from "@/components/LeftBar.vue";
import RightBar from "@/components/RightBar.vue";
import Content from "@/components/Content.vue";

import type { Ref } from "vue";
import type { RouteMeta } from "vite-plugin-vue-xecades-note";

const route = useRoute();
const meta: Ref<RouteMeta | null> = ref(null);
router.afterEach(() => (meta.value = assertType<RouteMeta>(route.meta)));

const left_stat: Ref<LEFTBAR_STATUS> = ref(get_leftbar_status());
const right_stat: Ref<RIGHTBAR_STATUS> = ref(get_rightbar_status());
window.onresize = () => {
    left_stat.value = get_leftbar_status();
    right_stat.value = get_rightbar_status();
};

const in_view: Ref<number | null> = ref(null);
</script>

<template>
    <div id="main" v-if="meta">
        <LeftBar :status="left_stat" :current-category="meta.category" />
        <Content :meta="meta" />
        <RightBar :status="right_stat" :in-view="in_view" :toc="meta.toc" />
    </div>
</template>

<style scoped lang="stylus">
#main
    width 100vw
    display flex
</style>
