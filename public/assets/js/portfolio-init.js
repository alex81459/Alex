(function () {
  'use strict';

  var ultimaPosicionDesplazamiento = 0;
  var actualizacionPendiente = false;
  var posicionesSecciones = [];
  var secciones = [
    { selector: '#portfolio', etiqueta: 'Proyectos' },
    { selector: '#impacto', etiqueta: 'Impacto' },
    { selector: '#experiencia', etiqueta: 'Experiencia' },
    { selector: '#tech-stack', etiqueta: 'Tecnologías' },
    { selector: '#certifications', etiqueta: 'Certificados' },
    { selector: '#about', etiqueta: 'Sobre mí' },
    { selector: '#services', etiqueta: 'Servicios' },
    { selector: '#gallery', etiqueta: 'Galería' },
    { selector: '#contact', etiqueta: 'Contacto' }
  ];

  function seleccionarElemento(selector, raiz) {
    return (raiz || document).querySelector(selector);
  }

  function seleccionarElementos(selector, raiz) {
    return Array.prototype.slice.call((raiz || document).querySelectorAll(selector));
  }

  function configurarSelectorTema() {
    var claveAlmacenamiento = 'alex-theme';
    var raiz = document.documentElement;
    var selectorTema = seleccionarElemento('#theme-toggle');
    var metadatoTema = seleccionarElemento('meta[name="theme-color"]');

    function aplicarTema(tema) {
      raiz.setAttribute('data-theme', tema);
      if (selectorTema) {
        selectorTema.setAttribute('aria-pressed', tema === 'light' ? 'true' : 'false');
        selectorTema.setAttribute('title', tema === 'light' ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro');
        selectorTema.setAttribute('aria-label', tema === 'light' ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro');
      }
      if (metadatoTema) {
        metadatoTema.setAttribute('content', tema === 'light' ? '#eef6ff' : '#07111f');
      }
    }

    function obtenerTemaActual() {
      return raiz.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    }

    aplicarTema(obtenerTemaActual());

    if (!selectorTema) return;

    selectorTema.addEventListener('click', function () {
      var temaActual = obtenerTemaActual();
      var siguienteTema = temaActual === 'light' ? 'dark' : 'light';
      aplicarTema(siguienteTema);

      try {
        localStorage.setItem(claveAlmacenamiento, siguienteTema);
      } catch {}
    });
  }

  function guardarPosicionesSecciones() {
    posicionesSecciones = secciones.map(function (seccion) {
      return {
        selector: seccion.selector,
        etiqueta: seccion.etiqueta,
        posicionSuperior: obtenerPosicionSuperior(seccion.selector)
      };
    }).filter(function (seccion) {
      return seccion.posicionSuperior !== null;
    });
  }

  function obtenerPosicionSuperior(selector) {
    var elemento = seleccionarElemento(selector);
    return elemento ? elemento.getBoundingClientRect().top + window.scrollY : null;
  }

  function gestionarDesplazamiento() {
    var posicionDesplazamiento = ultimaPosicionDesplazamiento;

    var mostrarControles = posicionDesplazamiento > 100;
    var botonVolverArriba = seleccionarElemento('#scroll-to-top');
    var indicadorSeccion = seleccionarElemento('#section-indicator');
    var panelDesplazamiento = seleccionarElemento('#scroll-hud');
    if (botonVolverArriba) botonVolverArriba.classList.toggle('show', mostrarControles);
    if (indicadorSeccion) indicadorSeccion.classList.toggle('show', mostrarControles);
    if (panelDesplazamiento) panelDesplazamiento.classList.toggle('show', mostrarControles);

    actualizarProgresoDesplazamiento(posicionDesplazamiento);
    actualizacionPendiente = false;
  }

  function actualizarProgresoDesplazamiento(posicionDesplazamiento) {
    var indicadorSeccion = seleccionarElemento('#section-indicator');
    var valorSeccion = seleccionarElemento('#section-indicator-value');
    var etiquetaSeccion = seleccionarElemento('.section-indicator-label');
    var documento = document.documentElement;
    var desplazamientoMaximo = Math.max(documento.scrollHeight - window.innerHeight, 1);
    var progreso = Math.min(Math.max(posicionDesplazamiento / desplazamientoMaximo, 0), 1);
    var seccionActual = obtenerSeccionActual(posicionDesplazamiento);

    if (etiquetaSeccion) {
      etiquetaSeccion.textContent = seccionActual;
    }

    if (valorSeccion) {
      valorSeccion.textContent = Math.round(progreso * 100) + '%';
    }
  }

  function obtenerSeccionActual(posicionDesplazamiento) {
    if (!posicionesSecciones.length || posicionDesplazamiento < posicionesSecciones[0].posicionSuperior - 120) {
      return 'Inicio';
    }

    for (var indice = posicionesSecciones.length - 1; indice >= 0; indice -= 1) {
      if (posicionDesplazamiento >= posicionesSecciones[indice].posicionSuperior - 120) {
        return posicionesSecciones[indice].etiqueta;
      }
    }

    return 'Inicio';
  }

  function alternarCertificaciones() {
    var bloque = seleccionarElemento('#allCertsBlock');
    var boton = seleccionarElemento('#certToggleBtn');
    if (!bloque || !boton) return;

    if (bloque.style.display === 'none') {
      bloque.style.display = 'block';
      boton.setAttribute('aria-expanded', 'true');
      boton.innerHTML = '<i class="fa fa-minus-circle" aria-hidden="true"></i><span>Ocultar certificaciones</span>';
    } else {
      bloque.style.display = 'none';
      boton.setAttribute('aria-expanded', 'false');
      boton.innerHTML = '<i class="fa fa-plus-circle" aria-hidden="true"></i><span>Ver catálogo completo</span>';
    }
  }

  function configurarFiltrosPortafolio() {
    document.addEventListener('click', function (evento) {
      var boton = evento.target.closest('.filter-btn');
      if (!boton) return;

      var filtro = boton.dataset.filter;
      seleccionarElementos('.filter-btn').forEach(function (boton) {
        boton.classList.remove('active');
      });
      boton.classList.add('active');

      seleccionarElementos('.portfolio-item').forEach(function (elemento) {
        var debeMostrarse = filtro === '*' || elemento.matches(filtro);
        elemento.classList.toggle('filtered-out', !debeMostrarse);
      });
    });
  }

  function configurarVistasPreviasYoutube() {
    document.addEventListener('click', function (evento) {
      var vistaPrevia = evento.target.closest('.youtube-facade');
      if (!vistaPrevia) return;

      var identificador = vistaPrevia.dataset.yt;
      if (!identificador) return;

      var marcoVideo = document.createElement('iframe');
      marcoVideo.src = 'https://www.youtube.com/embed/' + identificador + '?autoplay=1&rel=0&modestbranding=1';
      marcoVideo.frameBorder = '0';
      marcoVideo.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      marcoVideo.allowFullscreen = true;
      vistaPrevia.replaceWith(marcoVideo);
    });
  }

  function configurarEventosDesplazamiento() {
    window.addEventListener('scroll', function () {
      ultimaPosicionDesplazamiento = window.scrollY;
      if (!actualizacionPendiente) {
        window.requestAnimationFrame(gestionarDesplazamiento);
        actualizacionPendiente = true;
      }
    }, { passive: true });

    var botonVolverArriba = seleccionarElemento('#scroll-to-top');
    if (botonVolverArriba) {
      botonVolverArriba.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      });
    }

    window.addEventListener('resize', function () {
      guardarPosicionesSecciones();
      ultimaPosicionDesplazamiento = window.scrollY;
      gestionarDesplazamiento();
    }, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', function () {
    window.alternarCertificaciones = alternarCertificaciones;
    guardarPosicionesSecciones();
    ultimaPosicionDesplazamiento = window.scrollY;
    gestionarDesplazamiento();
    configurarFiltrosPortafolio();
    configurarVistasPreviasYoutube();
    configurarSelectorTema();
    configurarEventosDesplazamiento();

  });
})();
