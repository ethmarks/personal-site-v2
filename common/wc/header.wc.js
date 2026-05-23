export default class EthmarksHeader extends HTMLElement {
  connectedCallback() {
    const hydrate = this.hasAttribute("hydrate");
    const activeLink = this.getAttribute("active");

    const today = new Date();
    const isBirthday = today.getMonth() === 8 && today.getDate() === 13; // September 13
    const bDayClass = isBirthday ? "birthday-mode" : "";

    const existingHeader = this.querySelector(":scope > header");

    // if there's already a <header> child, we shouldn't destructively hydrate
    if (existingHeader && !hydrate) {
      if (bDayClass) {
        existingHeader.classList.add(bDayClass);
      }
      return;
    }

    const navItems = [
      { name: "Home", href: "https://site-ethmarks.vercel.app/" },
      { name: "About", href: "https://site-ethmarks.vercel.app/about" },
      { name: "Posts", href: "https://site-ethmarks.vercel.app/posts" },
      { name: "Blips", href: "https://site-ethmarks.vercel.app/blips" },
      { name: "Ink", href: "https://site-ethmarks.vercel.app/ink" },
      { name: "Projects", href: "https://site-ethmarks.vercel.app/projects/" },
    ];

    this.innerHTML = `
      <header class="${bDayClass}">
          <a href="${navItems[0].href}" id="title" tabindex="0" aria-label="Home">Ethan Marks</a>
          <nav>
              ${navItems
                .map((item) => {
                  const isActive =
                    activeLink &&
                    activeLink.toLowerCase() === item.name.toLowerCase();
                  const activeClass = isActive ? "active" : "";
                  return `<a id="nav-${item.name.toLowerCase()}" class="staggered ${activeClass}" href="${item.href}">${item.name}</a>`;
                })
                .join("")}
          </nav>
      </header>`;
  }
}
