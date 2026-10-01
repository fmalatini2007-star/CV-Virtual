document.addEventListener("DOMContentLoaded", () => {
  const langToggleBtn = document.getElementById("lang-toggle");
  const langLabel = document.getElementById("lang-label");
  const cvDownloadBtn = document.getElementById("cv-download");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  // Idioma por defecto: Español ('es')
  let currentLang = localStorage.getItem("lang") || "es";
  updateLanguage(currentLang);

  langToggleBtn.addEventListener("click", () => {
    currentLang = currentLang === "es" ? "en" : "es";
    localStorage.setItem("lang", currentLang);
    updateLanguage(currentLang);
  });

  function updateLanguage(lang) {
    // Cambiar etiquetas HTML con atributo data-i18n
    const elementsToTranslate = document.querySelectorAll("[data-i18n]");
    elementsToTranslate.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // Actualizar botón de idioma
    langLabel.textContent = lang === "es" ? "EN" : "ES";

    // Actualizar link de descarga del CV según idioma
    if (cvDownloadBtn) {
      cvDownloadBtn.href = lang === "es" 
        ? "assets/docs/CV_Espanol.pdf" 
        : "assets/docs/CV_English.pdf";
    }
  }

  // Toggle Menú Hamburguesa en Mobile
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }
});