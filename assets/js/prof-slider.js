// ===============================
//  SLIDER PROFISSIONAL SKILLTREE
// ===============================

document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".prof-image");
    
    // Cria o wrapper interno
    const track = document.createElement("div");
    track.classList.add("prof-slider-track");

    // Pega todas as imagens dentro da div
    const slides = Array.from(slider.querySelectorAll("img"));

    // Move imagens para dentro do track
    slides.forEach(img => {
        const slide = document.createElement("div");
        slide.classList.add("prof-slide");
        slide.appendChild(img);
        track.appendChild(slide);
    });

    slider.appendChild(track);

    let currentIndex = 0;
    const totalSlides = slides.length;

    // ==========================
    // Botões de navegação
    // ==========================

    const btnPrev = document.createElement("button");
    btnPrev.classList.add("prof-slide-prev");
    btnPrev.innerHTML = "&#10094;"; // seta <
    
    const btnNext = document.createElement("button");
    btnNext.classList.add("prof-slide-next");
    btnNext.innerHTML = "&#10095;"; // seta >

    slider.appendChild(btnPrev);
    slider.appendChild(btnNext);

    // ==========================
    // Função que move o slide
    // ==========================
    function updateSlide() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    btnNext.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlide();
    });

    btnPrev.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlide();
    });

    // Auto-play opcional (desative se não quiser)
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlide();
    }, 6000);

});
