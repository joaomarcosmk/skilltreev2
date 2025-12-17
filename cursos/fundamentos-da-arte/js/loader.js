async function loadComponents() {
  const components = document.querySelectorAll("[data-component]");

  for (const el of components) {
    const name = el.dataset.component;
    const res = await fetch(`/cursos/assets/components/${name}.txt`);
    el.innerHTML = await res.text();
  }
}
