function initCourseHero() {
  const courseId = document.body.dataset.course;

  if (!courseId || !window.COURSES_DATA || !COURSES_DATA[courseId]) {
    console.warn("Curso não encontrado:", courseId);
    return;
  }

  const data = COURSES_DATA[courseId];

  /* ==========================
     TEXTOS BÁSICOS
  ========================== */

  setText("[data-course-label]", data.label);
  setHTML("[data-course-title]", data.title);
  setText("[data-course-description]", data.description);
  setText("[data-course-price-info]", data.priceInfo);
  setText("[data-course-price]", data.price);

  /* ==========================
     BENEFÍCIOS
  ========================== */

  const benefitEls = document.querySelectorAll(
    ".course-hero-benefit span[data-course-benefit]"
  );

  benefitEls.forEach((el, index) => {
    if (data.benefits?.[index]) {
      el.innerHTML = data.benefits[index].text;
    }
  });

  /* ==========================
     INSCRIÇÃO
  ========================== */

  setText("[data-course-start]", data.enroll?.start);
  setText("[data-course-schedule]", data.enroll?.schedule);
  setText("[data-course-mentoring]", data.enroll?.mentoring);

  /* ==========================
     IMAGEM
  ========================== */

  const imageBox = document.querySelector(".course-hero-image");
  if (imageBox && data.image) {
    imageBox.style.backgroundImage = `url(${data.image})`;
    imageBox.style.backgroundSize = "cover";
    imageBox.style.backgroundPosition = "center";
  }
}
