import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDevTools from "vite-plugin-vue-devtools";
import vueXecadesNote from "vite-plugin-vue-xecades-note";
import autoprefixer from "autoprefixer";

const customElement = ["rb"];

export default defineConfig({
    plugins: [
        // [@vitejs/plugin-vue]
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => customElement.includes(tag),
                },
            },
            include: [/\.vue$/],
        }),

        // [@vitejs/plugin-vue-jsx]
        vueJsx(),

        // [vite-plugin-vue-devtools]
        vueDevTools(),

        // [vite-plugin-vue-xecades-note]
        vueXecadesNote({
            componentDir: "src/components/md",
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@cache": fileURLToPath(new URL("./cache", import.meta.url)),
        },
    },
    css: {
        postcss: {
            plugins: [autoprefixer()],
        },
    },
});
