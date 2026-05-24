<script setup>
import { useSlots, computed } from "vue";

const props = defineProps({
    lang: { type: String, default: "text" },
});

const slots = useSlots();

const extractedCode = computed(() => {
    if (!slots.default) return "";

    // 1. Get the raw text from the slot
    // This handles both direct text and text inside a <pre> or <code> tag
    const slotContent = slots.default();
    let rawText = "";

    const walk = (nodes) => {
        nodes.forEach((node) => {
            if (typeof node.children === "string") {
                rawText += node.children;
            } else if (Array.isArray(node.children)) {
                walk(node.children);
            }
        });
    };

    walk(slotContent);

    // 2. Dedent logic: Remove common leading indentation
    const lines = rawText.split("\n");

    // Remove empty leading/trailing lines often caused by formatting
    while (lines.length && lines[0].trim() === "") lines.shift();
    while (lines.length && lines[lines.length - 1].trim() === "") lines.pop();

    const minIndent = lines.reduce((min, line) => {
        if (line.trim().length === 0) return min;
        const match = line.match(/^\s*/);
        return Math.min(min, match[0].length);
    }, Infinity);

    return lines.map((line) => line.slice(minIndent)).join("\n");
});

// recalculate overflow classes after a delay
setTimeout(() => {
    // only run if we aren't prerendering
    if (!process.prerender) window.dispatchEvent(new Event("recalcOverflow"));
}, 300);
</script>

<template>
    <Shiki :lang="lang" :code="extractedCode" />
</template>

<style>
code {
    background-color: transparent !important;
}

code.shiki {
    counter-reset: step;
    counter-increment: section 0;
}

code.shiki .line::before {
    content: counter(step);
    counter-increment: step;
    margin-right: 1ch;
    display: inline-block;
    text-align: right;
    color: rgba(115, 138, 148, 0.4);
}
</style>
