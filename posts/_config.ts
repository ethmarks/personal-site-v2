import lume from "lume/mod.ts";
import markdown from "lume/plugins/markdown.ts";
import inline from "lume/plugins/inline.ts";
import readingInfo from "lume/plugins/reading_info.ts";
import lightningcss from "lume/plugins/lightningcss.ts";
import base_path from "lume/plugins/base_path.ts";
import { imageRule } from "./src/render_image.js";
import { citationPlugin } from "./src/render_citation.js";
import anchorPlugin from "npm:markdown-it-anchor@^9.2.0";
import collapsiblePlugin from "npm:markdown-it-collapsible@^2.0.2";
import katexPlugin from "npm:markdown-it-katex@^2.0.3";

const url = ("https://" + Deno.env.get("VERCEL_URL")) || "http://localhost";
const basePath = Deno.env.get("BASE_PATH") || ""; // "/posts"

const site = lume({
  dest: "./dist" + basePath,
  location: new URL(url + basePath + "/"),
});

site.ignore("README.md");

site.add("media");
site.add("assets/post-index.css");
site.add("assets/post-single.css");

// Strip 'content/' from output URLs
site.preprocess([".md", ".vto"], (pages) => {
  for (const page of pages) {
    if (page.data.url?.startsWith("/content/")) {
      page.data.url = page.data.url.replace("/content/", "/");
    }
  }
});

/** Convert a Date or string to a Temporal.PlainDate */
function toPlainDate(value: Date | string): Temporal.PlainDate {
  if (value instanceof Date) {
    return Temporal.PlainDate.from(value.toISOString().split("T")[0]);
  }
  return Temporal.PlainDate.from(value.toString());
}
site.filter("toPlainDate", toPlainDate);

site.use(markdown({
  options: {
    "typographer": true,
  },
  rules: {
    image: imageRule,
  },
  plugins: [citationPlugin, anchorPlugin, collapsiblePlugin, katexPlugin],
}));
site.use(readingInfo({
  wordsPerMinute: 200,
}));
site.use(lightningcss());
site.use(base_path());
site.use(inline());

export default site;
