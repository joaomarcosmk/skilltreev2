const moduleHeaders = document.querySelectorAll(".module-header");

moduleHeaders.forEach(header => {
    header.addEventListener("click", () => {

        const content = header.nextElementSibling;
        const icon = header.querySelector(".icon");

        // Fechar todos os outros antes de abrir o novo (estilo Elementor)
        document.querySelectorAll(".module-content").forEach(c => {
            if (c !== content) c.classList.remove("open");
        });

        document.querySelectorAll(".module-header .icon").forEach(i => {
            if (i !== icon) i.textContent = "+";
        });

        // Toggle do item clicado
        content.classList.toggle("open");

        icon.textContent = content.classList.contains("open") ? "–" : "+";
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".slider-track");
    const slides = Array.from(track.children);
    const dotsContainer = document.querySelector(".slider-dots");

    let index = 0;

    // Criar dots dinamicamente
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

    // Botões anterior e próximo
    document.querySelector(".prev").addEventListener("click", () => {
        updateSlider(index === 0 ? slides.length - 1 : index - 1);
    });

    document.querySelector(".next").addEventListener("click", () => {
        updateSlider(index === slides.length - 1 ? 0 : index + 1);
    });

    // Dots clicáveis
    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => updateSlider(i));
    });

    // Autoplay
    setInterval(() => {
        updateSlider(index === slides.length - 1 ? 0 : index + 1);
    }, 5000);
});


