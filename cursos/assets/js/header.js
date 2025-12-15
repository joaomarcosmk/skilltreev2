/* Detecta automaticamente o caminho correto do header.html */
(function() {
    // Conta quantas barras existem no caminho da URL atual.
    // Quanto mais barras, mais profundo está o arquivo HTML.
    const depth = window.location.pathname.split("/").length - 2;

    // Gera o caminho correto: "../", "../../", "../../../", etc.
    const prefix = depth === 0 ? "" : "../".repeat(depth);

    const headerPath = prefix + "components/header.txt";

    fetch(headerPath)
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;
        })
        .catch(err => console.error("ERRO ao carregar header:", err, "PATH usado:", headerPath));
})();
