document.addEventListener("DOMContentLoaded", () => {
  const loadButtons = document.querySelectorAll(".load-btn");
  const frames = document.querySelectorAll(".frame");
  const logList = document.getElementById("log-list");
  const pageQueue = []; // Fila para controlar a ordem das páginas carregadas

  loadButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.parentElement.getAttribute("data-page");
      loadPage(page);
    });
  });

  function loadPage(pageNumber) {
    if (pageQueue.length < frames.length) {
      // Se ainda há espaço, carrega a página
      const frameIndex = pageQueue.length;
      frames[frameIndex].textContent = "Página " + pageNumber;
      pageQueue.push(pageNumber); // Adiciona à fila
      logAction(`Carregou Página ${pageNumber} no Frame ${frameIndex + 1}`);
    } else {
      // Se não há espaço, substitui a página mais antiga (FIFO)
      const oldestPage = pageQueue.shift(); // Remove a página mais antiga
      const frameIndex = Array.from(frames).findIndex((frame) =>
        frame.textContent.includes(oldestPage)
      );
      frames[frameIndex].textContent = "Página " + pageNumber; // Carrega nova página
      pageQueue.push(pageNumber); // Adiciona nova página à fila
      logAction(
        `Substituiu Página ${oldestPage} por Página ${pageNumber} no Frame ${
          frameIndex + 1
        }`
      );
    }
  }

  function logAction(action) {
    const logEntry = document.createElement("li");
    logEntry.textContent = action;
    logList.appendChild(logEntry);
  }
});
