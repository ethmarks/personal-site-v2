<script setup>
import { computed } from "vue";

const props = defineProps({
    urls: {
        type: Array,
        required: true,
    },
    animated: {
        type: Boolean,
        default: false,
    },
});

const strategies = [
    {
        pattern: /github\.com/,
        icon: "github",
        label: "GitHub Repo",
    },
    {
        pattern: /codepen\.io/,
        icon: "codepen",
        label: "CodePen",
    },
    {
        pattern: /colab\.research\.google\.com/,
        icon: "colab",
        label: "Colab Notebook",
    },
];

const defaultStrategy = {
    icon: "webpage",
    label: "Webpage",
};

function normalizeUrl(url) {
    if (!url.match(/^https?:\/\//)) {
        return `https://${url}`;
    }
    return url;
}

const processedLinks = computed(() => {
    return props.urls
        .filter((url) => url) // Filter out empty strings
        .map((rawUrl) => {
            const href = normalizeUrl(rawUrl);

            const match = strategies.find((s) => s.pattern.test(rawUrl));

            const config = match || defaultStrategy;

            return {
                href,
                icon: config.icon,
                label: config.label,
            };
        });
});

const animClass = props.animated ? "external-link animated" : "external-link";
</script>

<template>
    <div v-if="processedLinks.length" class="external-link-row">
        <a
            v-for="(link, index) in processedLinks"
            :key="index"
            :class="animClass"
            :href="link.href"
        >
            <img
                :src="`${useRuntimeConfig().app.baseURL.replace(/\/$/, '')}/icons/${link.icon}.svg`"
                :alt="`${link.label} icon`"
            />
            <span>{{ link.label }}</span>
        </a>
    </div>
</template>

<style>
.external-link {
    animation-fill-mode: both !important;
    animation-duration: 0.7s !important;
    animation-delay: 0.5s !important;
}
</style>
