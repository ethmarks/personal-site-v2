import * as fs from "fs/promises";
import { existsSync, statSync } from "fs";
import * as path from "path";

export const BASE_PATH = "common/";
export const OUT_DIR = "dist/";

fs.rm(OUT_DIR, { recursive: true, force: true });
fs.mkdir(OUT_DIR, { recursive: true });

export function getOutPath(inFile) {
  const pathParts = inFile.split(path.sep);
  pathParts[0] = OUT_DIR;
  return pathParts.join(path.sep);
}

async function copyOut(inFile) {
  await fs.copyFile(inFile, getOutPath(inFile));
}

// ============================================================================
// Web Components
// ============================================================================
//
// This section bundles to .wc.js and renders to .wc.html

import processWC from "./wc.js";
import processStaticWC from "./wc-fallback.js";

await processWC("wc/ethmarks.wc.js");

await processStaticWC("wc/header.wc.js");
await processStaticWC(
  "wc/header.wc.js",
  { active: "home" },
  `${OUT_DIR}header-home.wc.html`,
);
await processStaticWC(
  "wc/header.wc.js",
  { active: "about" },
  `${OUT_DIR}header-about.wc.html`,
);
await processStaticWC(
  "wc/header.wc.js",
  { active: "blips" },
  `${OUT_DIR}header-blips.wc.html`,
);
await processStaticWC(
  "wc/header.wc.js",
  { active: "posts" },
  `${OUT_DIR}header-posts.wc.html`,
);
await processStaticWC(
  "wc/header.wc.js",
  { active: "projects" },
  `${OUT_DIR}header-projects.wc.html`,
);

await processStaticWC("wc/footer.wc.js");

// ============================================================================
// SCSS
// ============================================================================
//
// This section processes SCSS source into CSS stylesheets

import { processSCSS } from "./scss.js";

await processSCSS("scss/ethmarks");
await processSCSS("scss/ethmarks-props");
await processSCSS("scss/ethmarks-wc");
await processSCSS("scss/ethmarks-rich");

// ============================================================================
// Scripts
// ============================================================================
//
// This section bundles .js scripts

import processScript from "./script.js";

await processScript("scripts/overflow.js");

// ============================================================================
// Fonts
// ============================================================================
//
// This section copies WOFF2 files into the output

await copyOut("fonts/Fira_Code.woff2");
await copyOut("fonts/Kenia.woff2");
await copyOut("fonts/Nunito-cyrillic.woff2");
await copyOut("fonts/Nunito-cyrillic-italic.woff2");
await copyOut("fonts/Nunito-latin.woff2");
await copyOut("fonts/Nunito-latin-ext.woff2");
await copyOut("fonts/Nunito-latin-ext-italic.woff2");
await copyOut("fonts/Nunito-latin-italic.woff2");
await copyOut("fonts/Sen-latin.woff2");
await copyOut("fonts/Sen-latin-ext.woff2");

await copyOut("fonts/KaTeX_AMS-Regular.woff2");
await copyOut("fonts/KaTeX_Caligraphic-Bold.woff2");
await copyOut("fonts/KaTeX_Caligraphic-Regular.woff2");
await copyOut("fonts/KaTeX_Fraktur-Bold.woff2");
await copyOut("fonts/KaTeX_Fraktur-Regular.woff2");
await copyOut("fonts/KaTeX_Main-Bold.woff2");
await copyOut("fonts/KaTeX_Main-Italic.woff2");
await copyOut("fonts/KaTeX_Main-Regular.woff2");
await copyOut("fonts/KaTeX_Math-Italic.woff2");
await copyOut("fonts/KaTeX_SansSerif-Regular.woff2");
await copyOut("fonts/KaTeX_Script-Regular.woff2");
await copyOut("fonts/KaTeX_Size1-Regular.woff2");
await copyOut("fonts/KaTeX_Size2-Regular.woff2");
await copyOut("fonts/KaTeX_Size3-Regular.woff2");
await copyOut("fonts/KaTeX_Size4-Regular.woff2");
await copyOut("fonts/KaTeX_Typewriter-Regular.woff2");

// this is HTML snippet preloads fonts to reduce page load times
await copyOut("fonts/fonts.html");

// ============================================================================
// Misc
// ============================================================================
//
// This section handles one-off miscellaneous assets

await copyOut("misc/ethmarks.ico");
await copyOut("misc/test.html");

await copyOut("internal/favicon.ico");

import generateMap from "./map.js";
await generateMap(OUT_DIR);

// ============================================================================
// Hardpoint Verification
// ============================================================================
//
// This section verifies that all Hardpoint assets are present in the final
// output, and fails if any are not present

import assert from "assert";

function hardpoint(inFile) {
  const file = path.join(OUT_DIR, inFile);
  assert(
    existsSync(file),
    `❌ Hardpoint asset "${inFile}" not present in output`,
  );
  assert(statSync(file).size > 0, `❌ Hardpoint asset "${inFile}" is empty`);
  console.log(`✔️ Hardpoint asset "${inFile}" passes verification`);
}

hardpoint("ethmarks.wc.js");
hardpoint("header.wc.html");
hardpoint("footer.wc.html");

hardpoint("ethmarks.css");
hardpoint("ethmarks-props.css");
hardpoint("ethmarks-wc.css");
hardpoint("ethmarks-rich.css");

hardpoint("overflow.js");

hardpoint("Fira_Code.woff2");
hardpoint("Kenia.woff2");
hardpoint("Nunito-cyrillic.woff2");
hardpoint("Nunito-cyrillic-italic.woff2");
hardpoint("Nunito-latin.woff2");
hardpoint("Nunito-latin-ext.woff2");
hardpoint("Nunito-latin-ext-italic.woff2");
hardpoint("Nunito-latin-italic.woff2");
hardpoint("Sen-latin.woff2");
hardpoint("Sen-latin-ext.woff2");
hardpoint("fonts.html");

hardpoint("KaTeX_AMS-Regular.woff2");
hardpoint("KaTeX_Caligraphic-Bold.woff2");
hardpoint("KaTeX_Caligraphic-Regular.woff2");
hardpoint("KaTeX_Fraktur-Bold.woff2");
hardpoint("KaTeX_Fraktur-Regular.woff2");
hardpoint("KaTeX_Main-Bold.woff2");
hardpoint("KaTeX_Main-Italic.woff2");
hardpoint("KaTeX_Main-Regular.woff2");
hardpoint("KaTeX_Math-Italic.woff2");
hardpoint("KaTeX_SansSerif-Regular.woff2");
hardpoint("KaTeX_Script-Regular.woff2");
hardpoint("KaTeX_Size1-Regular.woff2");
hardpoint("KaTeX_Size2-Regular.woff2");
hardpoint("KaTeX_Size3-Regular.woff2");
hardpoint("KaTeX_Size4-Regular.woff2");
hardpoint("KaTeX_Typewriter-Regular.woff2");

hardpoint("ethmarks.ico");

console.log(`✅ All Hardpoint assets verified`);
