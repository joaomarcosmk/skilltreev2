document.addEventListener("DOMContentLoaded", () => {
  const slot = document.querySelector('[data-component="depoimentos"]');
  if (!slot) return;

  fetch("components/depoimentos.txt")
    .then(res => res.text())
    .then(html => {
      slot.innerHTML = html;

      const track = slot.querySelector("[data-testimonials-track]");
      const slides = slot.querySelectorAll(".testimonial");
      const prevBtn = slot.querySelector("[data-testimonials-prev]");
      const nextBtn = slot.querySelector("[data-testimonials-next]");
      const dotsContainer = slot.querySelector("[data-testimonials-dots]");

      let index = 0;
      let interval;

      /* DOTS */
      slides.forEach((_, i) => {
        const dot = document.createElement("button");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goTo(i));
        dotsContainer.appendChild(dot);
      });

      const dots = dotsContainer.querySelectorAll("button");

      function goTo(i) {
        index = (i + slides.length) % slides.length;
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(d => d.classList.remove("active"));
        dots[index].classList.add("active");
        resetAuto();
      }

      function next() { goTo(index + 1); }
      function prev() { goTo(index - 1); }

      function startAuto() {
        interval = setInterval(next, 5000);
      }

      function resetAuto() {
        clearInterval(interval);
        startAuto();
      }

      nextBtn.addEventListener("click", next);
      prevBtn.addEventListener("click", prev);

      startAuto();
    })
    .catch(err => console.error("depoimentos:", err));
});
