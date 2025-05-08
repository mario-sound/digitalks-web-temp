document.addEventListener("DOMContentLoaded", function () {
  const whatsappBtn = document.getElementById("whatsapp-btn");
  const footer = document.querySelector("site-footer");

  function adjustWhatsAppButton() {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const documentHeight = document.body.offsetHeight;
    const footerOffsetTop = footer.offsetTop;

    if (scrollY + windowHeight >= footerOffsetTop) {
      whatsappBtn.style.bottom = `${windowHeight - footerOffsetTop + 20}px`;
    } else {
      whatsappBtn.style.bottom = "20px";
    }
  }
  window.addEventListener("scroll", adjustWhatsAppButton);
});

function animateBoxShadow(selector, options = {}) {
  const element =
    typeof selector === "string" ? document.querySelector(selector) : selector;
  if (!element) return;

  // Valores por defecto
  let shadowBlur = options.initial || 20;
  const min = options.min || 18;
  const max = options.max || 22;
  const inc = options.inc || 0.5;
  const intervalTime = options.intervalTime || 100;
  const color = options.color || "#a4a4a4";
  let increasing = true;

  return setInterval(() => {
    if (increasing) {
      shadowBlur += inc;
      if (shadowBlur >= max) increasing = false;
    } else {
      shadowBlur -= inc;
      if (shadowBlur <= min) increasing = true;
    }
    element.style.boxShadow = `0 0 ${shadowBlur}px ${color}`;
  }, intervalTime);
}
function animateTextShadow(selector, options = {}) {
  const element =
    typeof selector === "string" ? document.querySelector(selector) : selector;
  if (!element) return;

  // Valores por defecto
  let shadowBlur = options.initial || 20;
  const min = options.min || 18;
  const max = options.max || 22;
  const inc = options.inc || 0.5;
  const intervalTime = options.intervalTime || 100;
  const color = options.color || "#a4a4a4";
  let increasing = true;

  return setInterval(() => {
    if (increasing) {
      shadowBlur += inc;
      if (shadowBlur >= max) increasing = false;
    } else {
      shadowBlur -= inc;
      if (shadowBlur <= min) increasing = true;
    }
    element.style.textShadow = `0 0 ${shadowBlur}px ${color}`;
  }, intervalTime);
}

document.addEventListener("DOMContentLoaded", function () {
  const revealElements = document.querySelectorAll(".animate-hidden");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-reveal");
          entry.target.classList.remove("animate-hidden"); // Aseguramos que se elimine la clase animate-hidden

          // Inicia la animación de text-shadow si el elemento es .hero-aclarativo
          if (entry.target.classList.contains("hero-aclarativo")) {
            animateTextShadow(".hero-aclarativo", {
              min: 5,
              max: 25,
              initial: 20,
              inc: 1,
              intervalTime: 50,
              color: "#a4a4a4",
            });
          }

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  revealElements.forEach((el) => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", function () {
  const comparativoCards = document.querySelectorAll(
    ".comparativo-hazlotu, .comparativo-tradicional, .comparativo-digitalks"
  );

  comparativoCards.forEach((card) => {
    // Obtén el color específico para cada tarjeta
    let color;
    if (card.classList.contains("comparativo-hazlotu")) {
      color = "red";
    } else if (card.classList.contains("comparativo-tradicional")) {
      color = "red";
    } else if (card.classList.contains("comparativo-digitalks")) {
      color = "green";
    }

    // Inicia la animación de box-shadow
    let intervalId = animateBoxShadow(card, {
      min: 5,
      max: 25,
      initial: 10,
      inc: 0.5,
      intervalTime: 50,
      color: color,
    });

    // Agrega un evento hover para sobrescribir temporalmente el box-shadow
    card.addEventListener("mouseenter", () => {
      clearInterval(intervalId); // Detén la animación temporalmente
      card.style.boxShadow = ""; // Permite que el CSS :hover tome el control
    });

    card.addEventListener("mouseleave", () => {
      // Reinicia la animación después de salir del hover
      intervalId = animateBoxShadow(card, {
        min: 10,
        max: 25,
        initial: 10,
        inc: 0.5,
        intervalTime: 100,
        color: color,
      });
    });
  });
});

let audioPlayer = document.querySelector(".custom-audio-wrapper");
let intervalAudio = animateBoxShadow(audioPlayer, {
  min: 15,
  max: 40,
  initial: 15,
  inc: 0.5,
  intervalTime: 50,
  color: "#ffd113",
});

audioPlayer.addEventListener("mouseenter", () => {
  clearInterval(intervalAudio); // Detén la animación temporalmente
  audioPlayer.style.boxShadow = ""; // Permite que el CSS :hover tome el control
});

audioPlayer.addEventListener("mouseleave", () => {
  // Reinicia la animación después de salir del hover
  intervalAudio = animateBoxShadow(audioPlayer, {
    min: 15,
    max: 40,
    initial: 15,
    inc: 0.5,
    intervalTime: 50,
    color: "#ffd113",
  });
});

const toggleBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (toggleBtn && navLinks) {
  toggleBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.contains("open");

    if (isOpen) {
      // Desactiva transiciones al cerrar
      navLinks.classList.remove("open");
      navLinks.classList.add("closing");

      // Rehabilita transición después de un frame
      setTimeout(() => {
        navLinks.classList.remove("closing");
      }, 10);

      toggleBtn.classList.remove("open");
    } else {
      navLinks.classList.add("open");
      toggleBtn.classList.add("open");
    }
  });
}
