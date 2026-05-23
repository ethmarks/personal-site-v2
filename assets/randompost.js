/**
 * A function to find all post links on the page and set the 'href'
 * of our "random post" link.
 */
function setRandomPostLink() {
  const randomPostLink = document.getElementById("random-post-btn");

  const postLinks = document.querySelectorAll("a.post-link[href]");

  if (!randomPostLink || !postLinks.length) {
    if (randomPostLink) {
      randomPostLink.style.display = "none";
    }
    return;
  }

  const randomPost = postLinks[Math.floor(Math.random() * postLinks.length)];

  randomPostLink.href = randomPost.getAttribute("href");
}
document.addEventListener("DOMContentLoaded", setRandomPostLink);
this.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    setRandomPostLink();
  }
});
