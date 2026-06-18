(function () {
  'use strict';

  function getTargetFromHash(link) {
    if (!link.hash || link.hash === '#') return null;
    return document.querySelector(link.hash);
  }

  function scrollToTarget(event) {
    var target = getTargetFromHash(this);
    if (!target) return;

    if (
      window.location.pathname.replace(/^\//, '') !== this.pathname.replace(/^\//, '') ||
      window.location.hostname !== this.hostname
    ) {
      return;
    }

    event.preventDefault();
    $('html, body').animate(
      { scrollTop: $(target).offset().top - 54 },
      1000,
      'easeInOutExpo'
    );
  }

  function hideNavbarCollapse() {
    var collapseEl = document.getElementById('navbarResponsive');
    if (!collapseEl || typeof bootstrap === 'undefined') return;

    var collapse = bootstrap.Collapse.getOrCreateInstance(collapseEl, { toggle: false });
    collapse.hide();
  }

  function updateNavbarShrink() {
    var nav = document.getElementById('mainNav');
    if (!nav) return;

    if (window.scrollY > 100) {
      nav.classList.add('navbar-shrink');
    } else {
      nav.classList.remove('navbar-shrink');
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    document
      .querySelectorAll('a.js-scroll-trigger[href*="#"]:not([href="#"])')
      .forEach(function (link) {
        link.addEventListener('click', scrollToTarget);
        link.addEventListener('click', hideNavbarCollapse);
      });

    if (typeof bootstrap !== 'undefined') {
      new bootstrap.ScrollSpy(document.body, {
        target: '#mainNav',
        rootMargin: '0px 0px -56%',
      });
    }

    updateNavbarShrink();
    window.addEventListener('scroll', updateNavbarShrink, { passive: true });

    document.querySelectorAll('.portfolio-modal').forEach(function (modal) {
      modal.addEventListener('show.bs.modal', function () {
        document.querySelectorAll('.navbar').forEach(function (nav) {
          nav.classList.add('d-none');
        });
      });

      modal.addEventListener('hidden.bs.modal', function () {
        document.querySelectorAll('.navbar').forEach(function (nav) {
          nav.classList.remove('d-none');
        });
      });
    });

    $('[data-bs-hover-animate]').mouseenter(function () {
      var $el = $(this);
      $el.addClass('animated ' + $el.attr('data-bs-hover-animate'));
    }).mouseleave(function () {
      var $el = $(this);
      $el.removeClass('animated ' + $el.attr('data-bs-hover-animate'));
    });
  });
})();
