<script setup lang="ts">
import { ref, useId } from "vue";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import AutoHeight from "../AutoHeight.vue";

const props = defineProps<{ count: number }>();
const active = ref(0);
const id = useId();
const buttons = ref<HTMLButtonElement[]>([]);
function onKey(event: KeyboardEvent, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % props.count;
    else if (event.key === "ArrowLeft")
        next = (index + props.count - 1) % props.count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = props.count - 1;
    else return;
    event.preventDefault();
    active.value = next;
    buttons.value[next]?.focus();
}
</script>

<template>
    <div class="tab">
        <div class="header-wrapper">
            <OverlayScrollbarsComponent
                element="div"
                class="header-container"
                :options="{
                    scrollbars: { autoHide: 'move', autoHideDelay: 500 },
                    overflow: { y: 'visible-hidden' },
                }"
            >
                <div class="header" role="tablist" aria-label="内容选项卡">
                    <button
                        v-for="n in count"
                        :key="n"
                        ref="buttons"
                        class="item"
                        type="button"
                        role="tab"
                        :id="`${id}-tab-${n}`"
                        :aria-controls="`${id}-panel-${n}`"
                        :aria-selected="active === n - 1"
                        :tabindex="active === n - 1 ? 0 : -1"
                        :class="{ active: active === n - 1 }"
                        @click="active = n - 1"
                        @keydown="onKey($event, n - 1)"
                    >
                        <slot :name="`title-${n - 1}`" />
                    </button>
                </div>
            </OverlayScrollbarsComponent>
        </div>
        <div class="content">
            <AutoHeight :transition-key="active">
                <div
                    v-for="n in count"
                    :key="n"
                    class="tab-panel"
                    role="tabpanel"
                    :id="`${id}-panel-${n}`"
                    :aria-labelledby="`${id}-tab-${n}`"
                    :hidden="active !== n - 1"
                    tabindex="0"
                >
                    <slot :name="`panel-${n - 1}`" />
                </div>
            </AutoHeight>
        </div>
    </div>
</template>

<style lang="stylus">
@import "../../assets/css/global.styl";

$header-height = 2.8rem;

.tab
    scheme(--border-color, lighten(black, 89%), lighten(black, 24%));
    scheme(--header-border-color, lighten(black, 91%), lighten(black, 20%));
    scheme(--header-color, lighten($text-color, 44%), alpha($text-color-d, 56%));
    scheme(--header-active-color, $text-color, $text-color-d);
    scheme(--header-active-border, lighten($text-color, 30%), alpha($text-color-d, 70%));
    scheme(--header-background-color, alpha(black, 3%), alpha(white, 3%));
    scheme(--title-hover-color, lighten(black, 92%), lighten(black, 20%));

    margin: 1.5em var(--block-extend);
    border: 1px solid var(--border-color);
    border-radius: 3px;
    overflow: hidden;

    > .header-wrapper
        padding: 0 0.8em;
        background-color: var(--header-background-color);

        > .header-container
            height: $header-height;
            border-bottom: 1px solid var(--header-border-color);

            .os-scrollbar-horizontal
                --os-size: 7px;
                bottom: -2px;

        > .header-container .header
            display: flex;
            color: var(--header-color);
            height: $header-height;

            > .item
                display: inline-block;
                padding: 0 0.9rem;
                line-height: $header-height;
                font-size: 0.8em;
                flex-shrink: 0;
                transition: background-color 0.06s ease;
                position: relative;
                cursor: pointer;

                &:hover
                    background-color: var(--title-hover-color);

                &.active
                    color: var(--header-active-color);
                    border-bottom: 1.5px solid var(--header-active-border);

    > .content
        --block-extend: 0px;
</style>

<!-- Keep relational selectors in plain CSS: Stylus rewrites nested :is() lists. -->
<style>
.tab-panel {
    padding: 0.5rem 1.4rem;
    overflow: hidden;
}
.tab-panel:has(> :is(.block-code, .quote, .index-comp):only-child) {
    padding: 0;
}
.tab-panel > .block-code:only-child {
    margin: 0;
    border: none;
    background: unset;
}
.tab-panel > .quote:only-child {
    margin: 3rem 1.4rem;
}
.tab-panel > .index-comp:only-child {
    margin: 2rem 1.4rem;
}
</style>

<style scoped>
button.item {
    background: none;
    border: 0;
    color: inherit;
    font-family: inherit;
}
.tab-panel[hidden] {
    display: none;
}
</style>
