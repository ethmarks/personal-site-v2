import { JSDOM } from "jsdom";
import * as fs from "fs/promises";
import { getOutPath } from "./build.js";

// Create a minimal DOM environment
const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
global.window = dom.window;
global.document = dom.window.document;
global.HTMLElement = dom.window.HTMLElement;
global.customElements = dom.window.customElements;
global.window.visualViewport = dom.window.visualViewport;
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

export default async function processStaticWC(
  inFile,
  attributes = {},
  outFile,
) {
  // Dynamically import the component after DOM is set up
  const componentModule = await import(`./${inFile}`);
  const componentClass = componentModule.default;

  const tagName = `wc-${inFile.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`;

  // Only register if not already registered
  if (!customElements.get(tagName)) {
    customElements.define(tagName, componentClass);
  }

  const container = document.createElement("div");
  const element = document.createElement(tagName);

  // Set attributes
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }

  container.appendChild(element);
  document.body.appendChild(container);
  const html = element.innerHTML;
  document.body.removeChild(container);

  if (!html) {
    throw new Error(`encountered error while processing ${inFile}!`);
  }

  const fileName = outFile || getOutPath(inFile).replace(/\.js$/, ".html");
  await fs.writeFile(fileName, html, "utf-8");
}
