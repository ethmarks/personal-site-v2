const assetsURL: string = "https://site-ethmarks.vercel.app/common";

const [headerHTML, footerHTML]: string[] = await Promise.all([
  fetch(`${assetsURL}/header-posts.wc.html`).then((r) => r.text()),
  fetch(`${assetsURL}/footer.wc.html`).then((r) => r.text()),
]);

export const remote: { header: string; footer: string } = {
  header: headerHTML,
  footer: footerHTML,
};

export const canonUrl: string = "https://site-ethmarks.vercel.app/posts";
export const title: string = "Posts";
export const desc: string = "Ethan Marks' posts";
export const img: string = "/media/ethmarks_posts.webp";
