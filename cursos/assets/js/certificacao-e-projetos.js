document.addEventListener("DOMContentLoaded", () => {
  const slot = document.querySelector(
    '[data-component="certificacao-e-projetos"]'
  );
  if (!slot) return;

  fetch("components/certificacao-e-projetos.txt")
    .then(res => {
      if (!res.ok) throw new Error("Erro ao carregar certificacao-e-projetos.txt");
      return res.text();
    })
    .then(html => {
      slot.innerHTML = html;

      const cta = slot.querySelector("[data-cep-cta]");
      if (cta) {
        cta.addEventListener("click", () => {
          const target =
            document.querySelector("#inscricao") ||
            document.querySelector('[data-component="course-hero"]');
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
      }
    })
    .catch(err => console.error("certificacao-e-projetos:", err));
});
