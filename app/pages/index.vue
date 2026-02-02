<template>
    <main>
        <h1 id="site-heading" class="animated">Projects</h1>
        <div class="projectCard-container">
            <ProjectCard
                id="colourlesstransformer"
                href="/colourlesstransformer"
                img="/colourlesstransformer.webp"
                alt="A highly stylized watercolour-style image of a concrete walkway runs alongside a dense hedge of flowering bushes, all under a sleek red pergola."
                title="ColourlessTransformer"
                desc="A Streamlit interface for PaintTransformer, a neural network that approximates images using paint strokes"
            />
            <ProjectCard
                id="thessa"
                href="/thessa"
                img="/thessa.webp"
                alt="Screenshot of the Thessa interface with the input bar open"
                title="Thessa"
                desc="An AI thesaurus built with Sveltekit powered by Cerebras"
            />
            <ProjectCard
                id="fphf"
                href="/fphf"
                img="/fphf_konsole.webp"
                alt="A screenshot of fphf being used in a terminal window against an abstract blue desktop wallaper. After running the command 'fphf', the terminal fills with status info as the process runs before eventually returning the string 'The SHA-256 hash of this sentence begins with b43c8b9.' and the hash 'b43c8b96f151033a566e148d45c43aa84ba153ff9407397f23d5eb43112bb5e1'"
                title="Fixed-Point Hash Finder"
                desc="A Rust tool that searches a cryptographic hash space for strings that contain part of their own SHA-256 hash"
            />
        </div>
    </main>
</template>

<style scoped>
h1 {
    margin-inline: auto;
}
</style>
