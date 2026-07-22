(function () {
  'use strict';

  var latestScrollTop = 0;
  var isTicking = false;
  var sectionOffsets = [];
  var sections = [
    { selector: '#impacto', label: 'Impacto' },
    { selector: '#portfolio', label: 'Portafolio' },
    { selector: '#services', label: 'Servicios' },
    { selector: '#tech-stack', label: 'Stack' },
    { selector: '#certifications', label: 'Certificados' },
    { selector: '#about', label: 'Acerca de' },
    { selector: '#gallery', label: 'Galeria' },
    { selector: '#contact', label: 'Contacto' }
  ];

  function qs(selector, root) {
    return (root || document).querySelector(selector);
  }

  function qsa(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function cacheSectionOffsets() {
    sectionOffsets = sections.map(function (section) {
      return {
        selector: section.selector,
        label: section.label,
        top: getOffsetTop(section.selector)
      };
    }).filter(function (section) {
      return section.top !== null;
    });
  }

  function getOffsetTop(selector) {
    var el = qs(selector);
    return el ? el.getBoundingClientRect().top + window.scrollY : null;
  }

  function handleScroll() {
    var scrollTop = latestScrollTop;
    var parallaxBg = qs('.parallax-bg');
    if (parallaxBg) {
      parallaxBg.style.transform = 'translate3d(0,' + scrollTop * -0.15 + 'px,0)';
    }

    var showControls = scrollTop > 100;
    var scrollToTop = qs('#scroll-to-top');
    var sectionIndicator = qs('#section-indicator');
    var scrollHud = qs('#scroll-hud');
    if (scrollToTop) scrollToTop.classList.toggle('show', showControls);
    if (sectionIndicator) sectionIndicator.classList.toggle('show', showControls);
    if (scrollHud) scrollHud.classList.toggle('show', showControls);

    updateScrollProgress(scrollTop);
    isTicking = false;
  }

  function updateScrollProgress(scrollTop) {
    var sectionIndicator = qs('#section-indicator');
    var sectionValue = qs('#section-indicator-value');
    var sectionLabel = qs('.section-indicator-label');
    var doc = document.documentElement;
    var maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1);
    var progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
    var currentSection = getCurrentSection(scrollTop);

    if (sectionLabel) {
      sectionLabel.textContent = currentSection;
    }

    if (sectionValue) {
      sectionValue.textContent = Math.round(progress * 100) + '%';
    }
  }

  function getCurrentSection(scrollTop) {
    if (!sectionOffsets.length || scrollTop < sectionOffsets[0].top - 120) {
      return 'Inicio';
    }

    for (var i = sectionOffsets.length - 1; i >= 0; i -= 1) {
      if (scrollTop >= sectionOffsets[i].top - 120) {
        return sectionOffsets[i].label;
      }
    }

    return 'Inicio';
  }

  function toggleAllCerts() {
    var block = qs('#allCertsBlock');
    var btn = qs('#certToggleBtn');
    if (!block || !btn) return;

    if (block.style.display === 'none') {
      block.style.display = 'block';
      btn.innerHTML = '<i class="fa fa-minus-circle me-1"></i> Ocultar certificaciones';
    } else {
      block.style.display = 'none';
      btn.innerHTML = '<i class="fa fa-plus-circle me-1"></i> Ver todas las certificaciones';
    }
  }

  function startTypingAnimation() {
    var typingText = qs('#typing-text');
    var typingSubtitle = qs('#typing-subtitle');
    if (!typingText || !typingSubtitle) return;

    // Respetar prefers-reduced-motion
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var texts = [
      'Soy Alex Salinas Ponce, Desarrollador Full Stack.',
      'Desarrollo sistemas, APIs e infraestructura tecnológica para instituciones y empresas que necesitan digitalizar procesos y operar mejor.',
      'Combino desarrollo web, bases de datos, servidores, automatización e integración de sistemas para resolver necesidades reales.'
    ];
    var subtitle = 'Desarrollador Full Stack<br>';
    
    // Si el usuario prefiere menos movimiento, mostrar todo inmediatamente
    if (prefersReducedMotion) {
      typingText.innerHTML = texts.join('<br>');
      var leadIn = qs('.intro-lead-in');
      var profile = qs('#profile-photo-reveal');
      if (leadIn) leadIn.classList.add('normal-mode');
      if (profile) profile.classList.add('visible');
      typingSubtitle.innerHTML = subtitle;
      typingSubtitle.style.opacity = '1';
      typingSubtitle.style.transform = 'translateY(0)';
      return;
    }

    var textIndex = 0;
    var charIndex = 0;

    function typeText() {
      if (textIndex >= texts.length) return;

      if (charIndex <= texts[textIndex].length) {
        var currentText = texts[textIndex].substring(0, charIndex);
        var previousText = texts.slice(0, textIndex).join('<br>');
        var terminalText = previousText ? previousText + '<br>' + currentText : currentText;
        typingText.innerHTML = terminalText + '<span class="typing-cursor"></span>';
        charIndex += 1;
        window.setTimeout(typeText, 16);
        return;
      }

      window.setTimeout(function () {
        textIndex += 1;
        charIndex = 0;
        if (textIndex >= texts.length) {
          typingText.innerHTML = texts.join('<br>') + '<span class="typing-cursor"></span>';
          window.setTimeout(typeSubtitle, 250);
        } else {
          window.setTimeout(typeText, 100);
        }
      }, 300);
    }

    function typeSubtitle() {
      qsa('.typing-cursor').forEach(function (cursor) {
        cursor.remove();
      });

      var leadIn = qs('.intro-lead-in');
      var profile = qs('#profile-photo-reveal');
      if (leadIn) leadIn.classList.add('normal-mode');
      typingText.innerHTML = texts.join('<br>');

      window.setTimeout(function () {
        if (profile) profile.classList.add('visible');
        typingSubtitle.innerHTML = subtitle;
        typingSubtitle.style.opacity = '1';
        typingSubtitle.style.transform = 'translateY(0)';
        typingSubtitle.style.transition = 'all 0.6s ease';
      }, 400);
    }

    typeText();
  }

  function animateImpactoCounters() {
    qsa('.impacto-number').forEach(function (el) {
      if (el.classList.contains('counted')) return;
      el.classList.add('counted');

      var target = parseInt(el.dataset.target, 10);
      if (Number.isNaN(target)) return;

      var duration = 1600;
      var frameRate = 16;
      var steps = duration / frameRate;
      var increment = target / steps;
      var current = 0;
      var isBig = target >= 1000;
      var timer = window.setInterval(function () {
        current += increment;
        if (current >= target) {
          current = target;
          window.clearInterval(timer);
        }
        el.textContent = isBig ? Math.floor(current).toLocaleString('es-CL') : Math.floor(current);
      }, frameRate);
    });
  }

  function observeImpactoCounters() {
    var impactoEl = qs('#impacto');
    if (!impactoEl) return;

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateImpactoCounters();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
      observer.observe(impactoEl);
      return;
    }

    function checkImpactoVisible() {
      var rect = impactoEl.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        animateImpactoCounters();
        window.removeEventListener('scroll', checkImpactoVisible);
      }
    }
    window.addEventListener('scroll', checkImpactoVisible, { passive: true });
    checkImpactoVisible();
  }

  function setupPortfolioFilters() {
    document.addEventListener('click', function (event) {
      var button = event.target.closest('.filter-btn');
      if (!button) return;

      var filter = button.dataset.filter;
      qsa('.filter-btn').forEach(function (btn) {
        btn.classList.remove('active');
      });
      button.classList.add('active');

      qsa('.portfolio-item').forEach(function (item) {
        var shouldShow = filter === '*' || item.matches(filter);
        item.classList.toggle('filtered-out', !shouldShow);
      });
    });
  }

  function setupYoutubeFacades() {
    document.addEventListener('click', function (event) {
      var facade = event.target.closest('.youtube-facade');
      if (!facade) return;

      var id = facade.dataset.yt;
      if (!id) return;

      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1';
      iframe.frameBorder = '0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      facade.replaceWith(iframe);
    });
  }

  function setupScrollHandlers() {
    window.addEventListener('scroll', function () {
      latestScrollTop = window.scrollY;
      if (!isTicking) {
        window.requestAnimationFrame(handleScroll);
        isTicking = true;
      }
    }, { passive: true });

    var scrollToTop = qs('#scroll-to-top');
    if (scrollToTop) {
      scrollToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    window.addEventListener('resize', function () {
      cacheSectionOffsets();
      latestScrollTop = window.scrollY;
      handleScroll();
    }, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Nota: loading="lazy" ahora está configurado directamente en HTML para las imágenes de modales
    // qsa('.portfolio-modal img').forEach(function (img) {
    //   img.loading = 'lazy';
    // });

    window.toggleAllCerts = toggleAllCerts;
    cacheSectionOffsets();
    latestScrollTop = window.scrollY;
    handleScroll();
    observeImpactoCounters();
    setupPortfolioFilters();
    setupYoutubeFacades();
    setupScrollHandlers();

    window.setTimeout(function () {
      var overlay = qs('#loading-overlay');
      if (overlay) {
        overlay.classList.add('hidden');
        window.setTimeout(function () {
          overlay.style.display = 'none';
          startTypingAnimation();
        }, 500);
      } else {
        startTypingAnimation();
      }
    }, 700);
  });
})();
