<script setup lang="ts">
import { onMounted } from "vue";
import { loadJS } from "@/assets/ts/utils";

import "@/assets/css/twikoo.css";

const URL = "https://cdn.jsdelivr.net/npm/twikoo@1.6.39/dist/twikoo.nocss.js";
const ENV_ID = "https://twikoo-blog.xecades.xyz/";

onMounted(async () => {
    await loadJS(URL);

    // @ts-expect-error
    const twikoo = window.twikoo;
    await twikoo.init({ envId: ENV_ID, el: "#twikoo" });
});
</script>

<template>
    <div id="comment">
        <div id="twikoo" />
    </div>
</template>

<style>
#comment {
    --border-color: #eee;
    --input-color: #888;
    --owo-background-color: #fff;

    margin: 0 var(--margin-lr) 7rem;
}

@media (prefers-color-scheme: dark) {
    #comment {
        --border-color: #2c2c2c;
        --input-color: #b0b1b5;
        --owo-background-color: #1f1f1f;
    }
}

#twikoo * {
    cursor: unset !important;
}

#twikoo .OwO .OwO-body {
    background-color: var(--owo-background-color);
    color: unset;
}

#twikoo .tk-extras {
    display: none;
}

#twikoo .tk-input textarea {
    padding: 0.7rem 1rem;
    min-height: 170px !important;
    background: none !important;
    resize: none;
    border: 0;
}

#twikoo .tk-nick-link {
    margin-right: 0.3rem;
}

#twikoo .tk-actions a {
    color: #777;
}

#twikoo .tk-actions {
    font-size: 0.8rem;
}

#twikoo .tk-comment {
    margin-bottom: 1rem;
}

#twikoo .tk-comments-title {
    font-size: 1.1rem;
    font-weight: normal;
}

#twikoo .tk-avatar {
    border-radius: 50%;
    margin-right: 0.7rem;
}

#twikoo .tk-content {
    max-height: unset;
    font-size: 16px;
}

#twikoo .tk-time {
    margin-left: 0.5rem;
    font-size: 0.8rem;
    color: #bebebe;
}

#twikoo .tk-footer {
    display: none;
}

#twikoo .tk-preview-container {
    overflow-wrap: break-word;
}

#twikoo .tk-submit .tk-col {
    border: 1px solid var(--border-color);
    border-radius: 4px;
}

#twikoo .tk-meta-input {
    margin: 0;
    padding: 0.4rem 0;
    border-bottom: 1px solid var(--border-color);
}

#twikoo .tk-meta-input .el-input {
    width: auto;
    margin: 0;
}

#twikoo .tk-meta-input .el-input-group__append,
#twikoo .tk-meta-input .el-input-group__prepend {
    background-color: transparent;
    border: none;
    border-radius: 0;
    padding-right: 0.2rem;
}

#twikoo .tk-meta-input .el-input__inner {
    border-radius: 0;
    border: none;
    padding-left: 0.2rem;
    color: var(--input-color);
}

#twikoo .tk-panel .tk-content a:not(.button) {
    color: #409eff;
}

#twikoo .tk-panel .tk-content code {
    color: #333;
}

#twikoo .tk-panel .tk-content blockquote {
    color: #fff;
}

#twikoo pre::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
}

#twikoo a {
    text-decoration: none;
}

#twikoo .tk-content a {
    color: #999;
}

@media (max-width: 768px) {
}
</style>
