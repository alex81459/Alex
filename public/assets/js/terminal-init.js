(function () {
  'use strict';

  var launcher = document.getElementById('terminal-launcher');
  var panel = document.getElementById('terminal-easteregg');
  var closeBtn = document.getElementById('terminal-egg-close');
  var output = document.getElementById('terminal-egg-output');
  var input = document.getElementById('terminal-egg-input');

  if (!launcher || !panel || !closeBtn || !output || !input) return;

  var PROMPT = 'alex@portfolio:~$';
  var history = [];
  var historyIndex = -1;

  var skills = [
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

  function scrollBottom() {
    output.scrollTop = output.scrollHeight;
  }

  function write(text) {
    var line = document.createElement('div');
    line.className = 'egg-line';
    line.textContent = text;
    output.appendChild(line);
    scrollBottom();
  }

  function writeHtml(html) {
    var line = document.createElement('div');
    line.className = 'egg-line';
    line.innerHTML = html;
    output.appendChild(line);
    scrollBottom();
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function echoCommand(raw) {
    writeHtml('<span class="egg-prompt">' + PROMPT + '</span> <span class="egg-cmd">' + escapeHtml(raw) + '</span>');
  }

  function skillsHtml() {
    return skills.map(function (skill) {
      var name = skill[0];
      var level = skill[1];
      var fill = new Array(level + 1).join('█');
      var empty = new Array(10 - level + 1).join('░');
      return name.padEnd(12, '\u00A0') + '<span class="egg-skill-fill">' + fill + '</span><span class="egg-skill-empty">' + empty + '</span>';
    }).join('\n');
  }

  function handleCommand(cmd) {
    switch (cmd) {
      case 'help':
        write('Comandos disponibles:\n  whoami      · quién soy\n  skills      · habilidades\n  projects    · proyectos destacados\n  experience  · trayectoria\n  contact     · contacto\n  cv          · abrir curriculum\n  clear       · limpiar pantalla');
        break;
      case 'whoami':
        write('Alex Salinas\nIngeniero de Software / TI');
        break;
      case 'skills':
        writeHtml(skillsHtml());
        break;
      case 'projects':
        write('Libro de Clases Digital    → Angular · Flask · MySQL\nTrámites Online (SIMPLE)   → Flask · ClaveÚnica\nConcejos Escolares         → Next.js · NestJS\nTareas y Proyectos         → Angular · Flask\nTrazabilidad Documental    → C# · Python · MySQL\nEtiquetado Industrial      → PLC · Raspberry Pi\nMonitoreo de Salud         → Python · Flask');
        break;
      case 'experience':
        write('2024 — actual   SLEP Colchagua · Ingeniero de Software\n2021 — 2024     Johnson Fruit · Encargado del Área TI\n2019 — 2021     Municipalidad de Chimbarongo · Prácticas\n2016 — 2021     Formación técnica y profesional');
        break;
      case 'contact':
        writeHtml('LinkedIn  <a class="egg-link" href="https://www.linkedin.com/in/alex-salinas-ponce-5276691a3" target="_blank" rel="noopener">linkedin.com/in/alex-salinas-ponce-5276691a3</a>\nGitHub    <a class="egg-link" href="https://github.com/alex81459" target="_blank" rel="noopener">github.com/alex81459</a>\nWeb       <a class="egg-link" href="https://alex81459.github.io/Alex" target="_blank" rel="noopener">alex81459.github.io/Alex</a>');
        break;
      case 'cv':
        window.open('assets/curriculum-v3-2026.pdf', '_blank', 'noopener');
        write('Abriendo curriculum-v3-2026.pdf…');
        break;
      case 'clear':
        output.innerHTML = '';
        break;
      default:
        write('comando no encontrado: ' + cmd + '\nEscribe "help" para ver los comandos disponibles.');
    }
  }

  function run(raw) {
    var cmd = raw.trim().toLowerCase();
    echoCommand(raw.trim());
    if (cmd) {
      history.push(raw.trim());
      historyIndex = history.length;
      handleCommand(cmd);
    }
    input.value = '';
    scrollBottom();
  }

  function openTerminal() {
    panel.hidden = false;
    launcher.setAttribute('aria-expanded', 'true');
    if (!output.childNodes.length) {
      write('Bienvenido a la terminal interactiva.');
      write('Escribe "help" para ver los comandos disponibles.');
    }
    window.setTimeout(function () {
      input.focus();
    }, 40);
  }

  function closeTerminal() {
    panel.hidden = true;
    launcher.setAttribute('aria-expanded', 'false');
  }

  launcher.addEventListener('click', function () {
    if (panel.hidden) {
      openTerminal();
    } else {
      closeTerminal();
    }
  });

  closeBtn.addEventListener('click', closeTerminal);

  input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      run(input.value);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (history.length && historyIndex > 0) {
        historyIndex -= 1;
        input.value = history[historyIndex];
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex += 1;
        input.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        input.value = '';
      }
    } else if (event.key === 'Escape') {
      closeTerminal();
    }
  });
})();
