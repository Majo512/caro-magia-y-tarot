// Carrusel de fotos
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.carrusel-slide');
  const puntos = document.querySelectorAll('.punto');
  const btnPrev = document.querySelector('.carrusel-btn.prev');
  const btnNext = document.querySelector('.carrusel-btn.next');
  const contenedor = document.querySelector('.carrusel-contenedor');

  // SEGURO DE VIDA: Solo ejecuta el código si el carrusel existe en la página
  if (contenedor && slides.length > 0) {
    
    let indiceActual = 0;
    const totalSlides = slides.length;
    const INTERVALO = 5000; // cambia de foto cada 5 segundos
    let autoplay;

    function mostrarSlide(indice) {
      slides.forEach((s) => s.classList.remove('activo'));
      puntos.forEach((p) => p.classList.remove('activo'));

      slides[indice].classList.add('activo');
      if (puntos[indice]) puntos[indice].classList.add('activo');

      indiceActual = indice;
    }

    function siguiente() {
      mostrarSlide((indiceActual + 1) % totalSlides);
    }

    function anterior() {
      mostrarSlide((indiceActual - 1 + totalSlides) % totalSlides);
    }

    // Controles manuales
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        siguiente();
        reiniciarAutoplay();
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        anterior();
        reiniciarAutoplay();
      });
    }

    // Puntos indicadores
    puntos.forEach((punto, i) => {
      punto.addEventListener('click', () => {
        mostrarSlide(i);
        reiniciarAutoplay();
      });
    });

    // Autoplay
    function iniciarAutoplay() {
      autoplay = setInterval(siguiente, INTERVALO);
    }

    function reiniciarAutoplay() {
      clearInterval(autoplay);
      iniciarAutoplay();
    }

    // Pausar al pasar el mouse por encima
    contenedor.addEventListener('mouseenter', () => clearInterval(autoplay));
    contenedor.addEventListener('mouseleave', iniciarAutoplay);

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { siguiente(); reiniciarAutoplay(); }
      if (e.key === 'ArrowLeft')  { anterior(); reiniciarAutoplay(); }
    });

    // Iniciar
    mostrarSlide(0);
    iniciarAutoplay();
  }
});