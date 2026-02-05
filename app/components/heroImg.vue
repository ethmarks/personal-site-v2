<script setup>
const route = useRoute();

const img = route.meta.img;
const alt = route.meta.imgAlt;

const dims = useState(`dims-${route.path}`, () => ({
    width: undefined,
    height: undefined,
}));
if (import.meta.server) {
    try {
        const { imageSizeFromFile } = await import("image-size/fromFile");
        const dimensions = await imageSizeFromFile(`./public${img}`);
        dims.value.width = dimensions.width;
        dims.value.height = dimensions.height;
    } catch (e) {
        console.error("Server-side image sizing failed:", e);
    }
}

const config = useRuntimeConfig();
const base = config.app.baseURL.replace(/\/$/, "");
const src = `${base}${img}`;
const path = route.path.replace(/^\//, ""); // remove leading slash
const style = `view-transition-name: img-${path}`;
</script>

<template>
    <div class="hero">
        <img
            :src
            :alt
            :style
            :width="dims.width"
            :height="dims.height"
            decoding="sync"
            class="animated"
        />
    </div>
</template>
