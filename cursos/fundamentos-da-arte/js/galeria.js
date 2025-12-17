function initCourseGallery() {
  const courseId = document.body.dataset.course;
  if (!COURSES_DATA[courseId]?.gallery) return;

  const images = COURSES_DATA[courseId].gallery;
  const grid = document.querySelector("[data-gallery-grid]");
  const lightbox = document.querySelector("[data-lightbox]");
  const imgEl = lightbox.querySelector(".lightbox-image");

  let current = 0;
  let zoom = 1;

  images.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Trabalho de aluno";
    img.addEventListener("click", () => open(i));
    grid.appendChild(img);
  });

  function open(index) {
    current = index;
    zoom = 1;
    imgEl.src = images[current];
    imgEl.style.transform = "scale(1)";
    lightbox.hidden = false;
  }

  function close() {
    lightbox.hidden = true;
  }

  function next() {
    open((current + 1) % images.length);
  }

  function prev() {
    open((current - 1 + images.length) % images.length);
  }

  lightbox.querySelector("[data-next]").onclick = next;
  lightbox.querySelector("[data-prev]").onclick = prev;
  lightbox.querySelector("[data-close]").onclick = close;

  lightbox.querySelector("[data-zoom-in]").onclick = () => {
    zoom += 0.2;
    imgEl.style.transform = `scale(${zoom})`;
  };

  lightbox.querySelector("[data-zoom-out]").onclick = () => {
    zoom = Math.max(1, zoom - 0.2);
    imgEl.style.transform = `scale(${zoom})`;
  };

  lightbox.querySelector("[data-share]").onclick = () => {
    if (navigator.share) {
      navigator.share({ url: images[current] });
    } else {
      navigator.clipboard.writeText(images[current]);
      alert("Link copiado!");
    }
  };

  lightbox.querySelector(".lightbox-overlay").onclick = close;
}
