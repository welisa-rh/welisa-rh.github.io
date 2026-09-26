// Menu mobile
const toggle = document.getElementById("nav-toggle");
const nav = document.getElementById("site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Scrollspy
const sections = ["sobre", "experiencia", "competencias", "formacao", "diferenciais", "contato"];
const navLinks = nav ? Array.from(nav.querySelectorAll("a[href^='#']")) : [];

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
      });
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((id) => {
  const el = document.getElementById(id);
  if (el) spy.observe(el);
});

// Reveal on scroll
const revealEls = document.querySelectorAll(
  ".mini-card, .timeline-item, .edu-card, .diff-card, .chip-grid li"
);
revealEls.forEach((el) => el.classList.add("reveal"));

const revealer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => revealer.observe(el));

// Ano dinâmico
const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
