<template>
    <main>
        <h1 id="site-heading" class="animated">Projects</h1>
        <div class="projectCard-container">
            <ProjectCard
                id="colourlesstransformer"
                href="/colourlesstransformer"
                img="/colourlesstransformer.webp"
                alt="A highly stylized watercolour-style image of a concrete walkway runs alongside a dense hedge of flowering bushes, all under a sleek red pergola."
            >
                <h2>ColourlessTransformer</h2>
                <p>
                    A <span style="color: #ff4b4b">Streamlit</span> interface
                    for <span style="color: #e4d328">PaintTransformer</span>, a
                    <span style="color: #7127d8">neural network</span> that
                    approximates images using paint strokes
                </p>
            </ProjectCard>
            <ProjectCard
                id="thessa"
                href="/thessa"
                img="/thessa.webp"
                alt="Screenshot of the Thessa interface with the input bar open"
            >
                <h2>Thessa</h2>
                <p>
                    An <span style="color: #00a67e">AI</span> thesaurus built
                    with <span style="color: #ff3e00">Sveltekit</span> powered
                    by <span style="color: #f15a27">Cerebras</span>
                </p>
            </ProjectCard>
            <ProjectCard
                id="fphf"
                href="/fphf"
                img="/fphf_konsole.webp"
                alt="A screenshot of fphf being used in a terminal window against an abstract blue desktop wallaper. After running the command 'fphf', the terminal fills with status info as the process runs before eventually returning the string 'The SHA-256 hash of this sentence begins with b43c8b9.' and the hash 'b43c8b96f151033a566e148d45c43aa84ba153ff9407397f23d5eb43112bb5e1'"
            >
                <h2>Fixed-Point Hash Finder</h2>
                <p>
                    A <span style="color: #e43a25">Rust</span> tool that
                    searches a
                    <span style="color: #0aaa52">cryptographic hash space</span>
                    for strings that contain part of their own
                    <span style="color: #9317c4">SHA-256 hash</span>
                </p>
            </ProjectCard>
        </div>
    </main>
</template>

<style scoped>
h1 {
    margin-inline: auto;
}

span {
    font-weight: 700;
}

h2 {
    color: var(--color-accent);
    animation: h2EntranceRight 1s calc(0.3s + var(--child-animation-delay) * 6)
        ease both;
}
.projectCard:nth-child(even) h2 {
    animation-name: h2EntranceLeft;
}
p {
    animation: descEntrance 1s calc(0.5s + var(--child-animation-delay) * 6)
        ease both;
}
@media (max-width: 768px) {
    h2 {
        margin-block: 0;
    }
    p {
        margin-block: 0;
    }
}

@keyframes h2EntranceRight {
    0% {
        opacity: 0;
        transform: translateX(100px);
        text-shadow:
            00px 0 3px color-mix(in srgb, var(--color-accent) 50%, black),
            20px 0 3px color-mix(in srgb, var(--color-accent) 60%, black),
            40px 0 3px color-mix(in srgb, var(--color-accent) 50%, black),
            80px 0 3px color-mix(in srgb, var(--color-accent) 40%, black);
    }

    60% {
        text-shadow:
            0px 0 1px color-mix(in srgb, var(--color-accent) 50%, black),
            1px 0 1px color-mix(in srgb, var(--color-accent) 60%, black),
            2px 0 1px color-mix(in srgb, var(--color-accent) 50%, black),
            4px 0 1px color-mix(in srgb, var(--color-accent) 40%, black);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
        text-shadow:
            0px 0 1px transparent,
            1px 0 1px transparent,
            2px 0 1px transparent,
            4px 0 1px transparent;
    }
}
@keyframes h2EntranceLeft {
    0% {
        opacity: 0;
        transform: translateX(-100px);
        text-shadow:
            00px 0 3px color-mix(in srgb, var(--color-accent) 50%, black),
            -20px 0 3px color-mix(in srgb, var(--color-accent) 60%, black),
            -40px 0 3px color-mix(in srgb, var(--color-accent) 50%, black),
            -80px 0 3px color-mix(in srgb, var(--color-accent) 40%, black);
    }

    60% {
        text-shadow:
            0px 0 1px color-mix(in srgb, var(--color-accent) 50%, black),
            -1px 0 1px color-mix(in srgb, var(--color-accent) 60%, black),
            -2px 0 1px color-mix(in srgb, var(--color-accent) 50%, black),
            -4px 0 1px color-mix(in srgb, var(--color-accent) 40%, black);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
        text-shadow:
            0px 0 1px transparent,
            -1px 0 1px transparent,
            -2px 0 1px transparent,
            -4px 0 1px transparent;
    }
}

@keyframes descEntrance {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
