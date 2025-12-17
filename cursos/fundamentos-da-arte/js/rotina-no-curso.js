document.addEventListener("DOMContentLoaded", () => {
  const slot = document.querySelector('[data-component="rotina-no-curso"]');
  if (!slot) return;

  fetch("components/rotina-no-curso.txt")
    .then(r => r.ok ? r.text() : Promise.reject("rnc txt not found"))
    .then(html => { slot.innerHTML = html; })
    .catch(err => console.error("rotina-no-curso:", err));
});
