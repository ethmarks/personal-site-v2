document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas to full window size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Variables for the grid
  const ringSpacing = 30; // Distance between rings
  const dotSpacingFactor = 30; // Factor to determine dots per ring
  const baseRadius = 1.5;
  const maxRadius = 5;
  const bandHeight = 80; // Height of the horizontal band effect
  const dots = [];

  // Center of rotation
  let centerX = canvas.width / 2;
  let centerY = canvas.height / 2;

  // Rotation variables
  let angle = 0;
  const rotationSpeed = 0.0005; // Speed of rotation

  let mouseX = 0;
  let mouseY = 0;

  // Determine if the device is likely mobile (no fine pointer)
  const isMobile = window.matchMedia("(pointer: coarse)").matches;

  // Track mouse/touch position
  document.addEventListener("mousemove", function (e) {
    if (!isMobile) {
      // Only track mouse on non-mobile
      mouseX = e.clientX;
      mouseY = e.clientY;
    }
  });

  document.addEventListener("touchmove", function (e) {
    if (isMobile && e.touches.length > 0) {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
    }
  });

  // Create concentric ring dot pattern
  function createConcentricRings() {
    // Calculate max radius needed to cover the screen
    const maxDimension = Math.max(canvas.width, canvas.height);
    const maxRadius = (maxDimension * Math.sqrt(2)) / 2; // Half the diagonal

    // Start with a single dot at the center
    dots.push({
      origX: 0,
      origY: 0,
      x: centerX,
      y: centerY,
      radius: baseRadius,
    });

    // Create concentric rings
    for (let r = ringSpacing; r <= maxRadius; r += ringSpacing) {
      // Calculate number of dots for this ring based on circumference
      const circumference = 2 * Math.PI * r;
      const dotsInRing = Math.floor(circumference / dotSpacingFactor);

      // Place dots evenly around the ring
      for (let i = 0; i < dotsInRing; i++) {
        const angle = (i / dotsInRing) * 2 * Math.PI;
        const x = r * Math.cos(angle);
        const y = r * Math.sin(angle);

        dots.push({
          origX: x, // Store position relative to center
          origY: y,
          x: x + centerX,
          y: y + centerY,
          radius: baseRadius,
        });
      }
    }
  }

  // Update the dots based on rotation and mouse/touch position
  function updateDots() {
    // Update rotation angle
    angle += rotationSpeed;

    dots.forEach((dot) => {
      // Rotate the dot around the center
      const rotatedX =
        Math.cos(angle) * dot.origX - Math.sin(angle) * dot.origY;
      const rotatedY =
        Math.sin(angle) * dot.origX + Math.cos(angle) * dot.origY;

      // Update position with rotation
      dot.x = rotatedX + centerX;
      dot.y = rotatedY + centerY;

      // Apply horizontal band effect only on desktop (non-mobile)
      if (!isMobile) {
        const dy = Math.abs(mouseY - dot.y);
        if (dy < bandHeight) {
          const scale = 1 - dy / bandHeight;
          dot.radius = baseRadius + (maxRadius - baseRadius) * scale;
        } else {
          dot.radius = baseRadius;
        }
      } else {
        dot.radius = baseRadius; // No band effect on mobile
      }
    });
  }

  // Draw the dots
  function drawDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dots.forEach((dot) => {
      // Only draw dots that are within the canvas view (with a small margin)
      if (
        dot.x >= -10 &&
        dot.x <= canvas.width + 10 &&
        dot.y >= -10 &&
        dot.y <= canvas.height + 10
      ) {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.fill();
      }
    });
  }

  // Animation loop
  function animate() {
    updateDots();
    drawDots();
    requestAnimationFrame(animate);
  }

  // Handle window resize
  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
    dots.length = 0;
    createConcentricRings();
  });

  // Initialize
  createConcentricRings();
  animate();
});
