<script setup lang="ts">
import LinkTo from "../LinkTo.vue";

const props = defineProps<{ href: string }>();
const external = /^https?:\/\/|^\/assets\//.test(props.href);

const isGitHub = /github\.com/.test(props.href);
</script>

<template>
    <div class="linkcard">
        <LinkTo :src="href" :mode="external ? 'jump' : 'stay'">
            <!-- Left -->
            <div class="content">
                <div class="item title"><slot /></div>
                <div class="item link">
                    <span class="icon">
                        <font-awesome-icon
                            v-if="external"
                            :icon="['fas', 'arrow-up-right-from-square']"
                        />
                        <font-awesome-icon v-else :icon="['far', 'star']" />
                    </span>
                    <span class="href">{{ href }}</span>
                </div>
            </div>

            <!-- Right -->
            <div class="logo">
                <font-awesome-icon v-if="isGitHub" :icon="['fab', 'github']" />
                <font-awesome-icon v-else :icon="['fas', 'link']" />
            </div>
        </LinkTo>
    </div>
</template>

<style scoped lang="stylus">
@import "../../assets/css/global.styl";

$width = 24rem;
$height = 4.2rem;
$logo-size = 3rem;
$gap = 1.4rem;

.linkcard
    scheme(--background, #f9f9f9, cyan);
    scheme(--border, #e1e4e8, cyan);
    scheme(--border-hover, lighten(#e1e4e8, 25%), cyan);

    scheme(--logo-color, #c3c6ca, cyan);
    scheme(--title-color, lighten($text-color, 10%), cyan);
    scheme(--icon-color, lighten($text-color, 50%), cyan);
    scheme(--href-color, lighten($text-color, 44%), cyan);

    > *  // Actually <a> tag
        width: $width;
        height: $height;
        max-width: calc(100% - 3.5rem);
        margin: 2rem auto;
        padding: 0.75rem 1.5rem;
        border-radius: 3px;
        background-color: var(--background);
        display: flex;
        gap: $gap;
        box-shadow: 0 0 0 1px var(--border);
        transition: box-shadow 0.05s cubic-bezier(0.4, 0, 0.2, 1);

        &:hover
            box-shadow: 0 0 0 3px var(--border-hover);

    .logo
        color: var(--logo-color);

        svg
            width: $logo-size;
            height: $logo-size;
            padding: (($height - $logo-size) / 2) 0;

    .content
        flex: 1;
        width: "calc(100% - %s)" % ($logo-size + $gap);

    .item
        height: $height / 2;
        line-height: $height / 2;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;

        &.title
            color: var(--title-color);

        &.link
            .icon
                font-size: 0.8em;
                margin-right: 6px;
                color: var(--icon-color);

            .href
                font-size: 0.9em;
                color: var(--href-color);
</style>
