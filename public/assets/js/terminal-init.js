(function () {
  'use strict';

  var botonTerminal = document.getElementById('terminal-launcher');
  var panel = document.getElementById('terminal-easteregg');
  var botonCerrar = document.getElementById('terminal-egg-close');
  var salida = document.getElementById('terminal-egg-output');
  var entrada = document.getElementById('terminal-egg-input');

  if (!botonTerminal || !panel || !botonCerrar || !salida || !entrada) return;

  var INDICADOR_TERMINAL = 'alex@portfolio:~$';
  var historial = [];
  var indiceHistorial = -1;

  var habilidades = [
    ['Angular', 9],
    ['Python', 8],
    ['Linux', 8],
    ['Docker', 8],
    ['MySQL', 8],
    ['Flask', 8],
    ['Node.js', 7],
    ['C#', 7],
    ['Nginx', 7],
  ];

  function desplazarAlFinal() {
    salida.scrollTop = salida.scrollHeight;
  }

  function escribir(texto) {
    var linea = document.createElement('div');
    linea.className = 'egg-line';
    linea.textContent = texto;
    salida.appendChild(linea);
    desplazarAlFinal();
  }

  function escribirHtml(html) {
    var linea = document.createElement('div');
    linea.className = 'egg-line';
    linea.innerHTML = html;
    salida.appendChild(linea);
    desplazarAlFinal();
  }

  function escaparHtml(cadena) {
    return cadena.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function mostrarComando(textoOriginal) {
    escribirHtml('<span class="egg-prompt">' + INDICADOR_TERMINAL + '</span> <span class="egg-cmd">' + escaparHtml(textoOriginal) + '</span>');
  }

  function generarHtmlHabilidades() {
    return habilidades.map(function (habilidad) {
      var nombre = habilidad[0];
      var nivel = habilidad[1];
      var relleno = new Array(nivel + 1).join('█');
      var vacio = new Array(10 - nivel + 1).join('░');
      return nombre.padEnd(12, '\u00A0') + '<span class="egg-skill-fill">' + relleno + '</span><span class="egg-skill-empty">' + vacio + '</span>';
    }).join('\n');
  }

  function procesarComando(comando) {
    switch (comando) {
      case 'help':
        escribir('Comandos disponibles:\n  whoami      · quién soy\n  skills      · habilidades\n  projects    · proyectos destacados\n  experience  · trayectoria\n  contact     · contacto\n  cv          · abrir curriculum\n  clear       · limpiar pantalla');
        break;
      case 'whoami':
        escribir('Alex Salinas\nIngeniero de Software / TI');
        break;
      case 'skills':
        escribirHtml(generarHtmlHabilidades());
        break;
      case 'projects':
        escribir('Libro de Clases Digital    → Angular · Flask · MySQL\nTrámites Online (SIMPLE)   → Flask · ClaveÚnica\nConcejos Escolares         → Next.js · NestJS\nTareas y Proyectos         → Angular · Flask\nTrazabilidad Documental    → C# · Python · MySQL\nEtiquetado Industrial      → PLC · Raspberry Pi\nMonitoreo de Salud         → Python · Flask');
        break;
      case 'experience':
        escribir('2024 — actual   SLEP Colchagua · Ingeniero de Software\n2021 — 2024     Johnson Fruit · Encargado del Área TI\n2019 — 2021     Municipalidad de Chimbarongo · Prácticas\n2016 — 2021     Formación técnica y profesional');
        break;
      case 'contact':
        escribirHtml('LinkedIn  <a class="egg-link" href="https://www.linkedin.com/in/alex-salinas-ponce-5276691a3" target="_blank" rel="noopener">linkedin.com/in/alex-salinas-ponce-5276691a3</a>\nGitHub    <a class="egg-link" href="https://github.com/alex81459" target="_blank" rel="noopener">github.com/alex81459</a>\nWeb       <a class="egg-link" href="https://alex81459.github.io/Alex" target="_blank" rel="noopener">alex81459.github.io/Alex</a>');
        break;
      case 'cv':
        window.open('assets/curriculum-v3-2026.pdf', '_blank', 'noopener');
        escribir('Abriendo curriculum-v3-2026.pdf…');
        break;
      case 'clear':
        salida.innerHTML = '';
        break;
      default:
        escribir('comando no encontrado: ' + comando + '\nEscribe "help" para ver los comandos disponibles.');
    }
  }

  function ejecutarComando(textoOriginal) {
    var comando = textoOriginal.trim().toLowerCase();
    mostrarComando(textoOriginal.trim());
    if (comando) {
      historial.push(textoOriginal.trim());
      indiceHistorial = historial.length;
      procesarComando(comando);
    }
    entrada.value = '';
    desplazarAlFinal();
  }

  function abrirTerminal() {
    panel.hidden = false;
    botonTerminal.setAttribute('aria-expanded', 'true');
    if (!salida.childNodes.length) {
      escribir('Bienvenido a la terminal interactiva.');
      escribir('Escribe "help" para ver los comandos disponibles.');
    }
    window.setTimeout(function () {
      entrada.focus();
    }, 40);
  }

  function cerrarTerminal() {
    panel.hidden = true;
    botonTerminal.setAttribute('aria-expanded', 'false');
  }

  botonTerminal.addEventListener('click', function () {
    if (panel.hidden) {
      abrirTerminal();
    } else {
      cerrarTerminal();
    }
  });

  botonCerrar.addEventListener('click', cerrarTerminal);

  entrada.addEventListener('keydown', function (evento) {
    if (evento.key === 'Enter') {
      evento.preventDefault();
      ejecutarComando(entrada.value);
    } else if (evento.key === 'ArrowUp') {
      evento.preventDefault();
      if (historial.length && indiceHistorial > 0) {
        indiceHistorial -= 1;
        entrada.value = historial[indiceHistorial];
      }
    } else if (evento.key === 'ArrowDown') {
      evento.preventDefault();
      if (indiceHistorial < historial.length - 1) {
        indiceHistorial += 1;
        entrada.value = historial[indiceHistorial];
      } else {
        indiceHistorial = historial.length;
        entrada.value = '';
      }
    } else if (evento.key === 'Escape') {
      cerrarTerminal();
    }
  });
})();
