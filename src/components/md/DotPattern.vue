<template>
    <div class="dot-pattern">
        <div class="content">
            <slot />
        </div>
        <svg class="pattern">
            <defs>
                <pattern
                    id=":ptn:"
                    width="16"
                    height="16"
                    patternUnits="userSpaceOnUse"
                    patternContentUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                >
                    <circle id="pattern-circle" cx="1" cy="1" r="1"></circle>
                </pattern>
            </defs>
            <rect
                width="100%"
                height="100%"
                stroke-width="0"
                fill="url(#:ptn:)"
            ></rect>
        </svg>
    </div>
</template>

<style scoped lang="stylus">
@import "../../assets/css/global.styl";

.dot-pattern
    dual(--dot-padding-y, 7rem, 5rem);
    scheme(--dot-fill, lighten(black, 70%), lighten(black, 30%));

    width: 100%;
    position: relative;
    padding: var(--dot-padding-y) 0;
    margin: -1rem 0;

    .content
        text-align: center;

    .pattern
        width: 100%;
        height: 100%;
        position: absolute;
        inset: 0;
        z-index: -1;
        pointer-events: none;
        fill: var(--dot-fill);
        mask-image: radial-gradient(white, transparent 90%);
</style>
