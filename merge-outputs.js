import fs from "fs-extra";

async function bundle() {
  await fs.ensureDir("./dist");

  await fs.copy("./site/dist", "./dist");

  ["about", "posts", "ink", "common"].forEach(async (section) => {
    await fs.copy(`./${section}/dist`, `./dist/${section}`);
  });

  await fs.copy(`./projects/.output/public`, `./dist/projects`, {
    dereference: true,
  });

  await fs.copy("./404/dist/index.html", "./dist/404.html");
}

bundle();
