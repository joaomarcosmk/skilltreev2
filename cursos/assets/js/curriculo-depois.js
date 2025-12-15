document.addEventListener("DOMContentLoaded", () => {
  const slot = document.querySelector('[data-component="curriculo-depois"]');
  if (!slot) return;

  fetch("components/curriculo-depois.txt")
    .then(r => r.ok ? r.text() : Promise.reject("cd txt not found"))
    .then(html => { slot.innerHTML = html; })
    .catch(err => console.error("curriculo-depois:", err));
});
