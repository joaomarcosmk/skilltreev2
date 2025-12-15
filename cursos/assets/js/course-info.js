document.addEventListener("DOMContentLoaded", () => {
  const courseInfo = document.querySelector("[data-course-info]");
  if (!courseInfo) return;

  const courseId = document.body.dataset.course;

  const imageEl = courseInfo.querySelector("[data-course-info-image]");
  const ctaBtn = courseInfo.querySelector("[data-course-info-cta]");

  /* MAPA DE CONFIGURAÇÕES POR CURSO */
  const courseData = {
    "concept-art": {
      image: "assets/images/course-concept-art.png",
      ctaLink: "#inscricao"
    },
    "animacao": {
      image: "assets/images/course-animacao.png",
      ctaLink: "#inscricao"
    }
  };

  if (courseData[courseId]) {
    imageEl.src = courseData[courseId].image;
    ctaBtn.addEventListener("click", () => {
      window.location.href = courseData[courseId].ctaLink;
    });
  }
});
