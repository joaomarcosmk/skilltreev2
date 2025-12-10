document.addEventListener("DOMContentLoaded", () => {

    const sliders = document.querySelectorAll(".teacher-slider");

    sliders.forEach(slider => {

        const track = slider.querySelector(".slider-track");
        const slides = Array.from(track.children);
        const prevBtn = slider.querySelector(".prev");
        const nextBtn = slider.querySelector(".next");
        const dotsContainer = slider.querySelector(".slider-dots");

        let index = 0;

        // Criar dots
        slides.forEach((_, i) => {
            const dot = document.createElement("button");
            if (i === 0) dot.classList.add("active");
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.children);

        function updateSlider(newIndex) {
            index = newIndex;
            track.style.transform = `translateX(-${index * 100}%)`;

            dots.forEach(d => d.classList.remove("active"));
            dots[index].classList.add("active");
        }

        // Botão próximo
        nextBtn.addEventListener("click", () => {
            updateSlider(index === slides.length - 1 ? 0 : index + 1);
        });

        // Botão anterior
        prevBtn.addEventListener("click", () => {
            updateSlider(index === 0 ? slides.length - 1 : index - 1);
        });

        // Dots clicáveis
        dots.forEach((dot, i) => {
            dot.addEventListener("click", () => updateSlider(i));
        });

        // Autoplay por slider
        setInterval(() => {
            updateSlider(index === slides.length - 1 ? 0 : index + 1);
        }, 5000);

    });

});
