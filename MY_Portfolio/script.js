/* ================================================
   PRELOADER
   ================================================ */
(() => {
  const preloader = document.getElementById("preloader");
  const preloaderText = document.getElementById("preloader-text");
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 10;
    if (progress > 100) progress = 100;
    preloaderText.textContent = Math.floor(progress) + "%";
    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => preloader.classList.add("hidden"), 400);
    }
  }, 80);
})();

/* ================================================
   CUSTOM CURSOR
   ================================================ */
const cursor = document.getElementById("cursor");
const follower = document.getElementById("cursor-follower");
let mouseX = 0,
  mouseY = 0;
let followerX = 0,
  followerY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX - 4 + "px";
  cursor.style.top = mouseY - 4 + "px";
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX - 20 + "px";
  follower.style.top = followerY - 20 + "px";
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor hover effects
const hoverElements = document.querySelectorAll(
  "a, button, .magnetic-btn, .project-card, .skill-card",
);
hoverElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("active");
    follower.classList.add("active");
  });
  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("active");
    follower.classList.remove("active");
  });
});

/* ================================================
   MAGNETIC BUTTONS
   ================================================ */
document.querySelectorAll(".magnetic-btn").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0, 0)";
  });
});

/* ================================================
   NAVBAR
   ================================================ */
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
  document.body.style.overflow = mobileMenu.classList.contains("active")
    ? "hidden"
    : "";
});

document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "";
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY + 200;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

/* ================================================
   THEME TOGGLE
   ================================================ */
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme") || "dark";
if (savedTheme === "light")
  document.documentElement.setAttribute("data-theme", "light");

themeToggle.addEventListener("click", () => {
  const isLight =
    document.documentElement.getAttribute("data-theme") === "light";
  document.documentElement.setAttribute(
    "data-theme",
    isLight ? "dark" : "light",
  );
  localStorage.setItem("theme", isLight ? "dark" : "light");
});

/* ================================================
   TYPING EFFECT
   ================================================ */
const roles = ["Full Stack Developer", "Problem Solver"];
const roleText = document.getElementById("roleText");
let roleIndex = 0,
  charIndex = 0,
  isDeleting = false;

function typeRole() {
  const current = roles[roleIndex];
  if (isDeleting) {
    roleText.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 500);
      return;
    }
  } else {
    roleText.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(typeRole, 2000);
      return;
    }
  }
  setTimeout(typeRole, isDeleting ? 40 : 80);
}
typeRole();

/* ================================================
   PARTICLE CANVAS
   ================================================ */
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
let particles = [];
let canvasW, canvasH;

function resizeCanvas() {
  canvasW = canvas.width = window.innerWidth;
  canvasH = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvasW;
    this.y = Math.random() * canvasH;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvasW) this.speedX *= -1;
    if (this.y < 0 || this.y > canvasH) this.speedY *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(108, 92, 231, ${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a + 1; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(108, 92, 231, ${0.08 * (1 - dist / 150)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvasW, canvasH);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  connectParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ================================================
   SCROLL REVEAL ANIMATIONS
   ================================================ */
const revealElements = document.querySelectorAll(
  ".reveal-up, .reveal-left, .reveal-right",
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
);

revealElements.forEach((el) => revealObserver.observe(el));

/* ================================================
   COUNTER ANIMATION
   ================================================ */
const statNumbers = document.querySelectorAll(".stat-number");

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = +entry.target.dataset.target;
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            entry.target.textContent = target;
            clearInterval(timer);
          } else {
            entry.target.textContent = Math.floor(current);
          }
        }, 30);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

statNumbers.forEach((num) => counterObserver.observe(num));

/* ================================================
   SKILL PROGRESS BARS
   ================================================ */
const skillBars = document.querySelectorAll(".skill-progress");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const width = entry.target.dataset.width;
        entry.target.style.width = width + "%";
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 },
);

skillBars.forEach((bar) => skillObserver.observe(bar));

/* ================================================
   SKILLS TABS
   ================================================ */
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const tab = btn.dataset.tab;
    document.querySelectorAll(".skill-card").forEach((card) => {
      if (card.dataset.category === tab) {
        card.style.display = "block";
        card.style.animation = "fadeInUp 0.5s ease forwards";
        // Re-trigger skill bar animation
        const bar = card.querySelector(".skill-progress");
        if (bar) {
          bar.style.width = "0%";
          setTimeout(() => {
            bar.style.width = bar.dataset.width + "%";
          }, 100);
        }
      } else {
        card.style.display = "none";
      }
    });
  });
});

// CSS animation keyframe for tabs
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

/* ================================================
   PROJECT FILTERS
   ================================================ */
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    document.querySelectorAll(".project-card").forEach((card) => {
      if (filter === "all" || card.dataset.type === filter) {
        card.style.display = "block";
        card.style.animation = "fadeInUp 0.5s ease forwards";
      } else {
        card.style.display = "none";
      }
    });
  });
});

/* ================================================
   EXPERIENCE TABS
   ================================================ */
document.querySelectorAll(".exp-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document
      .querySelectorAll(".exp-tab")
      .forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    const expType = tab.dataset.exp;
    document.querySelectorAll(".timeline-item").forEach((item) => {
      if (item.dataset.exp === expType) {
        item.style.display = "block";
        item.style.animation = "fadeInUp 0.5s ease forwards";
      } else {
        item.style.display = "none";
      }
    });
  });
});

/* ================================================
   3D TILT ON PROJECT CARDS
   ================================================ */
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  });
});

/* ================================================
   CONTACT FORM
   ================================================ */
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const originalHTML = btn.innerHTML;
  btn.innerHTML = "<span>Message Sent! ✓</span>";
  btn.style.background = "linear-gradient(135deg, #00b894, #00cec9)";

  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.background = "";
    e.target.reset();
  }, 3000);
});

/* ================================================
   BACK TO TOP
   ================================================ */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 500);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ================================================
   SMOOTH SCROLL FOR NAV LINKS
   ================================================ */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* ================================================
   TEXT SCRAMBLE EFFECT ON HERO NAME
   ================================================ */
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.textContent;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = "";
    let complete = 0;
    for (let i = 0; i < this.queue.length; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.queue[i].char = char;
        }
        output += char;
      } else {
        output += from;
      }
    }
    this.el.textContent = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
}

const scrambleEl = document.getElementById("scrambleText");
const scramble = new TextScramble(scrambleEl);
const names = ["Krupavaram", " Java Enthusiast"];
let nameIndex = 0;

function nextScramble() {
  scramble.setText(names[nameIndex]).then(() => {
    setTimeout(nextScramble, 3000);
  });
  nameIndex = (nameIndex + 1) % names.length;
}
setTimeout(nextScramble, 4000);
