<script setup lang="ts">
type TYPE = "default" | "success" | "info" | "warning" | "danger";

const icon: Record<TYPE, string> = {
    default: "asterisk",
    success: "lightbulb",
    info: "info-circle",
    warning: "exclamation-circle",
    danger: "exclamation-triangle",
};

const props = defineProps<{ type?: TYPE }>();
const type: TYPE = props.type || "default";
</script>

<template>
    <div class="note colors" :class="type">
        <div class="icon">
            <font-awesome-icon :icon="icon[type]" />
        </div>
        <div class="content">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.note {
    padding: 1.2rem 1.5rem;
    margin: 1.5rem var(--block-extend);
    display: flex;
    gap: 1rem;
    border-left: 4px solid var(--icon-color);
    border-radius: 5px;
    background: var(--background-color);
}

.icon {
    font-size: 1.2em;
    width: 20px;
    text-align: center;
    color: var(--icon-color);
}

.content {
    --inline-code-background: var(--content-code-color);

    flex: 1;
    font-size: 0.95em;
}
</style>
