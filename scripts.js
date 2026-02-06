// ============================================================
// PREMIUM PORTFOLIO - ENHANCED JAVASCRIPT
// ============================================================

const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
const backToTopBtn = document.getElementById("backToTop");
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavbarScroll();
  initSmoothScroll();
  initBackToTop();
  initScrollAnimations();
  initParallax();
  initTypewriter();
  ensureButtonsClickable();
  console.log(
    "%c✨ Premium Portfolio Loaded Successfully",
    "color: #00d4ff; font-size: 16px; font-weight: bold;",
  );
});

// Theme Toggle
let currentTheme = localStorage.getItem("theme") || "dark";

function initTheme() {
  body.setAttribute("data-theme", currentTheme);
  updateThemeIcon();
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
}

function toggleTheme() {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  body.setAttribute("data-theme", currentTheme);
  localStorage.setItem("theme", currentTheme);
  updateThemeIcon();
}

function updateThemeIcon() {
  const moonIcon = themeToggle?.querySelector(".fa-moon");
  const sunIcon = themeToggle?.querySelector(".fa-sun");
  if (moonIcon && sunIcon) {
    if (currentTheme === "dark") {
      moonIcon.style.display = "block";
      sunIcon.style.display = "none";
    } else {
      moonIcon.style.display = "none";
      sunIcon.style.display = "block";
    }
  }
}

// Navbar Scroll
function initNavbarScroll() {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    updateActiveNavLink();
  });
}

function updateActiveNavLink() {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 200;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(`#${current}`)) {
      link.classList.add("active");
    }
  });
}

// Smooth Scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// Scroll Reveal Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation =
          "fadeInUp 0.8s cubic-bezier(0.22, 0.9, 0.2, 1) forwards";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(
      ".about-card, .experience-card, .expertise-card, .project-card, .contact-info, .cta-card, .glass-card",
    )
    .forEach((el) => {
      observer.observe(el);
    });
}

// Parallax Effect
function initParallax() {
  const profileImage = document.querySelector(".profile-image");
  if (!profileImage) return;

  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    profileImage.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
  });
}

// Back to Top
function initBackToTop() {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Copy to Clipboard
function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      showCopyNotification(text);
    })
    .catch((err) => {
      console.error("Failed to copy:", err);
    });
}

function showCopyNotification(text) {
  const existing = document.querySelector(".copy-notification");
  if (existing) existing.remove();

  const notification = document.createElement("div");
  notification.className = "copy-notification";
  notification.innerHTML = `<i class="fas fa-check"></i> Copied: ${text}`;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("hidden");
    setTimeout(() => notification.remove(), 400);
  }, 2500);
}

// Keyboard Shortcuts
document.addEventListener("keydown", (e) => {
  if (e.key === "t" || e.key === "T") {
    toggleTheme();
  }
  if (e.key === "Home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

// Enhanced Light Theme Support
function enhanceLightTheme() {
  if (currentTheme === "light") {
    document
      .querySelectorAll(
        ".about-card, .experience-card, .expertise-card, .project-card, .contact-info, .cta-card",
      )
      .forEach((card) => {
        card.style.backdropFilter = "blur(10px)";
      });
  }
}

// Apply on theme change
const originalToggleTheme = toggleTheme;
window.toggleTheme = function () {
  originalToggleTheme();
  enhanceLightTheme();
};

// Initial call
enhanceLightTheme();

// Ensure all buttons are clickable and functional
function ensureButtonsClickable() {
  // Handle all anchor tags with href
  document.querySelectorAll("a[href]").forEach((link) => {
    link.style.pointerEvents = "auto";
    link.style.cursor = "pointer";

    // mailto and download links work natively
    if (link.href.startsWith("mailto:") || link.hasAttribute("download")) {
      link.addEventListener("click", (e) => {
        // Allow native browser behavior for mailto and download
      });
    }
  });

  // Handle all .btn elements
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.style.pointerEvents = "auto";
    btn.style.cursor = "pointer";
    btn.style.display = "inline-flex";

    // If it's an anchor tag, ensure href works
    if (btn.tagName === "A" && btn.href) {
      btn.addEventListener("click", (e) => {
        if (btn.href.startsWith("mailto:")) {
          // Allow mailto to work natively
          return;
        }
        if (btn.hasAttribute("download")) {
          // Allow download to work natively
          return;
        }
      });
    }
  });
}

// ============================================================
// LOOPING TYPEWRITER FOR HERO SUBTITLE
// ============================================================

const roles = ["Full Stack Developer", "UI/UX Designer"];

function initTypewriter() {
  const el = document.querySelector(".hero-subtitle");
  if (!el) return;

  // Make sure the element cannot be edited or focused
  el.setAttribute("contenteditable", "false");
  el.setAttribute("tabindex", "-1");

  // Create ONE cursor and reuse it
  const cursor = document.createElement("span");
  cursor.className = "typewriter-cursor";
  cursor.textContent = ""; // visual cursor is from CSS background

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const currentRole = roles[roleIndex];
    const text = currentRole.substring(0, charIndex);

    // Replace text and keep the single cursor at the end
    el.textContent = text;
    el.appendChild(cursor);

    if (!isDeleting && charIndex < currentRole.length) {
      charIndex++;
      setTimeout(tick, 90);
    } else if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(tick, 1000);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(tick, 60);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(tick, 200);
    }
  }

  tick();
}
