import { createRouter, createWebHistory } from "vue-router";

import type { RouteRecordRaw, RouterScrollBehavior } from "vue-router";

const scrollBehavior: RouterScrollBehavior = (_, __, saved) => {
    let target = saved ?? { left: 0, top: 0 };

    const el = document.getElementById("app")!;
    const minHeight = target.top + window.innerHeight;

    el.style.setProperty("min-height", `${minHeight}px`);

    return target;
};

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "home",
        component: () => import("@/views/HomeView.vue"),
    },
];

const router = createRouter({
    routes,
    scrollBehavior,
    history: createWebHistory(),
});

export default router;
