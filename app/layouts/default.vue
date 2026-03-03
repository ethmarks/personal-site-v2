<script setup>
const route = useRoute();

const canonUrl = "https://site-ethmarks.vercel.app/projects";
const assetsURL = "https://site-ethmarks.vercel.app/common";
const sourceURL = "https://github.com/ethmarks/projects";

const pageTitle = computed(() => route.meta.title || "Projects");
const pageDesc = computed(
    () =>
        route.meta.desc ||
        "The projects collection of Ethan Marks's personal website",
);
const pageImg = computed(() =>
    route.meta.img
        ? `${canonUrl}${route.meta.img}`
        : `${canonUrl}/ethmarks_projects.webp`,
);
const pageURL = `${canonUrl}${route.path}`;

useSeoMeta({
    title: pageTitle,
    ogTitle: pageTitle,
    description: pageDesc,
    ogUrl: pageURL,
    ogDescription: pageDesc,
    ogType: "website",
    ogImage: pageImg,
    twitterCard: "summary_large_image",
    twitterTitle: pageTitle,
    twitterDescription: pageDesc,
    twitterImage: pageImg,
});

useHead({
    htmlAttrs: { lang: "en-US" },
    link: [
        {
            rel: "canonical",
            href: pageURL,
        },
        {
            rel: "icon",
            href: `${assetsURL}/ethmarks.ico`,
            type: "image/x-icon",
        },
        { rel: "stylesheet", href: `${assetsURL}/ethmarks-rich.css` },
    ],
    script: [
        { src: `${assetsURL}/ethmarks.wc.js`, defer: true },
        { src: `${assetsURL}/overflow.js`, defer: true },
        {
            src: `https://site-ethmarks.vercel.app/_vercel/insights/script.js`,
            defer: true,
        },
        {
            innerHTML:
                "window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };",
        },
    ],
});
</script>

<template>
    <eth-header active="projects"></eth-header>
    <slot />
    <eth-footer :source="sourceURL"></eth-footer>
</template>
