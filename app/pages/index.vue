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
                    A <span>Streamlit</span> interface for
                    <span>PaintTransformer</span>, a
                    <span>neural network</span> that approximates images using
                    paint strokes
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
                    An <span>AI</span> thesaurus built with
                    <span>Sveltekit</span> powered by <span>Cerebras</span>
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
                    A <span>Rust</span> tool that searches a
                    <span>cryptographic hash space</span>
                    for strings that contain part of their own
                    <span>SHA-256 hash</span>
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
    color: var(--color-accent);
}

h2 {
    color: var(--color-accent);
}

@media (prefers-reduced-motion: no-preference) {
    .animated h2 {
        animation: textEntrance 1s calc(0.3s + var(--child-animation-delay) * 6)
            ease both;
    }
    .projectCard:nth-child(even).animated h2 {
        animation-name: textEntrance;
    }
    .animated p {
        animation: textEntrance 1s calc(0.5s + var(--child-animation-delay) * 6)
            ease both;
    }

    /* For some reason, Chromium does _not_ handle the h2Entrance animations
       well, causing the frame rate to slow to a crawl for several seconds
       during page load. I thought for sure that it was the text-shadow effects
       that were causing the lag, but during testing I determined that they
       actually have a completely negligible effect. The culprit is actually the translateX()
       effects, which sounds bizarre but all of my testing has confirmed this.
       I suspect that it's caused by layout thrashing or something, but
       will-change didn't help, nor did translate3d(). The only solution that
       worked was to avoid translateX() entirely.
       So we default h2 elements to use the translateY()-based textEntrance
       animation (which runs smoothly on Chromium), and only use the
       translateX()-based h2Entrance animations when the browser is Firefox. */
    @-moz-document url-prefix() {
        .animated h2 {
            animation: h2EntranceRight 1s
                calc(0.3s + var(--child-animation-delay) * 6) ease both;
        }
        .projectCard:nth-child(even).animated h2 {
            animation-name: h2EntranceLeft;
        }
    }
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

@keyframes textEntrance {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
}
</style>
