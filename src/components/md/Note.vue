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

<style scoped lang="stylus">
.note
    padding: 0.9em 1.1em;
    margin: 1em var(--block-extend);
    background: var(--background-color);
    display: flex;
    gap: 0.8em;
    border: 1px solid var(--border-color);
    border-left: 4px solid var(--icon-color);
    border-radius: 5px;

.icon
    font-size: 1.1em;
    width: 20px;
    text-align: center;
    color: var(--icon-color);

.content
    flex: 1;
    font-size: 0.94em;
</style>
