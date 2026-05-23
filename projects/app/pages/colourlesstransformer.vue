<script setup>
definePageMeta({
    title: "ColourlessTransformer",
    desc: "A Streamlit interface for PaintTransformer, a neural network that approximates images using paint strokes",
    img: "/colourlesstransformer.webp",
    imgAlt: "A highly stylized watercolour-style image of a concrete walkway runs alongside a dense hedge of flowering bushes, all under a sleek red pergola.",
});
</script>

<template>
    <main>
        <div class="heading">
            <h1 class="animated">ColourlessTransformer</h1>
        </div>
        <HeroImg />
        <div class="frontmatter">
            <ExternalLinks
                :urls="['github.com/ethmarks/colourlesstransformer']"
                animated
            />
        </div>
        <article class="animated">
            <p>
                <a href="https://github.com/ethmarks/colourlesstransformer"
                    >ColourlessTransformer</a
                >
                is an interface for
                <a href="https://arxiv.org/abs/2108.03798">Paint Transformer</a>
                that I made using
                <a href="https://streamlit.io/">Streamlit</a>.
            </p>
            <h2>Paint Transformer</h2>
            <p>
                Paint Transformer is a program that approximates images using
                paint strokes. This gives the image a stylized
                watercolour/painterly aesthetic that I personally think looks
                quite nice.
            </p>
            <p>
                Paint Transformer was developed in
                <a href="https://arxiv.org/abs/2108.03798"
                    >this research paper</a
                >
                by a team of researchers (notably not including me).
                ColourlessTransformer uses
                <a href="https://github.com/Huage001/PaintTransformer"
                    >this pre-trained model</a
                >
                created by
                <a href="https://huage001.github.io/">Songhua Liu</a>
                (one of the authors of the paper).
            </p>
            <h3>How it works</h3>
            <p>
                Paint Transformer starts with an empty canvas of the same size
                as the input image. Then, it chooses a position somewhere on the
                canvas, usually in the top right quadrant. It feeds the input
                image and the position it chose into to a neural network and
                "asks" the neural network for the rotation, colour, and size of
                a single brush stroke that would result in the canvas looking
                closest to the input image. The neural network, predictably,
                responds with a brush stroke that covers most of the canvas and
                is approximately the same colour as the average colour of the
                image. Paint Transformer uses the neural network's response and
                pastes a PNG of a brush stroke onto the canvas with the
                specified position, colour, rotation, and size. The canvas
                doesn't look much like the input image at this stage, but in
                fairness there's only so much you can do with a single brush
                stroke.
            </p>
            <p>
                Then Paint Transformer chooses another position on the canvas
                and asks the neural network for the rotation, colour, and size
                of another brush stroke, which it will then paste on top of the
                first brush stroke. The neural network responds with a slightly
                smaller brush stroke with a colour that represents a more
                localized portion of the canvas. Now, with two brush strokes,
                the canvas still doesn't look much like the input image, but it
                does look a bit better.
            </p>
            <p>
                Then it repeats this process many more times. A lot more. The
                exact iteration count depends on the size of the image, but for
                a 512 pixel by 512 pixel image, Paint Transformer adds 2,728
                brush strokes. After so many brush strokes, the canvas starts to
                resemble the input image pretty closely, but with some visible
                artifacts and stroke edges. These artifacts are the whole point:
                they make the image look kind of pretty.
            </p>
            <figure>
                <video
                    class="responsive video"
                    src="/painttransformer_abbey_road.webm"
                    aria-label="A PaintTransformer timelapse of the album cover of Abbey Road by the Beatles. It starts off as an unrecognizable blob of colour, but gradually becomes discernible as detail is added"
                    autoplay
                    loop
                    playsinline
                ></video>
            </figure>
            <h3>This sounds like AI art...</h3>
            <p>
                It is. Kind of. There's ambiguity about whether Paint
                Transformer counts as generative AI.
            </p>
            <p>
                On the one hand, Paint Transformer works pretty similarly to
                diffusion-based AI image generators (e.g. Midjourney and DALL-E)
                in that they all start with an empty image (technically,
                diffusion-based generators start with Gaussian noise, but that's
                besides the point) that they iteratively refine into a
                non-vacuous image via a neural network.
            </p>
            <p>
                But on the other hand, Midjourney is far larger and more
                powerful than Paint Transformer and it can create truly novel
                material rather than just making an existing image look slightly
                different. On the scale between Midjourney and a simple
                Photoshop filter, Paint Transformer is somewhere in the middle.
            </p>
            <h2>The Interface</h2>
            <p>
                The Paint Transformer documentation suggests three ways to use
                it:
                <a href="https://huggingface.co/spaces/akhaliq/PaintTransformer"
                    >a Huggingface Space</a
                >,
                <a
                    href="https://github.com/Huage001/PaintTransformer?tab=readme-ov-file#app"
                    >a mobile app</a
                >, and
                <a
                    href="https://colab.research.google.com/drive/1m2gAYOdRIQVxrnVySmA-Pug0H_I13-Sp?usp=sharing"
                    >a Colab Notebook</a
                >. The Huggingface Space immediately throws a runtime error and
                doesn't work, the mobile app is exclusively available on the
                Baidu app store (which can only be accessed in mainland China),
                and the Colab notebook is functional but hard to use and
                inconvenient.
            </p>
            <p>
                None of the official interfaces were viable options for me, so I
                decided to make my own custom interface.
            </p>
            <h3>Choosing a Framework</h3>
            <p>
                At the time, I didn't have much experience building websites, so
                I wanted to use a Python framework that included premade UI
                components so I didn't have to write HTML or CSS (I've since
                moved past this aversion).
            </p>
            <p>
                "I want a Python web framework with premade UI components" is a
                fairly common request in the Python community, so there are lots
                of available options. The most widely-used one is
                <a href="https://www.gradio.app/">Gradio</a>, which is what I
                used to make my first prototype. However, the prototype took
                around 2 minutes to start up each time, which to me seemed
                excessive. The main reason it was so slow is that Gradio is a
                very powerful and heavy framework. This is useful for complex
                applications where Gradio's featureset is useful, but all I
                needed was a way to drag-and-drop an image and display the
                output.
            </p>
            <p>
                So I rewrote the app in
                <a href="https://streamlit.io/">Streamlit</a>, which is a much
                lighter and (in my opinion) nicer framework.
            </p>
            <h3>Naming it</h3>
            <p>
                At the time, my GitHub username was "ColourlessSpearmint" (it's
                a reference to a book), so I decided to name my custom interface
                "ColourlessTransformer".
            </p>
            <h2>Usage</h2>
            <figure>
                <img
                    src="/painttransformer_interface_toby_chickens.webp"
                    class="responsive"
                    alt="A user interface built with Streamlit, showing a split-screen comparison. On the left is an uploaded image of a fluffy gray cat looking ominously down on a stock tank full of baby chickens. On the right is the corresponding generated image, which depicts the same scene rendered in a painterly, watercolour-like style with broad brushstrokes and vibrant colours."
                    width="1869"
                    height="964"
                />
                <figcaption>
                    Using ColourlessTransformer on a photo of my cat, Toby
                </figcaption>
            </figure>
            <p>
                First,
                <a href="https://git-scm.com/install/">install Git</a>
                and
                <a
                    href="https://github.com/astral-sh/uv?tab=readme-ov-file#installation"
                    >install <code>uv</code></a
                >
                if you haven't already. Next, run the following commands:
            </p>
            <Code lang="bash">
                <pre>
                    git clone https://github.com/ethmarks/ColourlessTransformer.git
                    cd ColourlessTransformer
                    uv sync
                    uv run main.py
                </pre>
            </Code>
            <p>
                This will download ColourlessTransformer, install the
                dependencies, start the Streamlit server, and open it in your
                browser. <code>uv</code> will handle all of the PyTorch stuff
                automatically and install the right version for your GPU or CPU.
            </p>
            <p>
                Once you have ColourlessTransformer running, you should
                drag-and-drop your image onto the little widget that says "Drag
                and drop file here", press the "Generate" button, and wait.
                After a few seconds, ColourlessTransformer will output the
                Paint-Transformed image.
            </p>
            <h3>Options</h3>
            <p>
                ColourlessTransformer has two options: animation and resizing.
            </p>
            <p>
                The animation option is really down to the preference and use
                case. Sometimes it's useful to see the whole process and the
                timelapse, other times you just want the final result. Enabling
                animation makes the process take a bit longer because it has to
                render each frame to a GIF. Enable it if you want, otherwise
                keep it disabled.
            </p>
            <p>
                The resizing option is much more clear cut: always use it. I
                made it toggleable because I want to respect user agency, but
                there's really never a reason to ever disable the resizing.
                Firstly, using larger images doesn't really improve the quality
                of the output. Because Paint Transformer produces abstract
                blobby images by its very nature, using sharper images doesn't
                result in a sharper output. Secondly, because of the way that
                Paint Transformer works internally, larger images require
                exponentially more processing steps than smaller ones, meaning
                they take <em>far</em> longer to process. 512x512 images take
                about 3 seconds to process on my Nvidia 1650 GTX, but 2048x2048
                images can take many minutes or even multiple hours. Exponential
                growth is not to be trifled with.
            </p>
            <h3>API Usage</h3>
            <p>
                If you want to use ColourlessTransformer programatically in your
                own projects, I have some documentation on that
                <a
                    href="https://github.com/ethmarks/ColourlessTransformer/tree/main?tab=readme-ov-file#python-api"
                    >here</a
                >, in the ColourlessTransformer README on GitHub.
            </p>
            <h2>Conclusion</h2>
            <figure>
                <img
                    src="/painttransformer_space_needle_comparison.webp"
                    class="responsive"
                    alt="Two images of the Seattle Space Needle, side-by-side. The left image is an photo, and the right image is heavily stylized and painterly, generated by Paint Transformer"
                    width="1869"
                    height="964"
                />
            </figure>
            <p>
                I love automation. Making computers do things that I would
                otherwise have had to do is intrinsically satisfying to me.
                ColourlessTransformer is an especially delightful project for me
                because it's a rare case of double automation: if Paint
                Transformer is automatic watercolour, ColourlessTransformer is
                automated Paint Transformer. Rather than tediously uploading and
                downloading files to a slow and inconvenient Colab notebook, I
                can simply type a few commands, drag-and-drop a file, and
                near-instantly convert an image into an abstract stylized
                watercolour. I think that's pretty cool.
            </p>
            <p>~Ethan</p>
        </article>
    </main>
</template>
