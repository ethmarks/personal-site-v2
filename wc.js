import bundle from "./rollup.js";

export default async function processWC(inFile) {
  await bundle({ inFile: inFile, format: "iife" });
}
