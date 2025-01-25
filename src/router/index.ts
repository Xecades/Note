import { createRouter, createWebHistory } from "vue-router";
import routes from "@cache/routes";

const router = createRouter({
    routes: routes,
    scrollBehavior: (_, __, saved) => saved ?? { left: 0, top: 0 },
    history: createWebHistory(),
});

export default router;
