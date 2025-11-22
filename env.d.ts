/// <reference types="vite/client" />

declare module "vue-animate-height" {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<{
        height?: string | number;
        duration?: number;
        delay?: number;
        easing?: string;
        contentClass?: string;
        animationStateClasses?: Record<string, string>;
        applyInlineTransitions?: boolean;
        animateOpacity?: boolean;
        "aria-hidden"?: boolean;
    }>;
    export default component;
}
