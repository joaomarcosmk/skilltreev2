// SLIDER
const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slide");
const btnPrev = document.querySelector(".slider-btn.prev");
const btnNext = document.querySelector(".slider-btn.next");

let index = 0;
const totalSlides = slides.length;

function updateSlider() {
    track.style.transform = `translateX(-${index * 520}px)`;
}

btnNext.addEventListener("click", () => {
    index = (index + 1) % totalSlides;
    updateSlider();
});

btnPrev.addEventListener("click", () => {
    index = (index - 1 + totalSlides) % totalSlides;
    updateSlider();
});

// autoplay
setInterval(() => {
    index = (index + 1) % totalSlides;
    updateSlider();
}, 6000);

// LIGHTBOX
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const btnClose = document.querySelector(".lightbox-close");
const lbPrev = document.querySelector(".lightbox-prev");
const lbNext = document.querySelector(".lightbox-next");

slides.forEach((slide, i) => {
    slide.addEventListener("click", () => {
        index = i;
        lightboxImg.src = slide.querySelector("img").src;
        lightbox.style.display = "flex";
    });
});

btnClose.addEventListener("click", () => {
    lightbox.style.display = "none";
});

lbNext.addEventListener("click", () => {
    index = (index + 1) % totalSlides;
    lightboxImg.src = slides[index].querySelector("img").src;
});

lbPrev.addEventListener("click", () => {
    index = (index - 1 + totalSlides) % totalSlides;
    lightboxImg.src = slides[index].querySelector("img").src;
});
