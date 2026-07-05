# Portafolio Web - Alex Salinas Ponce

Portafolio profesional interactivo de **Alex Salinas Ponce**, Ingeniero Informático especializado en desarrollo full stack, administración de infraestructura TI y gestión de proyectos tecnológicos.

**Sitio en vivo:** [alex81459.github.io/Alex](https://alex81459.github.io/Alex/)

---

## Descripción

Este es un portafolio web moderno que presenta:

- **Proyectos destacados**: Libro de Clases Digital, Trámites Online Institucional, Sistema de Tareas y Proyectos
- **Automatización Industrial**: Trazabilidad Documental, Sistema de Etiquetado Industrial
- **Galería de proyectos**: Con carrusel de proyectos y casos de éxito
- **Certificaciones**: Listado completo de certificaciones profesionales
- **Información de impacto**: Métricas de proyectos implementados
- **Sección de servicios**: Servicios profesionales disponibles
- **Stack tecnológico**: Tecnologías y herramientas dominadas

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
| **Framework** | Astro 5.0 |
| **Lenguaje** | TypeScript, HTML5, CSS3 |
| **UI Framework** | Bootstrap 5 |
| **Iconografía** | Font Awesome 5+ |
| **Build Tool** | Astro CLI |
| **Package Manager** | npm |
| **Hosting** | GitHub Pages |

---

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18.x o superior)
- **npm** (versión 9.x o superior)
- **Git** (para clonar el repositorio)

Para verificar las versiones instaladas:

```bash
node --version
npm --version
git --version
```

---

##Instalación

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
│   │   ├── Certificaciones.astro
│   │   ├── Contacto.astro
│   │   ├── Galeria.astro
│   │   ├── Hero.astro
│   │   ├── Impacto.astro
│   │   ├── Modales.astro
│   │   ├── Portafolio.astro
│   │   ├── Servicios.astro
│   │   └── TechStack.astro
│   ├── layouts/             # Layouts base
│   │   └── MainLayout.astro
│   └── pages/               # Páginas estáticas
│       └── index.astro
├── sections/                # Secciones HTML (referencia)
│   ├── acerca.html
│   ├── certificaciones.html
│   ├── contacto.html
│   ├── galeria.html
│   ├── hero.html
│   ├── impacto.html
│   ├── modales.html
│   ├── portafolio.html
│   ├── servicios.html
│   └── tech-stack.html
├── public/                  # Archivos estáticos públicos
│   ├── assets/
│   │   ├── bootstrap/       # Bootstrap CSS/JS
│   │   ├── css/             # Estilos CSS
│   │   ├── fonts/           # Fuentes
│   │   ├── img/             # Imágenes
│   │   └── js/              # Scripts
│   └── js/
├── assets/                  # Archivos de recursos
│   ├── bootstrap/
│   ├── css/
│   ├── fonts/
│   ├── img/
│   └── js/
├── dist/                    # Build de producción (generado)
├── node_modules/            # Dependencias npm (generado)
├── astro.config.mjs         # Configuración de Astro
├── tsconfig.json            # Configuración de TypeScript
├── package.json             # Dependencias y scripts
├── index.html               # HTML compilado (generado)
├── iniciador.sh             # Script de arranque (Linux/Mac)
├── iniciador.bat            # Script de arranque (Windows)
└── README.md                # Este archivo
```