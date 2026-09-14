# Portafolio Web - Alex Salinas Ponce

Portafolio profesional interactivo de **Alex Salinas Ponce**, Ingeniero de Software · Full Stack · Infraestructura & DevOps con experiencia en análisis, arquitectura, desarrollo, interoperabilidad, seguridad, despliegue y mantención de sistemas institucionales en operación.

**Sitio en vivo:** [alex81459.github.io/Alex](https://alex81459.github.io/Alex/)

**Website:** [https://alex81459.github.io/Alex/](https://alex81459.github.io/Alex/)

**Topics:** `web-development`, `full-stack`, `portfolio`, `astro`, `bootstrap5`, `typescript`, `frontend`, `backend`, `github-pages`, `responsive-design`

---

## Descripción

Portafolio web moderno, optimizado para rendimiento y SEO, que presenta experiencia en desarrollo de sistemas institucionales, interoperabilidad, documentación técnica e infraestructura tecnológica en operación.

### Expertise
- **Desarrollo Full Stack**: Aplicaciones web con Python, JavaScript, Angular, Flask y Node.js
- **Infraestructura TI**: Administración de sistemas, operación tecnológica y continuidad de servicios
- **Interoperabilidad**: Diseño e implementación de APIs, integraciones y contratos REST
- **Bases de Datos**: SQL, modelado y optimización de consultas
- **Documentación Técnica**: Arquitectura, seguridad, operación y soporte funcional de plataformas
- **DevOps**: Automatización, CI/CD y despliegue en GitHub Pages

### Proyectos Destacados
- **Libro de Clases Digital**: 7 establecimientos desplegados · 5 en operación activa, con expansión progresiva
- **Trámites Online Institucional**: 13 trámites implementados y 10.000+ gestiones realizadas en Plataforma SIMPLE
- **Sistema de Tareas y Proyectos**: Herramienta de gestión colaborativa
- **Trazabilidad Documental**: Sistema de automatización industrial
- **Evaluaciones Online**: Plataforma centralizada de evaluaciones

### Secciones Incluidas
- Portada con arquitectura interactiva: Angular, REST, Flask/NestJS, datos, Docker, Nginx y producción
- Caso destacado del Libro de Clases Digital, enlazado a su modal original
- Experiencia profesional y formación separadas de la presentación personal
- Galería interactiva con carrusel de proyectos
- Modales informativos con detalles de cada proyecto
- Certificaciones profesionales verificadas
- Métricas de impacto de proyectos implementados
- Documentación técnica y funcional como capacidad destacada
- Stack tecnológico con herramientas dominadas
- Información de contacto y redes sociales
- Terminal interactiva para explorar el perfil
- Política de privacidad independiente y aviso de privacidad persistente

### Portada y navegación

`Hero.astro` concentra la presentación, el CV, las redes y las tres métricas principales. `StatsBand.astro` muestra las cifras dentro del hero y anima su primera aparición. `Arquitectura.astro` contiene los nodos, sus descripciones y los enlaces a proyectos: funcionan con cursor, toque, Tab y teclas de dirección. Sus estados son ilustrativos, no telemetría de los servicios.

El diagrama incluye Angular, React, Astro y Next.js en la interfaz, y Flask, NestJS, .NET Core y Prisma en el servidor. Cada conexión tiene dos vías paralelas con puertos independientes: envío en celeste y recepción en violeta. El flujo continuo utiliza SVG y CSS, también en móvil. Se puede pausar manualmente; además, se detiene cuando el diagrama queda fuera de pantalla o la pestaña está oculta, y respeta la preferencia de movimiento reducido.

`ProyectoDestacado.astro` abre la sección `#portfolio`. La trayectoria completa se conserva en `Experiencia.astro` (`#experiencia`) y `Acerca.astro` mantiene `#about`. Servicios, galería, certificaciones, modales y terminal interactiva siguen disponibles. El resumen para reclutadores se integró en el hero para evitar duplicaciones.

La portada usa CSS y pequeños scripts compilados por Astro, sin dependencias de animación. Respeta `prefers-reduced-motion`, conserva contenido y cifras sin JavaScript y reutiliza el selector de tema con la clave `alex-theme`. El despliegue continúa siendo estático bajo `/Alex/` en GitHub Pages.

### Componentes principales

| Componente | Responsabilidad |
|-----------|-----------------|
| `Hero.astro` | Presentación, enlaces profesionales, CV y métricas principales. |
| `Arquitectura.astro` | Diagrama interactivo de la arquitectura y tecnologías de las soluciones. |
| `StatsBand.astro` | Banda de métricas animada dentro de la portada. |
| `ProyectoDestacado.astro` | Caso principal: Libro de Clases Digital. |
| `Portafolio.astro` y `Modales.astro` | Catálogo de proyectos y sus fichas detalladas. |
| `Experiencia.astro`, `Impacto.astro` y `Certificaciones.astro` | Trayectoria, resultados profesionales y certificaciones. |
| `TechStack.astro`, `Servicios.astro` y `Acerca.astro` | Tecnologías, capacidades y perfil profesional. |
| `Galeria.astro`, `Contacto.astro` y `Terminal.astro` | Recursos visuales, canales de contacto y exploración interactiva. |
| `MainLayout.astro` | Metadatos SEO, navegación, selector de tema, aviso de privacidad y elementos globales. |

---

## Características

-  Diseño responsivo y moderno
-  Carrusel interactivo de galería
-  Modales informativos para proyectos
-  Animaciones y efectos visuales
-  Optimizado para móviles y desktop
-  SEO optimizado
-  Compresión de HTML
-  Imágenes en formato WebP
-  Bootstrap 5 integrado
-  Font Awesome para iconografía

---

## Tecnologías

| Categoría | Tecnologías |
|-----------|------------|
| **Framework** | Astro 7.1.3 |
| **Lenguaje** | TypeScript, HTML5, CSS3 |
| **UI Framework** | Bootstrap 5 |
| **Iconografía** | Font Awesome 5+ |
| **Build Tool** | Astro CLI |
| **Package Manager** | npm |
| **Hosting** | GitHub Pages |

---

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 22.12.0 o superior)
- **npm** (versión 9.6.5 o superior)
- **Git** (para clonar el repositorio)

Para verificar las versiones instaladas:

```bash
node --version
npm --version
git --version
```

---

## Instalación

### Opción 1: Usando el script de arranque (Recomendado para Linux/Mac)

```bash
chmod +x iniciador.sh
./iniciador.sh
```

### Opción 2: Instalación manual

1. **Clonar o descargar el repositorio:**

```bash
git clone https://github.com/alex81459/Alex.git
cd Alex
```

2. **Instalar dependencias:**

```bash
npm install
```

---

## Arranque del Proyecto

### Opción 1: Script automático

**Para Linux/Mac:**
```bash
./iniciador.sh
```

**Para Windows:**
```bash
iniciador.bat
```

### Opción 2: Comando npm directo

```bash
npm run dev
```

El servidor estará disponible en: **http://localhost:1212/Alex/**

---

## Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de la build de producción
npm run preview

# Ejecutar comando Astro directamente
npm run astro -- <comando>
```

### Opciones adicionales para npm run dev:

```bash
# Ejecutar en host específico y puerto
npm run dev -- --host 0.0.0.0 --port 3000

# Especificar port diferente
npm run dev -- --port 5173
```

---

## Estructura del Proyecto

```
Alex/
├── src/
│   ├── components/          # Componentes Astro reutilizables
│   │   ├── Acerca.astro
│   │   ├── Arquitectura.astro
│   │   ├── Certificaciones.astro
│   │   ├── Contacto.astro
│   │   ├── Experiencia.astro
│   │   ├── Galeria.astro
│   │   ├── Hero.astro
│   │   ├── Impacto.astro
│   │   ├── Modales.astro
│   │   ├── Portafolio.astro
│   │   ├── ProyectoDestacado.astro
│   │   ├── Servicios.astro
│   │   ├── StatsBand.astro
│   │   ├── TechStack.astro
│   │   └── Terminal.astro
│   ├── layouts/             # Layouts base
│   │   └── MainLayout.astro
│   └── pages/               # Páginas estáticas
│       ├── index.astro
│       └── privacidad.astro
├── public/                  # Archivos estáticos públicos
│   ├── assets/
│   │   ├── css/             # Estilos CSS
│   │   ├── fonts/           # Fuentes Font Awesome
│   │   ├── img/             # Imágenes y PDFs
│   │   └── js/              # Scripts
│   ├── robots.txt
│   └── sitemap.xml
├── dist/                    # Build de producción (generado)
├── node_modules/            # Dependencias npm (generado)
├── astro.config.mjs         # Configuración de Astro
├── tsconfig.json            # Configuración de TypeScript
├── package.json             # Dependencias y scripts
├── iniciador.sh             # Script de arranque (Linux/Mac)
├── iniciador.bat            # Script de arranque (Windows)
└── README.md                # Este archivo
```
