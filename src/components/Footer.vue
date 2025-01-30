<script setup lang="ts">
import LinkTo from "./LinkTo.vue";

const year = new Date().getFullYear();
</script>

<template>
    <div id="footer">
        <div class="copyright">Copyright &copy; 2024 - {{ year }}</div>
        <div class="toolchain">
            Powered by
            <LinkTo src="https://vitejs.dev/">Vite</LinkTo>
            &
            <LinkTo src="https://v3.vuejs.org/">Vue 3</LinkTo>, hosted on
            <LinkTo src="https://vercel.com/">Vercel</LinkTo>.
        </div>
    </div>
</template>

<style scoped lang="stylus">
@import "../assets/css/global.styl";

$copyright-height = 20px;
$toolchain-height = 20px;
$right-gap = 12px;
$height = $copyright-height + $right-gap + $toolchain-height

#footer
    scheme(--color, lighten($text-color, 34%), darken($text-color-d, 15%));

    width: 100%;
    margin-bottom: 3rem;
    margin-top: 6rem;
    text-align: center;
    color: var(--color);

    .copyright
        font-size: 1.1rem;
        height: $copyright-height;
        line-height: $copyright-height;
        margin-bottom: $right-gap;
        font-feature-settings: "smcp";

    .toolchain
        font-size: 0.9rem;
        height: $toolchain-height;
        line-height: $toolchain-height;
</style>
