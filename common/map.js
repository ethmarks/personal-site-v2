import * as fs from "fs/promises";
import * as path from "path";
import { BASE_PATH } from "./build.js";

export default async function generateMap(out_dir) {
  const output_file = path.join(out_dir, "index.html");
  const files = await fs.readdir(out_dir);
  const assets = files.filter((file) => file !== "index.html").sort();

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ethmarks/common</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@intergrav/dev.css@4" />
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <h1>ethmarks/common</h1>
  <p>Common web asset library for <a href="https://github.com/ethmarks">ethmarks</a></p>
  <p><strong>Total Assets:</strong> ${assets.length} files</p>
  <ul>
${assets.map((file) => `    <li><a href="/${BASE_PATH}${file}">${file}</a></li>`).join("\n")}
  </ul>
</body>
</html>
`;

  await fs.writeFile(output_file, html, "utf-8");
  console.log(`✔️ Generated index.html with ${assets.length} assets`);
}
