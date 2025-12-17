document.addEventListener("DOMContentLoaded", () => {
  const slot = document.querySelector('[data-component="investimento"]');
  if (!slot) return;

  fetch("components/investimento.txt")
    .then(r => r.ok ? r.text() : Promise.reject("inv txt not found"))
    .then(html => {
      slot.innerHTML = html;

      const cta = slot.querySelector("[data-inv-cta]");
      if (cta) {
        cta.addEventListener("click", () => {
          const target =
            document.querySelector("#inscricao") ||
            document.querySelector('[data-component="course-hero"]');
          if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    })
    .catch(err => console.error("investimento:", err));
});
