function initCourseModules() {
  const courseId = document.body.dataset.course;
  const modules = COURSES_DATA[courseId]?.modules;

  if (!modules) return;

  const list = document.querySelector("[data-modules-list]");
  if (!list) return;

  modules.forEach((module, index) => {
    const item = document.createElement("div");
    item.className = "course-module";

    item.innerHTML = `
      <div class="course-module-header">
        <span class="course-module-title">
          ${index + 1}. ${module.title}
        </span>
        <span class="course-module-toggle">+</span>
      </div>
      <div class="course-module-content">
        ${module.description}
      </div>
    `;

    const header = item.querySelector(".course-module-header");

    header.addEventListener("click", () => {
      closeAllModules(item);
      item.classList.toggle("is-open");
    });

    list.appendChild(item);
  });

  // abre o primeiro módulo por padrão
  list.firstChild?.classList.add("is-open");
}

function closeAllModules(exception) {
  document.querySelectorAll(".course-module.is-open").forEach(item => {
    if (item !== exception) item.classList.remove("is-open");
  });
}
