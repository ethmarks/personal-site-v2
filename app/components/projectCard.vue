<script setup>
const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    href: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    alt: {
        type: String,
        required: true,
    },
});
const route = useRoute();
const style = `view-transition-name: img-${props.id}`;

const config = useRuntimeConfig();
const base = config.app.baseURL.replace(/\/$/, "");
const src = `${base}${props.img}`;

const dims = useState(`dims-${route.path}`, () => ({
    width: undefined,
    height: undefined,
}));
if (import.meta.server) {
    try {
        const { imageSizeFromFile } = await import("image-size/fromFile");
        const dimensions = await imageSizeFromFile(`./public${props.img}`);
        dims.value.width = dimensions.width;
        dims.value.height = dimensions.height;
    } catch (e) {
        console.error("Server-side image sizing failed:", e);
    }
}
</script>

<template>
    <div class="projectCard animated staggered">
        <NuxtLink :to="href">
            <img
                class="card animated"
                :src
                :alt="props.alt"
                :style
                :width="dims.width"
                :height="dims.height"
            />
        </NuxtLink>
        <div class="info">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.projectCard {
    --column-one: 3fr;
    --column-two: 2fr;
    display: grid;
    grid-template-columns: var(--column-one) var(--column-two);
    gap: var(--spacing-lg);
}
.projectCard:nth-child(even) {
    grid-template-columns: var(--column-two) var(--column-one);
}

@media (max-width: 768px) {
    .projectCard {
        display: flex;
        flex-direction: column;
        gap: 0;
        padding: var(--spacing-xs);
    }
    .info {
        order: -1;
    }
    a {
        max-width: 90%;
    }
    .projectCard:nth-child(even) a {
        margin-left: auto;
    }
}

.projectCard:nth-child(even) .info {
    text-align: right;
}
@media (min-width: 769px) {
    .projectCard:nth-child(even) .info {
        order: -1;
    }
}

img.animated {
    animation: cardEntranceLeft 1s calc(var(--child-animation-delay) * 6) ease
        both;
}
.projectCard:nth-child(even) img.animated {
    animation-name: cardEntranceRight;
}

img {
    width: 100%;
    height: auto;
    max-width: 100%;
    object-fit: cover;
    border-radius: var(--radius-xl);
    border: var(--border-standard-2px);
}

a {
    display: block;
    width: 100%;
    height: 100%;
}

@keyframes cardEntranceLeft {
    0% {
        clip-path: xywh(0 0 0 30% round var(--radius-md));
    }
    60% {
        clip-path: xywh(0 0 100% 40% round var(--radius-md));
    }
    100% {
        clip-path: xywh(0 0 100% 100% round var(--radius-md));
    }
}

@keyframes cardEntranceRight {
    0% {
        clip-path: xywh(100% 0 0 30% round var(--radius-md));
    }
    60% {
        clip-path: xywh(0 0 100% 40% round var(--radius-md));
    }
    100% {
        clip-path: xywh(0 0 100% 100% round var(--radius-md));
    }
}
</style>
