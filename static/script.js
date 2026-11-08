(() => {
  const logo = document.getElementById("folkValleyLogo");
  const releaseDate = document.getElementById("releaseDate");

  if (!logo || !releaseDate) return;

  const quintOut = "cubic-bezier(0.22, 1, 0.36, 1)";

  // Respect the visitor's reduced-motion accessibility setting.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    logo.style.opacity = "1";
    logo.style.transform = "none";
    releaseDate.style.opacity = "1";
    releaseDate.style.transform = "none";
    return;
  }

  // Phase 1: the logo eases into the center over exactly 1 second.
  const logoIntro = logo.animate(
    [
      { opacity: 0, transform: "translateY(22px) scale(0.5)" },
      { opacity: 1, transform: "translateY(0) scale(1)" }
    ],
    {
      duration: 1000,
      easing: quintOut,
      fill: "forwards"
    }
  );

  // Phase 2 begins as soon as the first animation finishes.
  logoIntro.finished.then(() => {
    // The logo rises just a little while the date appears underneath.
    const logoLift = logo.animate(
      [
        { transform: "translateY(0) scale(1)" },
        { transform: "translateY(-18px) scale(1)" }
      ],
      {
        duration: 500,
        easing: quintOut,
        fill: "forwards"
      }
    );

    const dateReveal = releaseDate.animate(
      [
        { opacity: 0, transform: "translateY(10px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      {
        duration: 500,
        easing: quintOut,
        fill: "forwards"
      }
    );

    return Promise.all([logoLift.finished, dateReveal.finished]);
  }).catch(() => {
    // Ignore animation cancellation (for example, if the page is closed).
  });
})();
