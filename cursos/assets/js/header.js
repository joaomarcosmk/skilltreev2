function initHeader() {
  const dropdowns = document.querySelectorAll(".dropdown");

  if (!dropdowns.length) return;

  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector("a");
    const menu = dropdown.querySelector(".dropdown-menu");

    if (!trigger || !menu) return;

    trigger.addEventListener("click", (e) => {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        e.stopPropagation();

        closeAllDropdowns(dropdown);
        dropdown.classList.toggle("is-open");
      }
    });
  });

  document.addEventListener("click", closeAllDropdowns);

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      closeAllDropdowns();
    }
  });
}

function closeAllDropdowns(exception = null) {
  document.querySelectorAll(".dropdown.is-open").forEach(dropdown => {
    if (dropdown !== exception) {
      dropdown.classList.remove("is-open");
    }
  });
}
