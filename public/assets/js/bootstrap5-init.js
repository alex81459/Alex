(function () {
  'use strict';

  function obtenerDestinoAncla(enlace) {
    if (!enlace.hash || enlace.hash === '#') return null;
    try {
      return document.querySelector(enlace.hash);
    } catch (_) {
      return null;
    }
  }

  function desplazarAlDestino(evento) {
    var destino = obtenerDestinoAncla(this);
    if (!destino) return;

    if (
      window.location.pathname.replace(/^\//, '') !== this.pathname.replace(/^\//, '') ||
      window.location.hostname !== this.hostname
    ) {
      return;
    }

    evento.preventDefault();
    var navegacion = document.getElementById('mainNav');
    var posicionDestino = destino.getBoundingClientRect().top + window.scrollY - (navegacion ? navegacion.offsetHeight + 16 : 16);
    window.scrollTo({ top: posicionDestino, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    destino.setAttribute('tabindex', '-1');
    destino.focus({ preventScroll: true });
  }

  function cerrarMenuNavegacion() {
    var elementoMenu = document.getElementById('navbarResponsive');
    if (!elementoMenu || typeof bootstrap === 'undefined') return;

    var menuDesplegable = bootstrap.Collapse.getOrCreateInstance(elementoMenu, { toggle: false });
    menuDesplegable.hide();
  }

  function actualizarTamanoNavegacion() {
    var navegacion = document.getElementById('mainNav');
    if (!navegacion) return;

    navegacion.classList.toggle('navbar-shrink', window.scrollY > 100);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var botonMenu = document.querySelector('.navbar-toggler');
    var menu = document.getElementById('navbarResponsive');
    if (menu && botonMenu) {
      menu.addEventListener('keydown', function (evento) {
        if (evento.key === 'Escape') {
          cerrarMenuNavegacion();
          botonMenu.focus();
        }
      });
    }
    document
      .querySelectorAll('a.js-scroll-trigger[href*="#"]:not([href="#"])')
      .forEach(function (enlace) {
        enlace.addEventListener('click', desplazarAlDestino);
        enlace.addEventListener('click', cerrarMenuNavegacion);
      });

    if (typeof bootstrap !== 'undefined') {
      new bootstrap.ScrollSpy(document.body, {
        target: '#mainNav',
        rootMargin: '0px 0px -56%',
      });
    }

    actualizarTamanoNavegacion();
    window.addEventListener('scroll', actualizarTamanoNavegacion, { passive: true });

    document.querySelectorAll('.portfolio-modal').forEach(function (modal) {
      modal.addEventListener('show.bs.modal', function () {
        document.querySelectorAll('.navbar').forEach(function (navegacion) {
          navegacion.classList.add('d-none');
        });
      });

      modal.addEventListener('hidden.bs.modal', function () {
        document.querySelectorAll('.navbar').forEach(function (navegacion) {
          navegacion.classList.remove('d-none');
        });
      });
    });

    document.querySelectorAll('[data-bs-hover-animate]').forEach(function (elemento) {
      var animacion = elemento.getAttribute('data-bs-hover-animate');
      elemento.addEventListener('mouseenter', function () {
        elemento.classList.add('animated', animacion);
      });
      elemento.addEventListener('mouseleave', function () {
        elemento.classList.remove('animated', animacion);
      });
    });
  });
})();
