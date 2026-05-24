import fs from "fs-extra";

async function bundle() {
  await fs.ensureDir("./dist");

  await fs.copy("./site/dist", "./dist");

  ["about", "posts", "projects", "ink"].forEach(async (section) => {
    await fs.copy(`./${section}/dist`, `./dist/${section}`);
  });

  await fs.copy("./404/dist/index.html", "./dist/404.html");
}

bundle();
