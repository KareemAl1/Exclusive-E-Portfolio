let isModalOpen = false;
let contrastToggle = true;
const scaleFactor = 1 / 20;
const navLinks = document.querySelectorAll(".nav__link--anchor");

// Dark mode on by default
document.body.classList.add("dark-theme");

document.addEventListener("mousemove", moveBackground);

function moveBackground(event) {
  const shapes = document.querySelectorAll(".shape");
  const x = event.clientX * scaleFactor;
  const y = event.clientY * scaleFactor;
  for (let i = 0; i < shapes.length; ++i) {
    const isOdd = i % 2 !== 0;
    const boolInt = isOdd ? -1 : 1;
    shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px)`;
  }
}

function toggleContrast() {
  contrastToggle = !contrastToggle;
  if (contrastToggle) {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }
}

function contact(event) {
  event.preventDefault();
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  loading.classList.add("modal__overlay--visible");
  emailjs.sendForm("service_53clneq", "template_4elx7ne", event.target)
    .then(() => {
      loading.classList.remove("modal__overlay--visible");
      success.classList.add("modal__overlay--visible");
    })
    .catch(() => {
      loading.classList.remove("modal__overlay--visible");
      alert("The email service is temporarily unavailable. Please contact me directly at kareemalwan47@gmail.com");
    });
}

function toggleModal() {
  if (isModalOpen) {
    isModalOpen = false;
    document.body.classList.remove("modal--open");
  } else {
    isModalOpen = true;
    document.body.classList.add("modal--open");
  }
}

// Typing animation
const typingText = "Frontend Developer";
const typingElement = document.querySelector(".header__para b.orange");
let i = 0;
typingElement.textContent = "";

function typeWriter() {
  if (typingElement && i < typingText.length) {
    typingElement.textContent = typingText.slice(0, i + 1);
    i++;
    setTimeout(typeWriter, 100);
  }
}
typeWriter();

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal--visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.project, .section__title').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// Cursor trail (normal mouse cursor)
const trail = document.createElement("div");
trail.classList.add("cursor__trail");
document.body.appendChild(trail);

let trailX = 0, trailY = 0;
let mouseX = 0, mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.15;
  trailY += (mouseY - trailY) * 0.15;
  trail.style.left = trailX + "px";
  trail.style.top = trailY + "px";
  requestAnimationFrame(animateTrail);
}
animateTrail();

// Active nav highlight
window.addEventListener("scroll", () => {
  const projectsSection = document.querySelector("#projects");
  const projectsTop = projectsSection.offsetTop - 150;
  navLinks.forEach(link => link.classList.remove("nav__link--active"));
  if (window.scrollY >= projectsTop) {
    document.querySelector('a[href="#projects"]').classList.add("nav__link--active");
  }
});

// Hero text stagger animation on load
window.addEventListener("load", () => {
  const titles = document.querySelectorAll(".title");
  const headerPara = document.querySelector(".header__para");
  const socialList = document.querySelector(".social__list");

  titles.forEach((title, index) => {
    title.style.opacity = "0";
    title.style.transform = "translateY(30px)";
    title.style.transition = `opacity 600ms ease ${index * 200}ms, transform 600ms ease ${index * 200}ms`;
    setTimeout(() => {
      title.style.opacity = "1";
      title.style.transform = "translateY(0)";
    }, 100);
  });

  [headerPara, socialList].forEach((el, index) => {
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = `opacity 600ms ease ${400 + index * 150}ms, transform 600ms ease ${400 + index * 150}ms`;
    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 100);
  });
});

// Nav link hover glow
navLinks.forEach(link => {
  link.addEventListener("mouseenter", () => {
    link.style.textShadow = "0 0 8px rgba(74, 144, 226, 0.6)";
  });
  link.addEventListener("mouseleave", () => {
    link.style.textShadow = "none";
  });
});

// Project card tilt on mouse move
document.querySelectorAll(".project__wrapper").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    card.style.transition = "transform 500ms ease";
  });
});

// Social link glow on hover
document.querySelectorAll(".social__link").forEach(link => {
  link.addEventListener("mouseenter", () => {
    link.style.boxShadow = "0 0 16px rgba(74, 144, 226, 0.7)";
  });
  link.addEventListener("mouseleave", () => {
    link.style.boxShadow = "none";
  });
});
