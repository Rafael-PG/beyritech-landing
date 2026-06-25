# Beyritech — Módulos Multipropósito

Landing page corporativa para **Beyritech**, empresa de ingeniería volumétrica especializada en módulos plegables multipropósito para minería, industria, salud, educación y corporativo.

Incluye catálogo de productos con planos SVG interactivos, carrusel de testimonios con auto-play, formulario de cotización con envío por correo electrónico, modo claro/oscuro con paleta cálida, FAQ con animación nativa, y smooth scrolling.

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

---

## Estructura del Proyecto

```
beyritech-landing/
├── public/
│   ├── logo/
│   │   ├── beyritech-logo.png          # Logo modo oscuro
│   │   └── beyritech-logo-light.png    # Logo modo claro
│   └── video/
│       └── background.mp4              # Video hero
├── src/
│   ├── components/
│   │   ├── Navbar.tsx                  # Navegación + theme toggle
│   │   ├── Hero.tsx                    # Hero con video + animación
│   │   ├── WhyChooseUs.tsx             # Beneficios clave
│   │   ├── Models.tsx                  # Catálogo con carrusel
│   │   ├── SpeedSustainabilityLogistics.tsx
│   │   ├── Process.tsx                 # Proceso de ingeniería
│   │   ├── Projects.tsx                # Proyectos destacados
│   │   ├── FaqTestimonials.tsx         # FAQ + Testimonios
│   │   ├── InteractiveConfigurator.tsx # Formulario de cotización
│   │   └── Footer.tsx
│   ├── context/
│   │   └── ThemeContext.tsx            # Contexto de tema claro/oscuro
│   ├── hooks/
│   │   ├── useLenis.ts                # Hook para Lenis
│   │   └── ScrollReveal.tsx           # Animación al hacer scroll
│   ├── App.tsx                        # Entry point con lazy loading
│   ├── index.css                      # Estilos globales + tema
│   ├── main.tsx
│   └── types.ts
├── server.ts                          # Express server + API email
├── vite.config.ts                     # Configuración Vite
├── tsconfig.json
├── package.json
└── .env                               # Variables de entorno
```

---

## Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo (Vite + Express en puerto 3000)
npm run build    # Build de producción (Vite + esbuild para server)
npm run start    # Inicia servidor de producción
npm run lint     # TypeScript check
```

---

## Características

### Hero
- Video background con overlay gradiente
- Animación de entrada: grid HUD + scan line dorada + clip-path reveal
- Efecto parallax sutil con Motion

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
- Vendor chunking (react, lucide, embla, lenis)
- `content-visibility: auto` en secciones below-the-fold
- Video con `preload="metadata"`
- Google Fonts con preconnect y pesos reducidos
- Logo redimensionado a 200×159 px

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

---

## Desarrollo Local

```bash
# 1. Clonar repositorio
git clone <url>
cd beyritech-landing

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con credenciales SMTP

# 4. Iniciar servidor de desarrollo
npm run dev
# Abrir http://localhost:3000

# 5. Compartir con ngrok (opcional)
ngrok http 3000
```

---

## Deploy a Producción

```bash
npm run build    # Genera dist/ con frontend + server compilado
npm run start    # Inicia servidor de producción en puerto 3000
```

El build genera:
- `dist/index.html` + `dist/assets/*` — frontend compilado
- `dist/server.cjs` — servidor Express compilado con esbuild

Para producción, se recomienda:
- Usar `NODE_ENV=production` (activa Helmet)
- Configurar reverse proxy (Nginx, Caddy)
- Usar servicio transaccional de email (Resend, SendGrid) en vez de Gmail SMTP

---

## Licencia

Propietaria — Beyritech © 2026
