document.addEventListener("DOMContentLoaded", () => {
  const slot = document.querySelector('[data-component="metricas-mercado"]');
  if (!slot) return;

  fetch("components/metricas-mercado.txt")
    .then(r => r.ok ? r.text() : Promise.reject("mm txt not found"))
    .then(html => { slot.innerHTML = html; })
    .catch(err => console.error("metricas-mercado:", err));
});
