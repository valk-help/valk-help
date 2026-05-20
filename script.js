(function () {
  const page = document.body.dataset.page;
  document.querySelectorAll("[data-page-link]").forEach((link) => {
    if (link.dataset.pageLink === page) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wrap = document.getElementById("snow-canvas-wrap");

  if (!reducedMotion && wrap) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const flakes = [];
    const snowCount = 150;
    let width = 0;
    let height = 0;
    let dpi = window.devicePixelRatio || 1;
    let last = performance.now();

    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    wrap.appendChild(canvas);

    function resize() {
      dpi = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpi);
      canvas.height = Math.floor(height * dpi);
      ctx.setTransform(dpi, 0, 0, dpi, 0, 0);
    }

    function resetFlake(flake, startAbove) {
      flake.x = Math.random() * width;
      flake.y = startAbove ? Math.random() * -height : Math.random() * height;
      flake.radius = 0.8 + Math.random() * 3.4;
      flake.speed = 0.35 + Math.random() * 1.25;
      flake.angle = Math.random() * Math.PI * 2;
      flake.opacity = 0.18 + Math.random() * 0.72;
      flake.wind = 0.04 + Math.random() * 0.18;
    }

    function seedSnow() {
      flakes.length = 0;
      for (let i = 0; i < snowCount; i += 1) {
        const flake = {};
        resetFlake(flake, false);
        flakes.push(flake);
      }
    }

    function draw(now) {
      const delta = Math.min(1.6, (now - last) / 16.66);
      last = now;
      ctx.clearRect(0, 0, width, height);

      flakes.forEach((flake) => {
        flake.y += (flake.speed + Math.sin(flake.angle) * 0.22) * delta;
        flake.x += flake.wind + Math.cos(flake.angle) * 0.2;
        flake.angle += 0.01;

        if (flake.y > height + 24 || flake.x > width + 60) {
          resetFlake(flake, true);
          flake.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${flake.opacity})`;
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    window.addEventListener("resize", () => {
      resize();
      seedSnow();
    }, { passive: true });

    resize();
    seedSnow();
    requestAnimationFrame(draw);
  }

  if (!reducedMotion) {
    const box = document.querySelector(".guide-box");
    if (box && window.matchMedia("(pointer: fine)").matches) {
      box.addEventListener("pointermove", (event) => {
        const rect = box.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        box.style.transform = `perspective(1200px) rotateX(${y * -2.5}deg) rotateY(${x * 2.5}deg)`;
      });

      box.addEventListener("pointerleave", () => {
        box.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
      });
    }
  }
})();
