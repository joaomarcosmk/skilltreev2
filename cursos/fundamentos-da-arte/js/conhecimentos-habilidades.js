document.addEventListener("DOMContentLoaded", () => {
  const slot = document.querySelector(
    '[data-component="conhecimentos-habilidades"]'
  );
  if (!slot) return;

  fetch("components/conhecimentos-habilidades.txt")
    .then(res => {
      if (!res.ok) {
        throw new Error("Erro ao carregar conhecimentos-habilidades.txt");
      }
      return res.text();
    })
    .then(html => {
      slot.innerHTML = html;

      const cta = slot.querySelector("[data-ch-cta]");
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
    .catch(err => console.error("conhecimentos-habilidades:", err));
});
