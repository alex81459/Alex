# Migración a Astro - Guía Completa

## 📋 Tabla de Contenidos
1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Análisis de la Estructura Actual](#análisis-de-la-estructura-actual)
3. [Por Qué Astro](#por-qué-astro)
4. [Estructura de Carpetas Astro](#estructura-de-carpetas-astro)
5. [Guía Paso a Paso](#guía-paso-a-paso)
6. [Migración de Componentes](#migración-de-componentes)
7. [Configuración Necesaria](#configuración-necesaria)
8. [Deploy](#deploy)
9. [Checklist de Migración](#checklist-de-migración)
10. [Preguntas Frecuentes](#preguntas-frecuentes)

---

## Resumen Ejecutivo

**Situación Actual:**
- Portafolio personal construido con HTML5 + Bootstrap + jQuery
- Contenido separado en 10 archivos HTML bajo `/sections/`
- Carga dinámica via `$.get()` desde JavaScript
- ❌ Problema: Contenido no está en HTML inicial → Impacto negativo en SEO

**Solución Propuesta:**
- Migrar a **Astro** (Static Site Generator)
- Convertir secciones a componentes `.astro`
- Generar HTML estático prerrenderizado
- ✅ Beneficio: SEO perfecto + Rendimiento ultrarrápido + Mantenibilidad mejorada

**Estimación de Esfuerzo:**
- ⏱️ **1-2 días** (trabajo completo)
- 📊 **Complejidad: Media** (contenido está bien estructurado)

---

## Análisis de la Estructura Actual

### Árbol de Proyecto
```
Alex/
├── index.html                    # Página principal (carga dinámicamente)
├── favicon.png
├── assets/
│   ├── bootstrap/
│   │   ├── css/bootstrap.min.css
│   │   └── js/bootstrap.min.js
│   ├── css/
│   │   ├── bootstrap.min.css
│   │   ├── custom-styles.css
│   │   ├── estilos-modificados.css
│   │   ├── modales.css
│   │   ├── responsivo.css
│   │   ├── servicios.css
│   │   ├── tech-stack.css
│   │   ├── variables-base.css
│   │   └── ... (11 archivos CSS en total)
│   ├── fonts/
│   │   ├── font-awesome.min.css
│   │   ├── fontawesome-all.min.css
│   │   └── fontawesome5-overrides.min.css
│   ├── img/
│   │   ├── (imágenes del portafolio)
│   │   └── album/nuevas/ (galería)
│   └── js/
│       ├── jquery.min.js
│       ├── script.min.js
│       └── popper.min.js
├── js/
│   ├── jquery-3.3.1.min.js
│   └── popper.min.js
└── sections/                     # ⭐ Archivos a migrar
    ├── hero.html                 # Hero/Banner inicial
    ├── impacto.html              # Sección impacto con contadores
    ├── servicios.html            # Servicios ofrecidos
    ├── tech-stack.html           # Stack tecnológico
    ├── certificaciones.html      # Certificaciones
    ├── portafolio.html           # Proyectos destacados
    ├── galeria.html              # Galería de imágenes
    ├── acerca.html               # Timeline de experiencia
    ├── contacto.html             # Formulario de contacto
    └── modales.html              # Modales de proyectos
```

### Flujo de Carga Actual
```
index.html carga
    ↓
script.min.js ejecuta
    ↓
$.get() solicita cada sección desde /sections/
    ↓
Se inyecta HTML en divs (#wrap-hero, #wrap-impacto, etc.)
    ↓
AOS.init(), animaciones y event listeners inicializan
```

### Problemas Identificados
| Problema | Impacto | Severidad |
|----------|--------|-----------|
| Contenido cargado dinámicamente | No indexable por buscadores | 🔴 CRÍTICO |
| 10 peticiones HTTP adicionales | Latencia inicial | 🟡 MEDIA |
| jQuery para lógica simple | Peso innecesario | 🟡 MEDIA |
| Metadata no incluye meta tags para secciones | Compartir en redes es genérico | 🟡 MEDIA |

---

## Por Qué Astro

### Comparación de Opciones

| Criterio | Astro | Next.js | Angular | HTML Estático |
|----------|-------|---------|---------|---|
| **SEO out-of-box** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Performance** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **JavaScript enviado** | 📍 0KB | 📊 Mucho | 📊 Mucho | 📍 0KB |
| **Curva aprendizaje** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Build time** | ⚡ Rápido | ⚡ Rápido | 🐢 Lento | ⚡ Muy rápido |
| **Deploy gratuito** | ✅ Netlify/Vercel | ✅ Vercel | ⚠️ Complejo | ✅ Netlify/GitHub Pages |
| **Mantenibilidad** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |

### Beneficios Concretos de Astro

✅ **HTML estático prerrenderizado**
  - SEO perfecto
  - Cero JavaScript innecesario
  - Carga instantánea

✅ **Islas de Interactividad**
  - Puedes agregar React/Vue solo donde lo necesites
  - El resto es HTML estático

✅ **Componentes Reutilizables**
  - `.astro` components (sin JavaScript)
  - Mejor organización que HTML suelto

✅ **Integración con CMS**
  - Strapi, Contentful, Sanity, etc. (opcional, para futuro)

✅ **Migraciones Simples**
  - Tu contenido ya está separado
  - Astro entiende HTML tal cual

---

## Estructura de Carpetas Astro

### Nueva Estructura Propuesta
```
astro-portfolio/
├── src/
│   ├── layouts/
│   │   └── MainLayout.astro         # Layout principal
│   ├── components/
│   │   ├── Hero.astro               # Sección hero
│   │   ├── Impacto.astro            # Sección impacto
│   │   ├── Servicios.astro          # Sección servicios
│   │   ├── TechStack.astro          # Sección tech-stack
│   │   ├── Certificaciones.astro    # Sección certificaciones
│   │   ├── Portafolio.astro         # Sección portafolio
│   │   ├── Galeria.astro            # Sección galería
│   │   ├── Acerca.astro             # Sección acerca
│   │   ├── Contacto.astro           # Sección contacto
│   │   ├── Modales.astro            # Componentes modales
│   │   ├── Navbar.astro             # Barra navegación
│   │   ├── Breadcrumbs.astro        # Breadcrumbs
│   │   └── Footer.astro             # Pie de página (opcional)
│   ├── pages/
│   │   └── index.astro              # Página principal
│   ├── styles/
│   │   ├── globals.css              # Estilos globales
│   │   ├── variables.css            # Variables CSS
│   │   └── components.css           # Estilos de componentes
│   └── data/
│       ├── projects.json            # Datos de proyectos
│       ├── skills.json              # Stack tecnológico
│       └── experiences.json         # Timeline de experiencia
├── public/
│   ├── favicon.png
│   ├── assets/
│   │   ├── img/                     # Imágenes (copiar desde actual)
│   │   └── fonts/                   # Fuentes (copiar desde actual)
├── astro.config.mjs                 # Configuración Astro
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

---

## Guía Paso a Paso

### ⏱️ Fase 1: Preparación (15-30 minutos)

#### 1.1 Crear nuevo proyecto Astro
```bash
npm create astro@latest astro-portfolio -- --template minimal
cd astro-portfolio
```

#### 1.2 Instalar dependencias necesarias
```bash
npm install bootstrap@5
npm install aos  # Animate On Scroll
npm install @astrojs/partytown  # Para scripts de terceros (opcional)
```

#### 1.3 Copiar archivos estáticos
```bash
# Copiar todo desde assets/ y img/ del proyecto actual a public/
cp -r ../Alex/assets/img public/assets/img
cp -r ../Alex/assets/fonts public/assets/fonts
cp ../Alex/favicon.png public/
```

---

### ⏱️ Fase 2: Crear Layout Principal (30 minutos)

#### 2.1 `src/layouts/MainLayout.astro`
```astro
---
import '../styles/globals.css';
import Navbar from '../components/Navbar.astro';
import Breadcrumbs from '../components/Breadcrumbs.astro';
import ScrollToTop from '../components/ScrollToTop.astro';

interface Props {
  title: string;
  description: string;
}

const { title = "Alex Salinas Ponce", description = "Ingeniero Informático | Desarrollador Full Stack" } = Astro.props;
---

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <meta name="description" content={description}>
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#0D161F">
    <meta property="og:title" content={title}>
    <meta property="og:description" content={description}>
    <meta property="og:type" content="website">
    <link rel="shortcut icon" href="/favicon.png">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet">
    
    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.1.1/aos.css">
</head>
<body id="page-top">
    <Navbar />
    <Breadcrumbs />
    <ScrollToTop />
    
    <slot />
    
    <!-- Scripts -->
    <script is:inline src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script is:inline src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.6/umd/popper.min.js"></script>
    <script is:inline src="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/js/bootstrap.bundle.min.js"></script>
    <script is:inline src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js"></script>
    <script is:inline src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.1.1/aos.js"></script>
    
    <script is:inline>
        // Inicializar AOS
        document.addEventListener('astro:page-load', () => {
            AOS.init({ once: true, offset: 100 });
        });
    </script>
</body>
</html>
```

---

### ⏱️ Fase 3: Crear Componentes Base (1 hora)

#### 3.1 `src/components/Navbar.astro`
```astro
---
// Navbar component
---
<nav class="navbar navbar-dark navbar-expand-lg fixed-top bg-dark" id="mainNav">
    <div class="container">
        <a class="navbar-brand flash animated" href="#page-top">Alex Salinas Ponce</a>
        <button 
            class="navbar-toggler wobble animated" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarResponsive" 
            aria-controls="navbarResponsive" 
            aria-expanded="false" 
            aria-label="Toggle navigation">
            <i class="fa fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="nav navbar-nav text-uppercase flex-lg-row ms-auto">
                <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#services">SERVICIOS</a></li>
                <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#tech-stack">STACK</a></li>
                <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#certifications">CERTIFICADOS</a></li>
                <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#portfolio">PORTAFOLIO</a></li>
                <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#gallery">GALERÍA</a></li>
                <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#about">ACERCA DE</a></li>
                <li class="nav-item"><a class="nav-link js-scroll-trigger text-warning fw-bold" href="#contact">CONTACTO</a></li>
            </ul>
        </div>
    </div>
</nav>
```

#### 3.2 `src/components/Breadcrumbs.astro`
```astro
---
// Breadcrumbs component
---
<nav id="breadcrumbs" class="breadcrumbs-nav" aria-label="breadcrumb">
    <div class="container">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#page-top">Inicio</a></li>
            <li class="breadcrumb-item active" aria-current="page">Inicio</li>
        </ol>
    </div>
</nav>
```

#### 3.3 `src/components/ScrollToTop.astro`
```astro
---
// Scroll to top button
---
<button id="scroll-to-top" class="scroll-to-top-btn" aria-label="Volver arriba">
    <i class="fa fa-chevron-up"></i>
</button>
```

---

### ⏱️ Fase 4: Convertir Secciones (2-3 horas)

Para cada archivo en `/sections/`, crear un componente `.astro` correspondiente:

#### 4.1 `src/components/Hero.astro`
```astro
---
// Copiar el contenido HTML de sections/hero.html
// Eliminar atributos dinamicos como data-aos si no es necesario
// Usar sintaxis Astro donde sea posible
---
<!-- Contenido del hero aquí -->
```

#### Patrón General para Convertir HTML → Astro

**Archivo original:** `sections/impacto.html`
```html
<section id="impacto" class="impacto-section">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 text-center">
                <h2 class="text-uppercase">Impacto</h2>
                <!-- ... más contenido ... -->
            </div>
        </div>
    </div>
</section>
```

**Componente Astro:** `src/components/Impacto.astro`
```astro
---
// JavaScript/Lógica aquí (si es necesaria)
const stats = [
    { label: "Proyectos Completados", value: 15 },
    { label: "Usuarios Impactados", value: 500 },
    // ...
];
---

<section id="impacto" class="impacto-section">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 text-center">
                <h2 class="text-uppercase">Impacto</h2>
                {stats.map(stat => (
                    <div class="stat-item">
                        <span class="stat-value" data-target={stat.value}>0</span>
                        <p class="stat-label">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
</section>
```

#### 4.2 Checklist de Componentes a Crear
- [ ] Hero.astro
- [ ] Impacto.astro
- [ ] Servicios.astro
- [ ] TechStack.astro
- [ ] Certificaciones.astro
- [ ] Portafolio.astro
- [ ] Galeria.astro
- [ ] Acerca.astro
- [ ] Contacto.astro
- [ ] Modales.astro

---

### ⏱️ Fase 5: Página Principal (30 minutos)

#### 5.1 `src/pages/index.astro`
```astro
---
import MainLayout from '../layouts/MainLayout.astro';
import Hero from '../components/Hero.astro';
import Impacto from '../components/Impacto.astro';
import Servicios from '../components/Servicios.astro';
import TechStack from '../components/TechStack.astro';
import Certificaciones from '../components/Certificaciones.astro';
import Portafolio from '../components/Portafolio.astro';
import Galeria from '../components/Galeria.astro';
import Acerca from '../components/Acerca.astro';
import Contacto from '../components/Contacto.astro';
import Modales from '../components/Modales.astro';

const pageTitle = "Alex Salinas Ponce - Ingeniero Informático | Desarrollador Full Stack";
const pageDescription = "Ingeniero Informático especializado en desarrollo full stack, administración de infraestructura TI, gestión de proyectos tecnológicos y soluciones empresariales.";
---

<MainLayout title={pageTitle} description={pageDescription}>
    <Hero />
    <Impacto />
    <Servicios />
    <TechStack />
    <Certificaciones />
    <Portafolio />
    <Galeria />
    <Acerca />
    <Contacto />
    <Modales />
</MainLayout>
```

---

### ⏱️ Fase 6: Estilos CSS (1 hora)

#### 6.1 `src/styles/globals.css`
```css
/* Consolidar todos los CSS del proyecto aquí */
/* O importar:
   - estilos-modificados.css
   - variables-base.css
   - responsivo.css
   - etc.
*/

@import 'variables.css';
@import 'components.css';

:root {
    --primary-color: #0D161F;
    --accent-color: #FFC107;
    --text-color: #333;
    --light-bg: #f8f9fa;
}

body {
    font-family: 'Montserrat', sans-serif;
    background-color: var(--primary-color);
    color: var(--text-color);
    line-height: 1.6;
}
```

---

### ⏱️ Fase 7: Configuración Astro (15 minutos)

#### 7.1 `astro.config.mjs`
```javascript
import { defineConfig } from 'astro/config';
import partytown from '@astrojs/partytown';

export default defineConfig({
    // Comprimir HTML
    compressHTML: true,
    
    // Integración con Partytown para scripts de terceros (Google Analytics, etc.)
    integrations: [
        partytown()
    ],
    
    // Configuración de imágenes
    image: {
        domains: ['example.com'],
    },
    
    // Sitemap automático
    site: 'https://alexsalinasponce.dev',
    
    // Soporte para Markdown (opcional, para blog futuro)
    markdown: {
        syntaxHighlight: 'shiki',
    }
});
```

#### 7.2 `package.json` (Scripts)
```json
{
    "name": "astro-portfolio",
    "type": "module",
    "version": "1.0.0",
    "scripts": {
        "dev": "astro dev",
        "start": "astro dev",
        "build": "astro build",
        "preview": "astro preview",
        "astro": "astro",
        "check": "astro check"
    },
    "dependencies": {
        "astro": "^latest",
        "bootstrap": "^5",
        "aos": "^2.1.1"
    }
}
```

---

## Migración de Componentes

### Detalles por Componente

#### A. `Hero.astro` (del archivo `sections/hero.html`)
**Consideraciones:**
- Verificar que el banner tenga buena metadata
- Asegurar que las imágenes usen lazy loading
- Validar animaciones AOS

#### B. `Impacto.astro` (del archivo `sections/impacto.html`)
**Consideraciones:**
- Lógica de contadores (`animateImpactoCounters()`) debe migrar a cliente
- Usar `<script is:inline>` si es necesario
- Mejor aún: usar Astro Islands + React component si es interactivo

```astro
---
// Opción 1: Script inline (simple)
---
<section id="impacto">
    <div class="counter" data-target="100">0</div>
</section>

<script is:inline>
  function animateCounters() {
    // lógica de animación
  }
  document.addEventListener('astro:page-load', animateCounters);
</script>

<!-- Opción 2: Island con React (recomendado si hay interactividad) -->
```

#### C. `Portafolio.astro` (del archivo `sections/portafolio.html`)
**Consideraciones:**
- Los modales pueden mantenerse
- Verificar que Bootstrap modals sigan funcionando
- Validar que todas las imágenes tengan alt text

#### D. `Acerca.astro` (del archivo `sections/acerca.html`)
**Consideraciones:**
- Timeline con AOS animations
- Texto bien estructurado para SEO
- Asegurar que los skill-pills sean accesibles

#### E. `Contacto.astro` (del archivo `sections/contacto.html`)
**Consideraciones:**
- Si hay formulario con envío, necesita:
  - Solución backend (Formspree, Netlify Forms, API propia)
  - Validación frontend
  - Protección contra spam

---

## Configuración Necesaria

### Hosting y Deploy

#### A. Netlify (Recomendado - Gratuito)
```bash
# 1. Subir código a GitHub
git push origin main

# 2. Conectar en Netlify
# Crear cuenta en netlify.com → Connect repo

# 3. Configurar build
# Build command: npm run build
# Publish directory: dist
```

#### B. Vercel (Alternativa)
```bash
# 1. Instalar CLI
npm i -g vercel

# 2. Deployar
vercel
```

#### C. GitHub Pages (Requiere cambios mínimos)
```javascript
// astro.config.mjs
export default defineConfig({
    output: 'static',
    site: 'https://tu-username.github.io',
});
```

### SEO Enhancements

#### Meta Tags Mejorados
```astro
---
// En el layout o página
const siteTitle = "Alex Salinas Ponce";
const siteDescription = "Ingeniero Informático | Desarrollador Full Stack";
const siteImage = "/og-image.png";
const siteUrl = "https://alexsalinasponce.dev";
---

<head>
    <meta property="og:title" content={siteTitle} />
    <meta property="og:description" content={siteDescription} />
    <meta property="og:image" content={siteImage} />
    <meta property="og:url" content={siteUrl} />
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={siteTitle} />
    <meta name="twitter:description" content={siteDescription} />
    
    <!-- Structured Data (Schema.org) -->
    <script type="application/ld+json">
    {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Alex Salinas Ponce",
        "jobTitle": "Ingeniero Informático",
        "url": siteUrl,
        "sameAs": [
            "https://linkedin.com/in/alex-salinas",
            "https://github.com/alex81459"
        ]
    })}
    </script>
</head>
```

### Sitemap y Robots.txt (Automático)
```javascript
// astro.config.mjs
export default defineConfig({
    site: 'https://alexsalinasponce.dev',
    integrations: [
        sitemap(),  // Genera sitemap.xml automáticamente
    ]
});
```

---

## Deploy

### Opciones Recomendadas

| Opción | Costo | Ventajas | Desventajas |
|--------|-------|----------|-------------|
| **Netlify** | Gratuito | Deploy automático, preview de PR, Analytics | Limitaciones en banda ancha |
| **Vercel** | Gratuito | Optim. automática, Edge Functions | Orientado a Next.js |
| **GitHub Pages** | Gratuito | Simple, integrado en GitHub | Menos características |
| **Render** | Gratuito/Pago | Confiable, muchos features | Puede ser lento en tier gratis |

### Pasos para Deploy en Netlify

```bash
# 1. Asegurar que todo está en GitHub
git remote add origin https://github.com/tu-username/astro-portfolio.git
git push -u origin main

# 2. En netlify.com:
#    - Click "New site from Git"
#    - Seleccionar repositorio
#    - Build command: npm run build
#    - Publish directory: dist
#    - Deploy

# 3. Configurar dominio personalizado (opcional)
```

### Variables de Entorno (si aplica)

```bash
# .env
VITE_API_URL=https://api.ejemplo.com
VITE_FORM_ENDPOINT=https://formspree.io/f/tu-id
```

```astro
---
const apiUrl = import.meta.env.VITE_API_URL;
const formEndpoint = import.meta.env.VITE_FORM_ENDPOINT;
---
```

---

## Checklist de Migración

### Pre-Migración
- [ ] Hacer backup del proyecto actual
- [ ] Documentar todos los scripts y lógica JavaScript
- [ ] Listar dependencias externas (librerías, APIs, etc.)
- [ ] Verificar que el CSS está bien documentado

### Fase 1: Preparación
- [ ] Crear proyecto Astro
- [ ] Instalar dependencias
- [ ] Copiar archivos estáticos (img, fonts)
- [ ] Copiar favicon

### Fase 2: Infraestructura
- [ ] Crear `MainLayout.astro`
- [ ] Crear `Navbar.astro`
- [ ] Crear `Breadcrumbs.astro`
- [ ] Crear `ScrollToTop.astro`

### Fase 3: Componentes
- [ ] Convertir `sections/hero.html` → `Hero.astro`
- [ ] Convertir `sections/impacto.html` → `Impacto.astro`
- [ ] Convertir `sections/servicios.html` → `Servicios.astro`
- [ ] Convertir `sections/tech-stack.html` → `TechStack.astro`
- [ ] Convertir `sections/certificaciones.html` → `Certificaciones.astro`
- [ ] Convertir `sections/portafolio.html` → `Portafolio.astro`
- [ ] Convertir `sections/galeria.html` → `Galeria.astro`
- [ ] Convertir `sections/acerca.html` → `Acerca.astro`
- [ ] Convertir `sections/contacto.html` → `Contacto.astro`
- [ ] Convertir `sections/modales.html` → `Modales.astro`

### Fase 4: Estilos y Funcionalidad
- [ ] Migrar todos los CSS a `src/styles/`
- [ ] Validar animaciones AOS
- [ ] Validar Bootstrap components
- [ ] Testear modales
- [ ] Testear formulario de contacto
- [ ] Validar responsive design

### Fase 5: Testing
- [ ] `npm run dev` - Verificar en local
- [ ] Validar en móvil
- [ ] Validar links internos
- [ ] Validar externa (GitHub, LinkedIn, etc.)
- [ ] Lighthouse audit
- [ ] SEO check (Google Search Console)
- [ ] Validar meta tags en redes sociales

### Fase 6: Deploy
- [ ] Build: `npm run build`
- [ ] Preview: `npm run preview`
- [ ] Subir a GitHub
- [ ] Conectar en Netlify/Vercel
- [ ] Configurar dominio personalizado
- [ ] Validar certificado SSL
- [ ] Configurar redirecciones de 301 si es necesario

### Post-Deploy
- [ ] Registrar sitio en Google Search Console
- [ ] Registrar sitio en Bing Webmaster Tools
- [ ] Verificar Analytics (si aplica)
- [ ] Monitorear errores

---

## Preguntas Frecuentes

### ¿Perderé funcionalidad al migrar?
**No.** Astro puede hacer todo lo que hace tu sitio actual. Es principalmente una reorganización sin pérdida de features.

### ¿Qué pasa con jQuery?
**Puedes eliminarlo completamente.** Bootstrap 5 no requiere jQuery. La lógica restante se puede reemplazar con vanilla JavaScript.

### ¿Y si tengo scripts que no entiendo?
**Revisa `script.min.js` y `script.min.js` (minificados).** Si es necesario, desminifica en [beautifier.io](https://beautifier.io), entiende qué hace, y luego lo migras.

### ¿Cómo manejo la interactividad?
**Opciones:**
1. **Scripts inline** (`<script is:inline>`) para lógica simple
2. **Astro Islands** + React/Vue para componentes interactivos
3. **vanilla.js** en carpeta `src/scripts/`

### ¿Puedo agregar un blog después?
**Sí, fácilmente.** Astro soporta:
- Archivos Markdown en `src/pages/blog/`
- Integración con CMS
- Colecciones dinámicas

### ¿Cómo es el rendimiento?
**Excelente.** Astro genera HTML estático:
- Core Web Vitals: A (Lighthouse)
- Time to Interactive: < 1s
- Bundle de JS: 0KB (si no hay interactividad)

### ¿Puedo seguir usando Bootstrap?
**Sí.** Puedes:
- Importar CDN (más simple)
- Instalar via npm (recomendado para optimizar)
- Tailwind CSS (alternativa moderna)

### ¿Cómo hago A/B testing o Analytics?
**Astro tiene integración con:**
- Google Analytics (vía Partytown)
- Fathom Analytics
- Plausible Analytics
- Scripts personalizados

### ¿Cuánto cuesta el hosting?
**Desde $0:**
- Netlify: Gratuito (con limitaciones)
- Vercel: Gratuito (con limitaciones)
- GitHub Pages: Gratuito
- VPS: $5-10/mes (Vultr, DigitalOcean)

### ¿Y si necesito backend después?
**Astro soporta:**
- API endpoints
- Serverless functions (Netlify, Vercel, AWS)
- Conexión a bases de datos
- Stripe, PayPal, etc.

---

## Recursos Útiles

### Documentación Oficial
- 📚 [Astro Docs](https://docs.astro.build)
- 🎓 [Astro Tutorial](https://docs.astro.build/en/tutorial/0-introduction/)
- 🔧 [Integrations](https://astro.build/integrations/)

### Herramientas
- 🎨 [Astro Theme Playground](https://astro.build/themes/)
- 📊 [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- 🔍 [Google Search Console](https://search.google.com/search-console)

### Comunidad
- 💬 [Astro Discord](https://astro.build/chat)
- 🐦 [@astrodotbuild](https://twitter.com/astrodotbuild)
- 📖 [Awesome Astro](https://github.com/one-aalam/awesome-astro)

---

## Próximos Pasos

1. **Decidir**: ¿Proceder con la migración?
2. **Planificar**: Asignar tiempo (1-2 días)
3. **Ejecutar**: Seguir esta guía fase por fase
4. **Validar**: Testing exhaustivo antes de deploy
5. **Deploy**: Publicar y celebrar 🎉

---

**Última actualización:** Junio 2026  
**Autor:** Guía de Migración  
**Estado:** ✅ Listo para ejecutar
