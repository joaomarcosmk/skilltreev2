document.addEventListener("DOMContentLoaded", () => {
  const slot = document.querySelector(
    '[data-component="para-quem-e-indicado"]'
  );
  if (!slot) return;

  fetch("components/para-quem-e-indicado.txt")
    .then(res => {
      if (!res.ok) throw new Error("Erro ao carregar para-quem-e-indicado.txt");
      return res.text();
    })
    .then(html => {
      slot.innerHTML = html;

      const cta = slot.querySelector("[data-pqi-cta]");
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
    .catch(err => console.error("para-quem-e-indicado:", err));
});
