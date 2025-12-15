document.addEventListener("DOMContentLoaded", () => {
  const slot = document.querySelector('[data-component="professor-do-curso"]');
  if (!slot) return;

  fetch("components/professor-do-curso.txt")
    .then((res) => {
      if (!res.ok) throw new Error("Não foi possível carregar professor-do-curso.txt");
      return res.text();
    })
    .then((html) => {
      slot.innerHTML = html;

      // CTA: por padrão, rola até o formulário/ancora (ajuste se quiser)
      const cta = slot.querySelector("[data-pdc-cta]");
      if (cta) {
        cta.addEventListener("click", () => {
          const target = document.querySelector("#inscricao") || document.querySelector('[data-component="course-hero"]');
          if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    })
    .catch((err) => console.error("professor-do-curso:", err));
});
