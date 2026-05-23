import bundle from "./rollup.js";

export default async function processScript(inFile) {
  await bundle({ inFile: inFile, format: "iife" });
}
