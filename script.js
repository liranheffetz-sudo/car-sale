const slides = [
  {
    src: "/car-sale/car-front-2.jpg",
    alt: "מבט קדמי על הרכב",
    label: "מבט חיצוני קדמי",
  },
  {
    src: "/car-sale/car-side-2.jpg",
    alt: "מבט צד על הרכב",
    label: "מבט צד נקי",
  },
  {
    src: "/car-sale/car-interior-2.jpg",
    alt: "תא נוסעים שמור",
    label: "תא נוסעים שמור",
  },
  {
    src: "/car-sale/car-dashboard-2.jpg",
    alt: "לוח מחוונים",
    label: "לוח מחוונים",
  },
];

const stage = document.querySelector("#carousel-stage");
const dotsContainer = document.querySelector("#carousel-dots");
const slideLabel = document.querySelector("#slide-label");
const slideCounter = document.querySelector("#slide-counter");
const prevButton = document.querySelector("#prev-slide");
const nextButton = document.querySelector("#next-slide");
const openLightboxButton = document.querySelector("#open-lightbox");
const galleryGrid = document.querySelector("#gallery-grid");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxLabel = document.querySelector("#lightbox-label");
const lightboxCounter = document.querySelector("#lightbox-counter");
const closeLightboxButton = document.querySelector("#close-lightbox");
const lightboxPrev = document.querySelector("#lightbox-prev");
const lightboxNext = document.querySelector("#lightbox-next");

let activeIndex = 0;
let autoRotateId = null;

function renderDots() {
  dotsContainer.innerHTML = "";

  slides.forEach((slide, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot" + (index === activeIndex ? " is-active" : "");
    dot.setAttribute("aria-label", "עבור לתמונה " + (index + 1));
    dot.addEventListener("click", function () {
      setActiveIndex(index);
      restartRotation();
    });
    dotsContainer.appendChild(dot);
  });
}

function renderGallery() {
  galleryGrid.innerHTML = "";

  slides.forEach((slide, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "gallery-button" + (index === 0 ? " is-large" : "");
    button.setAttribute("aria-label", slide.label);

    const image = document.createElement("img");
    image.src = slide.src;
    image.alt = slide.alt;
    image.loading = index === 0 ? "eager" : "lazy";

    const caption = document.createElement("div");
    caption.className = "gallery-caption";
    caption.textContent = slide.label;

    button.append(image, caption);
    button.addEventListener("click", function () {
      openLightbox(index);
    });

    galleryGrid.appendChild(button);
  });
}

function renderActiveSlide() {
  const slide = slides[activeIndex];
  stage.style.backgroundImage = 'url("' + slide.src + '")';
  slideLabel.textContent = slide.label;
  slideCounter.textContent = activeIndex + 1 + "/" + slides.length;
  renderDots();
}

function setActiveIndex(index) {
  activeIndex = (index + slides.length) % slides.length;
  renderActiveSlide();
}

function openLightbox(index) {
  setActiveIndex(index);
  const slide = slides[activeIndex];
  lightboxImage.src = slide.src;
  lightboxImage.alt = slide.alt;
  lightboxLabel.textContent = slide.label;
  lightboxCounter.textContent = activeIndex + 1 + "/" + slides.length;
  lightbox.showModal();
}

function closeLightbox() {
  lightbox.close();
}

function restartRotation() {
  window.clearInterval(autoRotateId);
  autoRotateId = window.setInterval(function () {
    setActiveIndex(activeIndex + 1);
  }, 4800);
}

prevButton.addEventListener("click", function () {
  setActiveIndex(activeIndex - 1);
  restartRotation();
});

nextButton.addEventListener("click", function () {
  setActiveIndex(activeIndex + 1);
  restartRotation();
});

openLightboxButton.addEventListener("click", function () {
  openLightbox(activeIndex);
});

closeLightboxButton.addEventListener("click", closeLightbox);

lightboxPrev.addEventListener("click", function () {
  openLightbox(activeIndex - 1);
});

lightboxNext.addEventListener("click", function () {
  openLightbox(activeIndex + 1);
});

lightbox.addEventListener("click", function (event) {
  const card = lightbox.querySelector(".lightbox-card");
  const rect = card.getBoundingClientRect();

  const clickedInside =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom;

  if (!clickedInside) {
    closeLightbox();
  }
});

document.addEventListener("keydown", function (event) {
  if (!lightbox.open) {
    return;
  }

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowLeft") {
    openLightbox(activeIndex + 1);
  }

  if (event.key === "ArrowRight") {
    openLightbox(activeIndex - 1);
  }
});

renderGallery();
renderActiveSlide();
restartRotation();
