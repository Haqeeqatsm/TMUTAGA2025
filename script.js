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
  const navbar = document.querySelector('.navbar');
  const textLogo = document.getElementById('logo');
  const links = document.querySelectorAll(".navbar-nav .nav-link");

  // Active link functionality
  links.forEach(link => {
    link.addEventListener("click", () => {
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  window.addEventListener('scroll', () => {
    const logoBottom = textLogo.offsetTop + textLogo.offsetHeight;
    const scrollPosition = window.pageYOffset;

    if (scrollPosition > logoBottom) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
  });

  const logoLink = document.getElementById('logo-link');
  logoLink.addEventListener('click', () => {
    logoLink.querySelector('img').style.filter = 'none';
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

// Only run theses nav code if elements exist
if (nav && previews.length > 0) {

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

    currentActive = closest;

    /* ---------------- FADE IN/OUT BASED ON SCROLL POSITION ---------------- */
    // Fade out only at top of page (scrollY near 0)
    // Fade in when user scrolls down past a threshold
    if (window.scrollY < 100) {
      nav.classList.add("theses-fade-out");
      nav.classList.remove("theses-fade-in");
    } else {
      nav.classList.add("theses-fade-in");
      nav.classList.remove("theses-fade-out");
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
  
  // Initial call to set correct state
  alignNav(false);
}

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

/* ---------------- donor cards glass effect ---------------- */
document.querySelectorAll(".donor-card-glass").forEach(glass => {
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
  
  if (backToTop) {
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
  }

  /* ---------------- TIMELINE ROTATION ---------------- */
  const cards = document.querySelector('.cards');
  const radioButtons = document.querySelectorAll('input[type="radio"][name="gallery-item"]');
  const totalItems = radioButtons.length;
  const anglePerItem = 360 / totalItems;
  let currentIndex = Array.from(radioButtons).findIndex(r => r.checked);
  let currentRotation = -currentIndex * anglePerItem;
  let isKeyboardControl = false; // Prevent double rotation
  
  // Smooth rotation
  if (cards) {
    cards.style.transition = 'transform 0.5s ease';
    cards.style.transform = `rotate(${currentRotation}deg)`;
  }
  
  // Rotate to a target index in a specific direction
  function rotateToIndex(targetIndex, direction = 'auto') {
      if (targetIndex === currentIndex) return;
      
      let stepsForward = (targetIndex - currentIndex + totalItems) % totalItems;
      let stepsBackward = (currentIndex - targetIndex + totalItems) % totalItems;
      let rotationSteps;
      
      // Determine rotation direction
      if (direction === 'forward') {
          rotationSteps = stepsForward;
      } else if (direction === 'backward') {
          rotationSteps = -stepsBackward;
      } else { // auto = pick shortest
          rotationSteps = stepsForward <= stepsBackward ? stepsForward : -stepsBackward;
      }
      
      currentRotation -= rotationSteps * anglePerItem;
      if (cards) {
        cards.style.transform = `rotate(${currentRotation}deg)`;
      }
      currentIndex = targetIndex;
  }
  
  // Radio button clicks (auto picks shortest path)
  radioButtons.forEach((radio, index) => {
      radio.addEventListener('change', function () {
          if (this.checked && !isKeyboardControl) {
              rotateToIndex(index, 'auto');
          }
          isKeyboardControl = false; // Reset flag after handling
      });
  });
  
  // Arrow keys
  document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
          isKeyboardControl = true;
          let nextIndex = (currentIndex + 1) % totalItems;
          radioButtons[nextIndex].checked = true;
          rotateToIndex(nextIndex, 'forward');
      } else if (e.key === 'ArrowLeft') {
          isKeyboardControl = true;
          let prevIndex = (currentIndex - 1 + totalItems) % totalItems;
          radioButtons[prevIndex].checked = true;
          rotateToIndex(prevIndex, 'backward');
      }
  });

  // FADE IN ON SCROLL ANIMATIONS
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible'); // fade in
        } else {
          entry.target.classList.remove('visible'); // fade out when leaves viewport
        }
      });
    },
    { 
      threshold: 0.2, // trigger when 10% of element is visible
      rootMargin: '50px' // trigger 50px before element enters viewport
    }
  );

  // Observe all fade-in elements and check if already visible
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
    
    // Immediately check if element is already in viewport on page load
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const isInViewport = rect.top < windowHeight && rect.bottom > 0;
    
    if (isInViewport) {
      // Add visible class immediately for elements in viewport on load
      el.classList.add('visible');
    }
  });

  // THESES AUDIO LOGIC
  const audio = document.getElementById("globalAudio");
  let activeButton = null;
  let progressTimeout = null;
  
  document.querySelectorAll(".theses-button").forEach(button => {
    const playIcon = button.querySelector(".play-icon");
    const progress = button.querySelector("input[type='range']"); 
    const currentTimeEl = button.querySelector(".current");
    const durationEl = button.querySelector(".duration");
    const src = button.dataset.audio;
  
    // 🔥 PLAY / PAUSE ONLY WHEN ICON IS CLICKED
    playIcon.addEventListener("click", (e) => {
      e.stopPropagation();
    
      if (activeButton === button) {
        if (audio.paused) {
          audio.play();
          playIcon.src = "media/pause-button.svg";
          playIcon.classList.add("paused");
          
          // Show progress bar again when resuming
          button.classList.add("active");
          
          // Clear timeout when resuming
          if (progressTimeout) {
            clearTimeout(progressTimeout);
            progressTimeout = null;
          }
        } else {
          audio.pause();
          playIcon.src = "media/play-button.svg";
          playIcon.classList.remove("paused");
          
          // Start 5 second timeout to hide progress bar
          progressTimeout = setTimeout(() => {
            button.classList.remove("active");
          }, 3000);
        }
        return;
      }
    
      // Stop previous
      if (activeButton) {
        activeButton.classList.remove("active");
        const prevIcon = activeButton.querySelector(".play-icon");
        prevIcon.src = "media/play-button.svg";
        prevIcon.classList.remove("paused");
        
        // Clear any existing timeout
        if (progressTimeout) {
          clearTimeout(progressTimeout);
          progressTimeout = null;
        }
      }
    
      // Activate new
      activeButton = button;
      button.classList.add("active");
      playIcon.src = "media/pause-button.svg";
      playIcon.classList.add("paused");
    
      audio.src = src;
      audio.currentTime = 0;
      audio.play();
    });
  
    // Progress update
    audio.addEventListener("timeupdate", () => {
      if (activeButton !== button) return;
    
      progress.max = audio.duration || 0;
      progress.value = audio.currentTime || 0;
    
      currentTimeEl.textContent = formatTime(audio.currentTime);
      durationEl.textContent = formatTime(audio.duration);
    });
  
    // Scrub without triggering play
    progress.addEventListener("input", (e) => {
      e.stopPropagation();
      audio.currentTime = progress.value;
    });
  });
  
  // Reset on end
  audio.addEventListener("ended", () => {
    if (!activeButton) return;
    activeButton.classList.remove("active");
    const endedIcon = activeButton.querySelector(".play-icon");
    endedIcon.src = "media/play-button.svg";
    endedIcon.classList.remove("paused");
    activeButton = null;
    
    // Clear timeout
    if (progressTimeout) {
      clearTimeout(progressTimeout);
      progressTimeout = null;
    }
  });
  
  function formatTime(seconds) {
    if (!seconds) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

});