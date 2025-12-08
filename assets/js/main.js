document.querySelector('.dropdown-toggle').addEventListener('click', function(e) {
    e.preventDefault();
    const parent = this.parentElement;
    parent.classList.toggle('active');

    const menu = parent.querySelector('.dropdown-menu');
    menu.style.display = menu.style.display === "block" ? "none" : "block";
});

// ===============================
// SLIDER DE DEPOIMENTOS SKILLTREE
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector('.depoimentos-track');
    const cards = document.querySelectorAll('.dep-card');
    const nextBtn = document.querySelector('.dep-btn.next');
    const prevBtn = document.querySelector('.dep-btn.prev');
    const dotsContainer = document.querySelector('.dep-dots');

    let index = 0;
    let interval;


    // -------------------------------
    // Criar dots dinamicamente
    // -------------------------------
    cards.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('dep-dot');

        if (i === 0) dot.classList.add('active');

        dotsContainer.appendChild(dot);

        dot.addEventListener('click', () => {
            index = i;
            updateSlider();
            restartAutoPlay();
        });
    });

    const dots = dotsContainer.querySelectorAll('.dep-dot');


    // -------------------------------
    // Atualizar slider
    // -------------------------------
    function updateSlider() {
    track.style.transform = `translateX(${-index * 100}%)`;

    cards.forEach(card => card.classList.remove('active'));
    cards[index].classList.add('active');

    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}


    // -------------------------------
    // Botão Next
    // -------------------------------
    nextBtn.addEventListener('click', () => {
        index = (index + 1) % cards.length;
        updateSlider();
        restartAutoPlay();
    });


    // -------------------------------
    // Botão Prev
    // -------------------------------
    prevBtn.addEventListener('click', () => {
        index = (index - 1 + cards.length) % cards.length;
        updateSlider();
        restartAutoPlay();
    });


    // -------------------------------
    // Auto-play (6 segundos)
    // -------------------------------
    function startAutoPlay() {
        interval = setInterval(() => {
            index = (index + 1) % cards.length;
            updateSlider();
        }, 6000);
    }

    function restartAutoPlay() {
        clearInterval(interval);
        startAutoPlay();
    }


    // Iniciar autoplay
    startAutoPlay();

});


  // Exemplo: registrar clique ou ajustar link dinamicamente
  const botao = document.getElementById('mascote-whatsapp');
  botao.addEventListener('click', () => {
    console.log('Usuário clicou para abrir o WhatsApp');
  });




