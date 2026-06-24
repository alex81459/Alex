(function () {
  'use strict';

  function getTargetFromHash(link) {
    if (!link.hash || link.hash === '#') return null;
    try {
      return document.querySelector(link.hash);
    } catch (_) {
      return null;
    }
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
    var targetTop = target.getBoundingClientRect().top + window.scrollY - 54;
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
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

    nav.classList.toggle('navbar-shrink', window.scrollY > 100);
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

    document.querySelectorAll('[data-bs-hover-animate]').forEach(function (el) {
      var animation = el.getAttribute('data-bs-hover-animate');
      el.addEventListener('mouseenter', function () {
        el.classList.add('animated', animation);
      });
      el.addEventListener('mouseleave', function () {
        el.classList.remove('animated', animation);
      });
    });
  });
})();
