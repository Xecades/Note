// Modules
import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import MasonryWall from "@yeger/vue-masonry-wall";

// Vue
import App from "./App.vue";

// JS
import "./assets/ts/fontawesome";
// import "./assets/ts/cursor";
import router from "./router";

// CSS
import "./assets/css/reset.styl";
// import "./assets/css/cursor.styl";
import "katex/dist/katex.min.css";
import "overlayscrollbars/overlayscrollbars.css";

// Console
const consoleMessage = () => {
    const year = new Date().getFullYear();
    console.log(`
┌─Xecades Alpha::Note────────────────────────────────┐
│                                                    │
│                Yet another notebook                │
│             Part of the Alpha Project.             │
│                                                    │
├────────────────────────────────────────────────────┤
│                                                    │
│ Github            https://github.com/Xecades/Note/ │
│ Website                       https://xecades.xyz/ │
│ QQ               [DNS TXT] https://qq.xecades.xyz/ │
│                                                    │
├────────────────────────────────────────────────────┤
│                                                    │
│ Built with Vue.js and... and my laptop.            │
│                                                    │
├────────────────────────────────────────────────────┤
│                                                    │
│  - [GPL-3.0 License]          for code             │
│  - [CC BY-NC-SA 4.0 License]  for notes            │
│                                                    │
│ Copyright © 2024 - ${year} Xecades                    │
│                                                    │
└────────────────────────────────────────────────────┘
    `);
};

// Main
(async () => {
    consoleMessage();

    const app = createApp(App);
    app.use(router);
    app.use(MasonryWall);
    app.component("font-awesome-icon", FontAwesomeIcon);
    app.mount("#app");
})();
