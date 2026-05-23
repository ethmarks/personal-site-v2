export default defineNuxtPlugin((nuxtApp) => {
  let isViewTransitioning = false;

  const removeAnimationClass = () => {
    document.documentElement.classList.remove("no-view-transition");
  };

  const addAnimationClass = () => {
    removeAnimationClass();

    // If no view transition is happening, add the class
    if (!isViewTransitioning) {
      // Small delay to ensure the check happens after transition setup
      setTimeout(() => {
        if (!isViewTransitioning) {
          document.documentElement.classList.add("no-view-transition");
        }
      }, 10);
    }
  };

  // Track view transition state
  if (document.startViewTransition) {
    const originalStartViewTransition = document.startViewTransition;
    document.startViewTransition = function (callback) {
      isViewTransitioning = true;
      const transition = originalStartViewTransition.call(this, callback);

      transition.finished.finally(() => {
        isViewTransitioning = false;
      });

      return transition;
    };
  }

  // Run on initial load
  addAnimationClass();

  // Remove class the moment navigation starts
  nuxtApp.hook("page:start", () => {
    removeAnimationClass();
  });

  // Run on every page navigation finish
  nuxtApp.hook("page:finish", () => {
    addAnimationClass();
  });
});
