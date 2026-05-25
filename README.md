# personal-site-v2

This repo archives of the second version of my personal website.

## Polyrepo Architecture

This site was originally developed with its source code split across 7 different
repos, each with a different framework. My reasoning for doing this is that I
wanted to be able to experiment with different frameworks, but at the time I
didn't want to use a monorepo orchestrator. So I put each section of the site in
a different repo and had each one independently deploy to a different URL. Then
I used Vercel Rewrites as a reverse proxy to join all the sections together.

For ease of archiving, I've merged all 7 repos into this monorepo using the
following bash commands (repeated for all 7 repos):

```bash
git remote add temp-remote https://github.com/ethmarks/site.git
git remote fetch temp-remote
git merge temp-remote/main --allow-unrelated-histories -m "Merge ethmarks/site history"
shopt -s extglob
git mv !(site|about|posts|ink|projects|common|404) site/
git remote remove temp-remote
```

## site

This section is the landing page. I wanted to make it as performant and
lightweight as possible. I managed to get the full page size down to 314
kilobytes, and the initial load down to 242 kilobytes kilobytes, despite having
9 images and more than 200 CSS rules.

I chose [**Astro**](https://astro.build/) for the framework, because of its
focus on performance and page speed. I enjoyed using Astro. I especially liked
Astro Components, which are basically just Svelte components but without the
runtime overhead.

This section's repo also contained the `vercel.json` that defined my reverse
proxy logic using Vercel Rewrites:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "trailingSlash": false,
  "rewrites": [
    {
      "source": "/common/:path*",
      "destination": "https://common-ethmarks.vercel.app/common/:path*"
    },
    {
      "source": "/about/:path*",
      "destination": "https://about-ethmarks.vercel.app/about/:path*"
    },
    {
      "source": "/posts/:path*",
      "destination": "https://posts-ethmarks.vercel.app/posts/:path*"
    },
    {
      "source": "/ink/:path*",
      "destination": "https://ink-ethmarks.vercel.app/ink/:path*"
    },
    {
      "source": "/projects/:path*",
      "destination": "https://projects-ethmarks.vercel.app/projects/:path*"
    }
  ]
}
```

## about

This section is my About Me page. I wanted to keep the code simple, but still
wanted to add touches of reactivity for things like the live-updating commit
counter.

I considered using [Alpine.js](https://alpinejs.dev/) because I already had some
experience with it, but I went with
[**petite-vue**](https://github.com/vuejs/petite-vue) because I wanted an excuse
to learn Vue syntax. I wrote the whole thing as (mostly) a single HTML file with
a bit of petite-vue sprinkled in, and I bundled it using Vite.

## posts

This section is where I hosted my articles. I wanted a lot of control over how
the Markdown source was processed, and I wanted it to use JS so I wouldn't have
to learn a new programming language just to modify the rendering pipeline.

I tried to use [11ty](https://www.11ty.dev/), but I found it frustrating and
unpleasant to use, so I switched to [**Lume**](https://lume.land/). Of all the
frameworks I've used, Lume is my favorite. It's very feature-rich out of the
box, but it's also highly extensible. As an added bonus, Lume was my first
introduction to Deno, an alternative JS runtime, which I absolutely love.

## ink

This section is where I hosted my creative writing. I wanted the technical side
to be as absolutely simple as possible so that the focus would be on the
content.

I chose [**Zola**](https://www.getzola.org/) because it was the SSG that seemed
the most "magical" and least extensible. I was mostly right,

## projects

This section is where I hosted writeups for a few of my projects. I wanted it to
be impressive-seeming and to use a modern framework. I put a lot of effort into
making flashy entrance animations and adding page transitions.

I considered using [NextJS](https://nextjs.org/), but I didn't really want to
learn React at the time, so I went with [**Nuxt**](https://nuxt.com/) instead.
Nuxt was by far my least favorite of the frameworks I used. I get the feeling
that Nuxt would be really powerful if I was doing things The Nuxt Way (e.g.
using Nuxt UI), but because I was doing things my way, I had to constantly fight
Nuxt to get it to do what I wanted.

## 404

This section is just the 404 page. I had already had a 404 page that I was
really happy with from the first version of my personal website, so I just
copied it over.

I wanted it to be a single HTML file for stability so I wouldn't need to worry
about loading external assets.
[**vite-plugin-singlefile**](https://www.npmjs.com/package/vite-plugin-singlefile)
was the easiest way I could find to do this.

## common

This section provides the shared assets for every other section. I wanted every
section of the site to be cohesive, but I wanted to maintain a single source of
truth and wanted to avoid code duplication. I wanted it to work without a build
step (e.g. a plain HTML file), which pretty much necessitated HTTP imports and
using Web Components for the HTML assets.

My list of demands was too specific for me to use an existing build pipeline, so
I made my own.

1. **Web Components:** This step handles the header and footer. First, the two
   components are bundled into an actual `.js` file that defines the
   `eth-header>` and `<eth-footer>` tags that can be used in vanilla HTML.
   Second, the components are pre-rendered to HTML using
   [jsdom](https://www.npmjs.com/package/jsdom). The latter is useful for
   providing a fallback for certain sections if the user has JS disabled: the
   framework can fetch the header and footer HTML and embed it directly in the
   page HTML rather than relying on runtime Web Components.
2. **SCSS:** This step transpiles the four SCSS entry points into CSS
   stylesheets.
   1. `ethmarks-props.css` only provides the CSS Custom Properties that contain
      the site design tokens. I didn't use it anywhere, but it would be useful
      for a section that used some of my site's design tokens to define its own
      styles without using the header or footer (e.g. an embedded demo). It
      weighs 2.38kb gzipped.
   2. `ethmarks-wc.css` is a superset of `ethmarks-props.css` that adds the
      header and footer styles. I didn't use it anywhere, but it would be useful
      for a section that defined its own styles but used the header or footer.
      It weighs 4.01kb gzipped.
   3. `ethmarks.css` is a superset of `ethmarks-wc.css` that adds basic text and
      page styles. It's used in the home page. It weighs 4.75kb gzipped.
   4. `ethmarks-rich.css` is a superset of `ethmarks.css` that adds a bunch of
      styles for things like blockquotes, tables, code blocks, and
      [KaTeX](https://katex.org/). It's used in most sections. It weighs 8.85kb
      gzipped.
3. **Scripts:** This step minifies and bundles `.js` scripts. I only ever used
   it once: for `overflow.js`, a script which prevents code blocks and tables
   from overflowing off the page.
4. **Fonts:** This step just copies my 26 self-hosted `.woff2` files to the
   output directory. The main fonts are
   [Fira Code](https://fonts.google.com/specimen/Fira+Code),
   [Kenia](https://fonts.google.com/specimen/Kenia),
   [Nunito](https://fonts.google.com/specimen/Nunito), and
   [Sen](https://fonts.google.com/specimen/Sen), which I sourced from
   [Variable Font Helper](https://variable-font-helper.web.app/), which sourced
   them from [Google Fonts](https://fonts.google.com/). I also added the KaTeX
   fonts, which I sourced from
   [the official KaTeX repo](https://github.com/KaTeX/KaTeX/tree/main/fonts).
5. **Misc:** This step copies a few miscellaneous files like the favicon, and
   also generates the `index.html` which lists all the assets generated by the
   previous steps.
