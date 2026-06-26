# Beyritech — Módulos Multipropósito y Contenedores de Oficina Modulares

Landing page corporativa para **Beyritech**, empresa de ingeniería volumétrica especializada en módulos plegables multipropósito y contenedores de oficina modulares para minería, industria, salud, educación y corporativo.

Incluye catálogo de productos con planos SVG interactivos, carrusel de testimonios con auto-play, formulario de cotización con envío por correo electrónico, modo claro/oscuro con paleta cálida, FAQ con animación nativa, smooth scrolling y SEO completo.

---

## Stack Tecnológico

| Capa | Tecnología |
|---|---|
| **Framework** | React 19 |
| **Build** | Vite 6 + TypeScript |
| **Estilos** | Tailwind CSS v4 |
| **Animaciones** | Motion (framer-motion) |
| **Smooth Scroll** | Lenis |
| **Carousel** | Embla |
| **Iconos** | Lucide React |
| **Backend** | Express.js |
| **Email** | Nodemailer (Gmail SMTP) |
| **Seguridad** | Helmet, express-rate-limit |
| **SEO** | JSON-LD Schema (Organization + FAQPage), Open Graph, Twitter Cards |

---

## Estructura del Proyecto

```
beyritech-landing/
├── public/
│   ├── logo/
│   │   ├── beyritech-logo.png              # Logo modo oscuro
│   │   └── beyritech-logo-light.png        # Logo modo claro
│   ├── video/
│   │   ├── background.mp4                  # Video hero
│   │   ├── background.webm                 # Video hero (WebM)
│   │   └── poster.webp                     # Poster comprimido (23 KB)
│   ├── 404.html                            # Página 404 personalizada
│   ├── robots.txt                          # Control de rastreo
│   └── sitemap.xml                         # Sitemap para motores de búsqueda
├── src/
│   ├── components/
│   │   ├── Navbar.tsx                      # Navegación + theme toggle + LCP optimizado
│   │   ├── Hero.tsx                        # Hero con video + animación + keywords SEO
│   │   ├── WhyChooseUs.tsx                 # Beneficios clave con SEO copy
│   │   ├── Models.tsx                      # Catálogo con carrusel
│   │   ├── SpeedSustainabilityLogistics.tsx
│   │   ├── Process.tsx                     # Proceso de ingeniería
│   │   ├── Projects.tsx                    # Proyectos destacados
│   │   ├── FaqTestimonials.tsx              # FAQ + Testimonios con etiquetas <article>
│   │   ├── InteractiveConfigurator.tsx     # Formulario de cotización
│   │   └── Footer.tsx
│   ├── context/
│   │   └── ThemeContext.tsx                # Contexto de tema claro/oscuro
│   ├── hooks/
│   │   ├── useLenis.ts                     # Hook para Lenis
│   │   └── ScrollReveal.tsx                # Animación al hacer scroll
│   ├── App.tsx                             # Entry point con lazy loading
│   ├── index.css                           # Estilos globales + tema
│   ├── main.tsx
│   └── types.ts
├── server.ts                               # Express server + API email + ruta 404
├── vite.config.ts                          # Configuración Vite + code splitting
├── tsconfig.json
├── package.json
└── .env                                    # Variables de entorno
```

---

## Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo (Vite + Express en puerto 3000)
npm run build    # Build de producción (Vite + esbuild para server)
npm run start    # Inicia servidor de producción con NODE_ENV=production + Brotli
npm run lint     # TypeScript check
```

> `npm run start` incluye automáticamente `NODE_ENV=production` gracias a `cross-env`, activando Helmet, Brotli pre-compressed y el servidor de archivos estáticos.

---

## Características

### SEO Completo
- Meta tags: title, description, keywords, robots
- Open Graph (og:title, og:description, og:image, og:url, og:locale, og:site_name)
- Twitter Cards (card, title, description, image)
- Canonical URL
- JSON-LD Schema.org (Organization con dirección, teléfono, email + FAQPage con 5 preguntas)
- `robots.txt` con sitemap referenciado
- `sitemap.xml` con URL principal
- Heading jerarquizado (1 H1, múltiples H2→H3)
- Alt texts descriptivos con keywords en todas las imágenes
- Keyword variants: "Módulos Multipropósito", "contenedores de oficina", "oficinas modulares"
- Etiquetas semánticas `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`

### Página 404
- Página personalizada con diseño de marca (logo, gradiente dorado, tipografía consistente)
- Botón "Volver al inicio"
- Servida con código de estado HTTP 404

### Hero
- Video background con overlay gradiente
- Animación de entrada: grid HUD + scan line dorada + clip-path reveal
- Efecto parallax sutil con Motion
- Párrafo optimizado con keywords SEO

### Catálogo de Modelos
- 3 modelos con planos SVG interactivos
- Carrusel Embla con navegación por dots y flechas
- Especificaciones técnicas y aplicaciones por modelo
- Gradientes adaptativos por tema (oscuro/claro)

### Testimonios
- Carrusel con auto-play cada 7 segundos
- Navegación por dots + swipe táctil
- Animación slide direccional con Motion
- Pausa al hacer hover

### FAQ
- Animación de altura natural con `grid-template-rows`
- Sin JavaScript para la transición — puro CSS
- Categorías visuales para cada pregunta
- Datos estructurados JSON-LD FAQPage para Google

### Formulario de Cotización
- Validación de campos requeridos
- Envío por correo electrónico via Gmail SMTP
- Rate limiting (5 solicitudes / 15 min)
- Mensaje de éxito con datos del contacto

### Modo Claro/Oscuro
- Toggle en navbar con icono Sol/Luna
- Persistencia en localStorage
- Animación suave de transición (600ms)
- Paleta cálida industrial en modo claro
- Logo adaptativo por tema
- Favicon cambia dinámicamente con el tema
- Script blocking en `<head>` evita flash al cargar

### Rendimiento
- Code splitting con `React.lazy()` + Suspense
- Vendor chunking (vendor, icons, embla, lenis)
- `content-visibility: auto` en secciones below-the-fold
- Video con `preload="metadata"`
- Google Fonts con preconnect y `media="print"` onload
- Logo con `fetchpriority="high"` y `loading="eager"` para LCP
- Poster.webp comprimido (34 KB → 23 KB)
- Brotli pre-compressed en servidor Express (calidad 4, ~20% más pequeño que gzip)
- Cache-Control `public, max-age=31536000, immutable` en assets

---

## API

### POST /api/contact

Envía una cotización por correo electrónico con los datos del formulario.

**Request body:**
```json
{
  "name": "string",
  "company": "string",
  "email": "string",
  "phone": "string",
  "industry": "string",
  "moduleType": "string",
  "area": "string",
  "capacity": "string",
  "location": "string",
  "sustainability": "boolean",
  "insulation": "boolean",
  "timeline": "string",
  "additionalSpecs": "string"
}
```

**Response:** `200 OK` con logo CID-embed en el email.

---

## Variables de Entorno (`.env`)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=tu-correo@gmail.com
SMTP_PASS=tu-app-password
CONTACT_EMAIL=correo-destino@ejemplo.com
```

> Sin `.env` el servidor arranca igual, solo el formulario de cotización no enviará correos.

---

## Desarrollo Local

```bash
# 1. Clonar repositorio
git clone <url>
cd beyritech-landing

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
# Abrir http://localhost:3000

# 4. Compartir con ngrok (opcional)
ngrok http 3000
```

---

## Deploy a Producción

```bash
npm run build    # Genera dist/ con frontend + server compilado
npm run start    # Inicia servidor de producción en puerto 3000 (NODE_ENV=production)
```

El build genera:
- `dist/index.html` + `dist/assets/*` — frontend compilado
- `dist/server.cjs` — servidor Express compilado con esbuild
- `dist/404.html` — página 404 personalizada
- `dist/robots.txt` — control de rastreo
- `dist/sitemap.xml` — sitemap para motores de búsqueda

Para producción, se recomienda:
- Configurar reverse proxy (Nginx, Caddy)
- Usar servicio transaccional de email (Resend, SendGrid) en vez de Gmail SMTP

---

## Contacto

**Beyritech**
Av. Santa Elvira Mza. B Lote. 8, Lima, Perú
+51 993 694 677
asistente.comercial@beyritech.com

---

## Licencia

Propietaria — Beyritech © 2026
