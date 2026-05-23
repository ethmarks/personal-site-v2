function updateOverflowClasses() {
  const body = document.body;
  const bodyHeight = Math.max(
    document.documentElement.scrollHeight,
    body.scrollHeight,
  );
  if (!bodyHeight) return; // skip checking pre and table because if bodyHeight is 0, they couldn't exist
  const windowHeight = window.innerHeight;
  body.classList.toggle("height-overflow", bodyHeight > windowHeight);

  document.querySelectorAll("pre, table").forEach(function (el) {
    const elementWidth = el.scrollWidth;
    const parent = el.parentElement;
    const parentWidth = parent ? parent.clientWidth : window.innerWidth;
    if (elementWidth === 0) return;
    el.classList.toggle("width-overflow", elementWidth > parentWidth);
    el.classList.toggle("no-width-overflow", elementWidth < parentWidth);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", updateOverflowClasses);
} else {
  updateOverflowClasses();
}

let timeoutId;
function debouncedUpdate() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(updateOverflowClasses, 50);
}

window.addEventListener("resize", debouncedUpdate);
window.addEventListener("popstate", debouncedUpdate);
window.addEventListener("recalcOverflow", debouncedUpdate);

const observer = new MutationObserver((mutations) => {
  const hasRelevantChange = mutations.some((m) =>
    [...m.addedNodes, ...m.removedNodes].some(
      (node) =>
        node.nodeType === 1 &&
        (node.matches?.("pre, table") || node.querySelector?.("pre, table")),
    ),
  );
  if (hasRelevantChange) {
    debouncedUpdate();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
