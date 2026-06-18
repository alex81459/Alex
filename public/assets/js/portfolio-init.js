let latestScrollTop = 0;
let isTicking = false;
let sectionOffsets = {};

$(document).ready(function () {
  AOS.init({ once: true, offset: 100 });
  cacheSectionOffsets();
  latestScrollTop = $(window).scrollTop();
  handleScroll();

  $('.portfolio-modal img').attr('loading', 'lazy');

  var impactoEl = document.getElementById('impacto');
  if (impactoEl) {
    if ('IntersectionObserver' in window) {
      var impactoObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateImpactoCounters();
            impactoObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
      impactoObs.observe(impactoEl);
    } else {
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
  }

  setTimeout(function () {
    $('#loading-overlay').addClass('hidden');
    setTimeout(function () {
      $('#loading-overlay').hide();
      startTypingAnimation();
    }, 500);
  }, 700);
});

function cacheSectionOffsets() {
  sectionOffsets = {
    impacto: $('#impacto').length ? $('#impacto').offset().top : null,
    services: $('#services').length ? $('#services').offset().top : null,
    techStack: $('#tech-stack').length ? $('#tech-stack').offset().top : null,
    skillsProgress: $('#skills-progress').length ? $('#skills-progress').offset().top : null,
    portfolio: $('#portfolio').length ? $('#portfolio').offset().top : null,
    gallery: $('#gallery').length ? $('#gallery').offset().top : null,
    about: $('#about').length ? $('#about').offset().top : null,
    contact: $('#contact').length ? $('#contact').offset().top : null
  };
}

function handleScroll() {
  const scrollTop = latestScrollTop;
  const rate = scrollTop * -0.15;
  $('.parallax-bg').css('transform', 'translate3d(0,' + rate + 'px,0)');

  if (scrollTop > 100) {
    $('#scroll-to-top').addClass('show');
    $('#breadcrumbs').addClass('show');
  } else {
    $('#scroll-to-top').removeClass('show');
    $('#breadcrumbs').removeClass('show');
  }

  if (sectionOffsets.skillsProgress !== null && scrollTop >= sectionOffsets.skillsProgress - 300) {
    if (!$('.progress-bar').first().hasClass('animate')) {
      animateProgressBars();
    }
  }

  let currentSection = 'Portfolio';
  if (sectionOffsets.impacto !== null && scrollTop < sectionOffsets.impacto - 100) {
    currentSection = 'Inicio';
  } else if (sectionOffsets.impacto !== null && sectionOffsets.services !== null && scrollTop >= sectionOffsets.impacto - 100 && scrollTop < sectionOffsets.services - 100) {
    currentSection = 'Impacto';
  } else if (sectionOffsets.services !== null && sectionOffsets.techStack !== null && scrollTop >= sectionOffsets.services - 100 && scrollTop < sectionOffsets.techStack - 100) {
    currentSection = 'Servicios';
  } else if (sectionOffsets.techStack !== null && sectionOffsets.skillsProgress !== null && scrollTop >= sectionOffsets.techStack - 100 && scrollTop < sectionOffsets.skillsProgress - 100) {
    currentSection = 'Stack Técnico';
  } else if (sectionOffsets.skillsProgress !== null && sectionOffsets.portfolio !== null && scrollTop >= sectionOffsets.skillsProgress - 100 && scrollTop < sectionOffsets.portfolio - 100) {
    currentSection = 'Nivel Expertise';
  } else if (sectionOffsets.portfolio !== null && sectionOffsets.gallery !== null && scrollTop >= sectionOffsets.portfolio - 100 && scrollTop < sectionOffsets.gallery - 100) {
    currentSection = 'Portafolio';
  } else if (sectionOffsets.gallery !== null && sectionOffsets.about !== null && scrollTop >= sectionOffsets.gallery - 100 && scrollTop < sectionOffsets.about - 100) {
    currentSection = 'Galería';
  } else if (sectionOffsets.about !== null && sectionOffsets.contact !== null && scrollTop >= sectionOffsets.about - 100 && scrollTop < sectionOffsets.contact - 100) {
    currentSection = 'Acerca De';
  } else if (sectionOffsets.contact !== null && scrollTop >= sectionOffsets.contact - 100) {
    currentSection = 'Contacto';
  }

  $('.breadcrumb-item.active').text(currentSection);
  isTicking = false;
}

function toggleAllCerts() {
  var block = document.getElementById('allCertsBlock');
  var btn = document.getElementById('certToggleBtn');
  if (block.style.display === 'none') {
    block.style.display = 'block';
    btn.innerHTML = '<i class="fa fa-minus-circle me-1"></i> Ocultar certificaciones';
  } else {
    block.style.display = 'none';
    btn.innerHTML = '<i class="fa fa-plus-circle me-1"></i> Ver todas las certificaciones';
  }
}

function startTypingAnimation() {
  const texts = [
    'Soy Alex Salinas Ponce.',
    'Desarrollo sistemas informáticos, APIs e infraestructura TI',
    'para digitalizar procesos y mejorar la operación de organizaciones.'
  ];
  const subtitle = 'Ingeniero TI y Desarrollador Full Stack<br>';

  let textIndex = 0;
  let charIndex = 0;
  let currentText = '';

  function typeText() {
    if (textIndex < texts.length) {
      if (charIndex <= texts[textIndex].length) {
        currentText = texts[textIndex].substring(0, charIndex);
        var previousText = texts.slice(0, textIndex).join('<br>');
        var terminalText = previousText ? previousText + '<br>' + currentText : currentText;
        $('#typing-text').html(terminalText + '<span class="typing-cursor"></span>');
        charIndex++;
        setTimeout(typeText, 28);
      } else {
        setTimeout(function () {
          textIndex++;
          charIndex = 0;
          if (textIndex >= texts.length) {
            $('#typing-text').html(texts.join('<br>') + '<span class="typing-cursor"></span>');
            setTimeout(typeSubtitle, 500);
          } else {
            setTimeout(typeText, 200);
          }
        }, 700);
      }
    }
  }

  function typeSubtitle() {
    $('.typing-cursor').remove();
    var $leadIn = $('.intro-lead-in');
    $leadIn.addClass('normal-mode');
    $('#typing-text').html(texts.join('<br>'));

    setTimeout(function () {
      $('#profile-photo-reveal').addClass('visible');
      $('#typing-subtitle').html(subtitle);
      $('#typing-subtitle').css({ opacity: '0', transform: 'translateY(15px)' });
      $('#typing-subtitle').animate({ opacity: 1 }, { duration: 600, step: function () {} });
      setTimeout(function () {
        $('#typing-subtitle').css({ opacity: '1', transform: 'translateY(0)', transition: 'all 0.6s ease' });
      }, 50);
    }, 900);
  }

  typeText();
}

function animateProgressBars() {
  $('.progress-bar').each(function () {
    const percentage = $(this).data('percentage');
    $(this).css('width', percentage + '%');
    $(this).addClass('animate');
  });
}

function animateImpactoCounters() {
  $('.impacto-number').each(function () {
    var $el = $(this);
    if ($el.hasClass('counted')) return;
    $el.addClass('counted');
    var target = parseInt($el.data('target'), 10);
    if (isNaN(target)) return;
    var duration = 1600;
    var frameRate = 16;
    var steps = duration / frameRate;
    var increment = target / steps;
    var current = 0;
    var isBig = target >= 1000;
    var timer = setInterval(function () {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      var display = isBig ? Math.floor(current).toLocaleString('es-CL') : Math.floor(current);
      $el.text(display);
    }, frameRate);
  });
}

$(window).on('scroll', function () {
  latestScrollTop = $(this).scrollTop();
  if (!isTicking) {
    window.requestAnimationFrame(handleScroll);
    isTicking = true;
  }
});

$('#scroll-to-top').click(function () {
  $('html, body').animate({ scrollTop: 0 }, 800);
  return false;
});

$(document).on('click', '.filter-btn', function () {
  var filter = $(this).data('filter');
  $('.filter-btn').removeClass('active');
  $(this).addClass('active');
  var $items;
  if (filter === '*') {
    $items = $('.portfolio-item');
  } else {
    $('.portfolio-item').addClass('filtered-out');
    $items = $('.portfolio-item' + filter);
  }
  $items.removeClass('filtered-out').css('animation', 'none');
  $items.find('[data-aos]').removeClass('aos-animate').addClass('aos-animate');
  setTimeout(function () {
    $items.css('animation', '');
    AOS.refresh();
  }, 10);
});

$(window).on('resize', function () {
  cacheSectionOffsets();
  latestScrollTop = $(this).scrollTop();
  handleScroll();
});

$(document).on('click', '.youtube-facade', function () {
  var id = $(this).data('yt');
  $(this).replaceWith(
    '<iframe src="https://www.youtube.com/embed/' + id +
    '?autoplay=1&rel=0&modestbranding=1" frameborder="0" ' +
    'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
  );
});
