document.addEventListener("DOMContentLoaded", () => {

  /* ---------------- LOGO ---------------- */
  const logo = document.querySelector(".text-logo");
  const front = document.querySelector(".logo-front");

  if (logo && front) {
    logo.addEventListener("click", () => {
      front.style.color = "white";
      front.style.background = "none";

      setTimeout(() => {
        window.location.href = "index.html";
      }, 150);
    });
  }

  /* ---------------- NAVBAR ---------------- */
  const links = document.querySelectorAll(".navbar-nav .nav-link");

  links.forEach(link => {
    link.addEventListener("click", () => {
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

/* ---------------- THESES NAV ---------------- */

const previews = document.querySelectorAll(".theses-preview");
const nav = document.querySelector(".theses-nav");

const iconMap = {
  ummeIcon: "ummePreviewContainer",
  sashaIcon: "sashaPreviewContainer",
  danielaIcon: "danielaPreviewContainer",
  jackyIcon: "jackyPreviewContainer",
  saribIcon: "saribPreviewContainer"
};

let currentActive = null;

/* ---------------- CLICK TO SCROLL ---------------- */
Object.keys(iconMap).forEach(iconId => {
  const icon = document.getElementById(iconId);
  const target = document.querySelector("." + iconMap[iconId]);

  if (icon && target) {
    icon.addEventListener("click", () => {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
});

/* ---------------- ALIGN NAV ---------------- */
function alignNav(forceFirst = false) {
  let closest = null;

  if (forceFirst && previews.length > 0) {
    closest = previews[0];
  } else {
    let closestDistance = Infinity;

    previews.forEach(preview => {
      const rect = preview.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const distance = Math.abs(center - window.innerHeight / 2);

      if (distance < closestDistance) {
        closestDistance = distance;
        closest = preview;
      }
    });
  }

  if (!closest || !nav) return;

  const rect = closest.getBoundingClientRect();
  const newTop = rect.top + rect.height / 2;

  /* ---------------- FADE ANIMATION ON SWITCH ---------------- */
  if (closest !== currentActive) {
    nav.classList.remove("fade-in");
    nav.classList.add("fade-out");

    setTimeout(() => {
      nav.style.top = newTop + "px"; // center to preview

      nav.classList.remove("fade-out");
      nav.classList.add("fade-in");

      setTimeout(() => {
        nav.classList.remove("fade-in");
      }, 250);

      currentActive = closest;
    }, 150);
  } else {
    // if same preview, just follow vertically
    nav.style.top = newTop + "px";
  }

  /* ---------------- SET ACTIVE ICON ---------------- */
  Object.keys(iconMap).forEach(id => {
    document.getElementById(id)?.classList.remove("active");
  });

  const activeIcon = Object.keys(iconMap).find(
    key => closest.classList.contains(iconMap[key])
  );

  if (activeIcon) {
    document.getElementById(activeIcon).classList.add("active");
  }
}

/* ---------------- SCROLL SYNC ---------------- */
window.addEventListener("scroll", () => alignNav(false));

/* ---------------- SNAP TO CLOSEST ON LOAD ---------------- */
window.addEventListener("load", () => {
  // small timeout to ensure DOM and layout are ready
  setTimeout(() => alignNav(false), 50);
});

/* ---------------- theses glass effect ---------------- */
document.querySelectorAll(".theses-container").forEach(glass => {
    glass.addEventListener("mousemove", e => {
      const rect = glass.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      glass.style.setProperty("--x", x + "%");
      glass.style.setProperty("--y", y + "%");
    });
    glass.addEventListener("mouseleave", () => {
      glass.style.setProperty("--x", "50%");
      glass.style.setProperty("--y", "50%");
    });
  });

  /* ---------------- BACK TO TOP ---------------- */
  const backToTop = document.getElementById("backToTop");
  backToTop.addEventListener("mouseenter", () => {
    backToTop.classList.remove("clicked");
  });

  backToTop.addEventListener("click", () => {
    backToTop.classList.add("clicked");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  window.addEventListener("scroll", () => {
    backToTop.style.opacity = window.scrollY < 200 ? "0" : "";
    backToTop.style.pointerEvents = window.scrollY < 200 ? "none" : "auto";
  });


});
