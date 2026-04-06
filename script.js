const body = document.body;
const progressBar = document.getElementById("progressBar");
const siteHeader = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navLinkItems = document.querySelectorAll(".nav-link");
const typingText = document.getElementById("typingText");
const counters = document.querySelectorAll(".counter");
const revealEls = document.querySelectorAll(".reveal");
const projectButtons = document.querySelectorAll(".project-open");
const projectModal = document.getElementById("projectModal");
const modalContent = document.getElementById("modalContent");
const modalClose = document.getElementById("modalClose");
const modalOverlay = document.getElementById("modalOverlay");
const contactForm = document.getElementById("contactForm");
const toast = document.getElementById("toast");
const copyEmailBtn = document.getElementById("copyEmailBtn");
const emailText = document.getElementById("emailText");
const yearEl = document.getElementById("year");
const whatsappBtn = document.getElementById("whatsappBtn");
const sendEmailBtn = document.getElementById("sendEmailBtn");

/* =========================
   CONFIG
========================= */
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

const WHATSAPP_NUMBER = "2347065501228";
const DIRECT_EMAIL = "Abdulrasaqabdulgaffar492@gmail.com";

/* =========================
   TOAST
========================= */
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

/* =========================
   YEAR
========================= */
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* =========================
   HEADER + SCROLL PROGRESS
========================= */
function updateScrollUI() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  if (progressBar) progressBar.style.width = `${progress}%`;

  if (siteHeader) {
    if (scrollTop > 12) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }
  }
}

updateScrollUI();
window.addEventListener("scroll", updateScrollUI);

/* =========================
   MOBILE MENU
========================= */
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

navLinkItems.forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks) navLinks.classList.remove("open");
  });
});

/* =========================
   TYPING EFFECT
========================= */
const words = [
  "corporate business websites.",
  "Responsive website design.",
  "MVPs and ecommerce website.",
  "payment-ready web products."
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typingText) return;

  const currentWord = words[wordIndex];
  typingText.textContent = currentWord.slice(0, charIndex);

  if (!deleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(typeLoop, 80);
  } else if (!deleting && charIndex === currentWord.length) {
    deleting = true;
    setTimeout(typeLoop, 1100);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeLoop, 40);
  } else {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeLoop, 220);
  }
}

typeLoop();

/* =========================
   REVEAL ON SCROLL
========================= */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealEls.forEach((el) => revealObserver.observe(el));

/* =========================
   COUNTER ANIMATION
========================= */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || "";
  let value = 0;
  const duration = 1400;
  const stepTime = 20;
  const increment = Math.max(1, Math.ceil(target / (duration / stepTime)));

  const timer = setInterval(() => {
    value += increment;
    if (value >= target) {
      value = target;
      clearInterval(timer);
    }
    el.textContent = `${value}${suffix}`;
  }, stepTime);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.45 }
);

counters.forEach((counter) => counterObserver.observe(counter));

/* =========================
   ACTIVE NAV LINK
========================= */
const sections = document.querySelectorAll("section[id]");

function activateNavOnScroll() {
  let currentId = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    if (window.scrollY >= sectionTop) {
      currentId = section.getAttribute("id");
    }
  });

  navLinkItems.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
}

activateNavOnScroll();
window.addEventListener("scroll", activateNavOnScroll);

/* =========================
   PROJECT MODAL
========================= */
function openModal(data) {
  if (!projectModal || !modalContent) return;

  modalContent.innerHTML = `
    <h3>${data.title}</h3>
    <p class="modal-meta">${data.category}</p>
    <p>${data.description}</p>
    <ul>
      <li><strong>Tech Stack:</strong> ${data.stack}</li>
      <li><strong>My Role:</strong> ${data.role}</li>
      <li><strong>Result:</strong> ${data.result}</li>
    </ul>
  `;

  projectModal.classList.add("open");
  projectModal.setAttribute("aria-hidden", "false");
  body.style.overflow = "hidden";
}

function closeModal() {
  if (!projectModal) return;
  projectModal.classList.remove("open");
  projectModal.setAttribute("aria-hidden", "true");
  body.style.overflow = "";
}

projectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openModal({
      title: button.dataset.title,
      category: button.dataset.category,
      description: button.dataset.description,
      stack: button.dataset.stack,
      role: button.dataset.role,
      result: button.dataset.result
    });
  });
});

