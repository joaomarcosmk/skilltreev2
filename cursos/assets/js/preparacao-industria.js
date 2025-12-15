document.addEventListener("DOMContentLoaded", () => {
  const slot = document.querySelector(
    '[data-component="preparacao-industria"]'
  );
  if (!slot) return;

  fetch("components/preparacao-industria.txt")
    .then(res => {
      if (!res.ok) {
        throw new Error("Erro ao carregar preparacao-industria.txt");
      }
      return res.text();
    })
    .then(html => {
      slot.innerHTML = html;

      const cta = slot.querySelector("[data-pi-cta]");
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
    .catch(err => console.error("preparacao-industria:", err));
});
