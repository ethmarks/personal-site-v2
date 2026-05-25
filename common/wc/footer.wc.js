export default class EthmarksFooter extends HTMLElement {
  connectedCallback() {
    // https://lucide.dev/icons/code-xml
    const SOURCE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><title>Source Code</title><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`;

    // https://simpleicons.org/?q=github
    const GITHUB_SVG = `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`;

    // https://simpleicons.org/?q=ycombinator
    const HN_SVG = `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="currentColor" stroke-width="2" d="M.5.5h23v23H.5z"/><path fill="currentColor" d="M6.951 5.896h1.88l2.457 4.875c.354.726.651 1.434.651 1.434s.316-.689.688-1.434l2.457-4.875h1.749l-4.148 7.799v4.972h-1.583v-5.064z"/></svg>`;

    // https://lucide.dev/icons/mail
    const EMAIL_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>`;

    const hydrate = this.hasAttribute("hydrate");
    const source =
      this.getAttribute("source") ||
      "https://github.com/ethmarks/personal-site-v2";

    const existingFooter = this.querySelector(":scope > footer");

    // if there's already a <footer> child, we shouldn't destructively hydrate
    if (existingFooter && !hydrate) {
      const sourceLink = existingFooter.querySelector("#sourcelink");
      if (sourceLink) sourceLink.setAttribute("href", source);
      return;
    }

    this.innerHTML = `
    <footer>
        <span id="source">
            <a href="${source}" id="sourcelink" aria-label="Website source code">${SOURCE_SVG}</a>
        </span>
        <span id="contact">
            <a href="https://github.com/ethmarks" aria-label="GitHub">${GITHUB_SVG}</a>
            <a href="https://news.ycombinator.com/user?id=ethmarks" aria-label="Hacker News">${HN_SVG}</a>
            <a href="mailto:ethmarks.dev@gmail.com" aria-label="Email">${EMAIL_SVG}</a>
        </span>
    </footer>`;
  }
}
