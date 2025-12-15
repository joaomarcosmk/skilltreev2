document.addEventListener("DOMContentLoaded", () => {
  const slot = document.querySelector('[data-component="faq-curso"]');
  if (!slot) return;

  fetch("components/faq-curso.txt")
    .then(res => {
      if (!res.ok) throw new Error("Erro ao carregar faq-curso.txt");
      return res.text();
    })
    .then(html => {
      slot.innerHTML = html;

      const items = slot.querySelectorAll(".faq-item");

      items.forEach(item => {
        const header = item.querySelector(".faq-question");
        const toggle = item.querySelector(".faq-toggle");

        header.addEventListener("click", () => {
          const isOpen = item.classList.contains("active");

          items.forEach(i => {
            i.classList.remove("active");
            i.querySelector(".faq-toggle").textContent = "+";
          });

          if (!isOpen) {
            item.classList.add("active");
            toggle.textContent = "−";
          }
        });
      });
    })
    .catch(err => console.error("faq-curso:", err));
});
