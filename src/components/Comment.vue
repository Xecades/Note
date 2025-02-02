<script setup lang="ts">
import { onMounted } from "vue";
import { loadJS } from "@/assets/ts/utils";

import "@/assets/css/twikoo.css";
import router from "@/router";

let script: HTMLScriptElement | null = null;

const URL = "https://cdn.jsdelivr.net/npm/twikoo@1.6.39/dist/twikoo.nocss.js";
const ENV_ID = "https://twikoo-blog.xecades.xyz/";

const loadTwikoo = async () => {
    if (script) script.remove();
    script = await loadJS(URL);

    // @ts-expect-error
    const twikoo = window.twikoo;
    await twikoo.init({ envId: ENV_ID, el: "#twikoo" });
};

router.afterEach(loadTwikoo);
onMounted(loadTwikoo);
</script>

<template>
    <div id="comment">
        <div id="twikoo" />
    </div>
</template>

<style lang="stylus">
@import "../assets/css/global.styl";

#comment
    scheme(--border-color, #eaeaea, #363636);
    scheme(--input-color, #666666, #b0b1b5);
    scheme(--owo-background-color, #fff, #1f1f1f);
    scheme(--owo-color, #4a4a4a, #d3d3d3);

    margin: 0 var(--margin-lr) 7rem;

    .OwO .OwO-body
        color: var(--owo-color);
        background-color: var(--owo-background-color);

    .tk-extras
        display: none;

    .tk-input textarea
        padding: 0.7rem 1rem;
        min-height: 170px !important;
        background-size: 200px;
        background-repeat: no-repeat;
        background-position: right;
        background-color: transparent;
        background-position-x: calc(100% - 1rem);
        resize: none;
        transition: background-position-y 0.2s ease-in-out 0s;
        border: 0;

        &:focus
            background-position-y: calc(100% + 200px);

    .tk-nick-link
        margin-right: 0.3rem;

    .tk-actions
        font-size: 0.8rem;

        a
            color: #777;

    .tk-comment
        margin-bottom: 1rem;

    .tk-comments-title
        font-size: 1.1rem;
        font-weight: normal;

    .tk-avatar
        border-radius: 50%;
        margin-right: 0.7rem;

    .tk-content
        max-height: unset;
        font-size: 16px;
        line-height: 1.8rem;

    .tk-time
        margin-left: 0.5rem;
        font-size: 0.8rem;
        color: #bebebe;

    .tk-footer
        display: none;

    .tk-preview-container
        overflow-wrap: break-word;

    .tk-submit .tk-col
        border: 1px solid var(--border-color);
        border-radius: 4px;

    .tk-meta-input
        margin: 0;
        padding: 0.4rem 0;
        border-bottom: 1px solid var(--border-color);

        .el-input
            width: auto;
            margin: 0;

        .el-input-group__append,
        .el-input-group__prepend
            background-color: transparent;
            border: none;
            border-radius: 0;
            padding-right: 0.2rem;

        .el-input__inner
            border-radius: 0;
            border: none;
            padding-left: 0.2rem;
            color: var(--input-color);

    .tk-panel .tk-content
        a:not(.button)
            color: #409eff;

        code
            color: #333;

        blockquote
            color: #fff;

        a
            color: #999;

    pre::-webkit-scrollbar
        width: 0 !important;
        height: 0 !important;

    a
        text-decoration: none;

    a.tk-ruser
        color: $theme-color;

        &:hover
            text-decoration: underline;

@media (prefers-color-scheme: dark)
    #comment .tk-input textarea
        background: none !important;
</style>
