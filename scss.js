import * as sass from "sass";
import * as fs from "fs/promises";
import * as path from "path";
import { OUT_DIR, getOutPath } from "./build.js";

export async function processSCSS(inFile) {
  if (!path.extname(inFile)) {
    inFile += ".scss";
  }

  const result = await sass.compileAsync(inFile, {
    style: "compressed",
  });

  await fs.writeFile(getOutPath(inFile).replace(/\.scss$/, ".css"), result.css);
}
