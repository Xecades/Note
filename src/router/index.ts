import { nextTick } from "vue";
import routes from "@cache/routes";
import { createRouter, createWebHistory } from "vue-router";
import { assertType } from "@/assets/ts/types";

import type { RouteMeta } from "vite-plugin-vue-xecades-note";

const router = createRouter({
    routes: routes,
    async scrollBehavior(to, _, saved) {
        if (saved) return saved;
        if (to.hash) {
            await nextTick();
            const element = document.getElementById(decodeURIComponent(to.hash.slice(1)));
            if (element) return { el: element, top: 64 };
        }
        return { left: 0, top: 0 };
    },
    history: createWebHistory(),
});

router.afterEach((to, from) => {
    const meta = assertType<RouteMeta>(to.meta);
    if (meta.type === "root") document.title = "Xecades Notes";
    else document.title = `${meta.attr.title} | Xecades Notes`;
});

export default router;