if (modalClose) modalClose.addEventListener("click", closeModal);
if (modalOverlay) modalOverlay.addEventListener("click", closeModal);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && projectModal && projectModal.classList.contains("open")) {
    closeModal();
  }
});

/* =========================
   COPY EMAIL
========================= */
if (copyEmailBtn && emailText) {
  copyEmailBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(emailText.textContent.trim());
      showToast("Email copied to clipboard");
    } catch (error) {
      showToast("Unable to copy email");
    }
  });
}

/* =========================
   EMAILJS INIT
========================= */
if (window.emailjs && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
  });
}

/* =========================
   FORM HELPERS
========================= */
function getFormData() {
  return {
    name: document.getElementById("name")?.value.trim() || "",
    email: document.getElementById("email")?.value.trim() || "",
    title: document.getElementById("title")?.value.trim() || "New Project Enquiry",
    message: document.getElementById("message")?.value.trim() || ""
  };
}

function buildWhatsAppMessage() {
  const data = getFormData();

  return `Hello AbdulGhaffar,

My name is ${data.name || "Website Visitor"}.
Email: ${data.email || "Not provided"}
Project Type: ${data.title}

Project Details:
${data.message || "I'd like to discuss a project."}

You can also reach me via email: ${DIRECT_EMAIL}`;
}

/* =========================
   CONTACT FORM - EMAILJS
========================= */
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (
      EMAILJS_PUBLIC_KEY === "qdEBRMtZ2MshSKDoH" ||
      EMAILJS_SERVICE_ID === "service_pslal4q" ||
      EMAILJS_TEMPLATE_ID === "template_kc8s5do"
    ) {
      showToast("Add your EmailJS Public Key, Service ID, and Template ID first.");
      return;
    }

    if (!window.emailjs) {
      showToast("Email service failed to load.");
      return;
    }

    const originalText = sendEmailBtn ? sendEmailBtn.textContent : "Send via Email";

    if (sendEmailBtn) {
      sendEmailBtn.disabled = true;
      sendEmailBtn.textContent = "Sending...";
    }

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        contactForm
      );

      showToast("Message sent successfully.");
      contactForm.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      showToast("Email failed. Try WhatsApp instead.");
    } finally {
      if (sendEmailBtn) {
        sendEmailBtn.disabled = false;
        sendEmailBtn.textContent = originalText;
      }
    }
  });
}

/* =========================
   WHATSAPP BUTTON
========================= */
if (whatsappBtn) {
  whatsappBtn.addEventListener("click", () => {
    const data = getFormData();

    if (!data.name || !data.email || !data.title || !data.message) {
      showToast("Please fill the form first.");
      return;
    }

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage())}`;
    window.open(whatsappURL, "_blank");
  });
}

/* =========================
   3D TILT
========================= */
const tiltCards = document.querySelectorAll(".tilt-card");

if (window.matchMedia("(hover: hover)").matches) {
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 6;
      const rotateX = ((centerY - y) / centerY) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });
}

/* =========================
   MAGNETIC BUTTONS
========================= */
const magneticButtons = document.querySelectorAll(".magnetic");

if (window.matchMedia("(hover: hover)").matches) {
  magneticButtons.forEach((button) => {
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      button.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translate(0, 0)";
    });
  });
}

/* =========================
   CANVAS BACKGROUND
========================= */
const canvas = document.getElementById("bgCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;
let particles = [];
const PARTICLE_COUNT = 55;

function resizeCanvas() {
  if (!canvas || !ctx) return;
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}

function createParticles() {
  particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.45,
    vy: (Math.random() - 0.5) * 0.45,
    r: Math.random() * 2 + 0.8
  }));
}

function drawCanvas() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
    if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

    ctx.beginPath();
    ctx.fillStyle = "rgba(255, 248, 231, 0.45)";
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j];
      const dx = p.x - p2.x;
      const dy = p.y - p2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 248, 231, ${(1 - distance / 120) * 0.12})`;
        ctx.lineWidth = 1;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(drawCanvas);
}

if (canvas && ctx) {
  resizeCanvas();
  createParticles();
  drawCanvas();

  window.addEventListener("resize", () => {
    resizeCanvas();
    createParticles();
  });
}

/* =========================
   HERO ORB PARALLAX
========================= */
const orbs = document.querySelectorAll(".hero-orb");

window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 18;
  const y = (e.clientY / window.innerHeight - 0.5) * 18;

  orbs.forEach((orb, index) => {
    const factor = (index + 1) * 0.55;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});