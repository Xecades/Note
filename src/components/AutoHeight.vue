<script setup lang="ts">
import { nextTick, onMounted, onBeforeUnmount, ref, watch } from "vue";

const props = defineProps<{ transitionKey: string | number }>();
const container = ref<HTMLElement>();
const content = ref<HTMLElement>();
let observer: ResizeObserver | undefined;
let animation: Animation | undefined;
let targetHeight = 0;

// Animate panel switches only. At rest, height stays auto, so a nested Fold's
// animation participates directly in layout instead of being eased a second time.
watch(
    () => props.transitionKey,
    async () => {
        const element = container.value;
        if (!element) return;
        const from = element.getBoundingClientRect().height;
        animation?.cancel();
        await nextTick();
        if (!element.isConnected) return;
        targetHeight = content.value!.getBoundingClientRect().height;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;
        animation = element.animate(
            [{ height: `${from}px` }, { height: `${targetHeight}px` }],
            { duration: 200, easing: "ease" },
        );
    },
);

onMounted(() => {
    observer = new ResizeObserver(([entry]) => {
        const height =
            entry.borderBoxSize[0]?.blockSize ??
            entry.target.getBoundingClientRect().height;
        // If content changes during a panel switch (e.g. an image loads or a
        // Fold is clicked), release the animation and follow its natural height.
        if (Math.abs(height - targetHeight) > 0.5) animation?.cancel();
    });
    observer.observe(content.value!);
});
onBeforeUnmount(() => {
    observer?.disconnect();
    animation?.cancel();
});
</script>

<template>
    <div ref="container" class="auto-height">
        <div ref="content" class="auto-height-content"><slot /></div>
    </div>
</template>

<style scoped>
.auto-height {
    overflow: hidden;
}
.auto-height-content {
    display: flow-root;
}
</style>
