# Requerimiento de imágenes — Home Beyritech
### Especificación para producción fotográfica y entrega de archivos
**Acompaña a:** `beyritech-home-borrador.html`
**Versión 1.0 — 27 de agosto de 2026**

---

## Cómo usar este documento

Cada imagen del borrador tiene un código `IMG-XX` visible en el marco vacío. Este documento describe qué debe mostrar cada una, en qué formato entregarla y con qué texto alternativo.

**Reglas generales que aplican a todas:**

| Aspecto | Requisito |
|---|---|
| Formato de entrega | **Original JPG/RAW sin comprimir** para archivo, y **WebP** optimizado para web |
| Perfil de color | sRGB |
| Compresión web | Calidad 75–80 en WebP. Ninguna imagen debe superar **250 KB** salvo el hero |
| Versión retina | Exportar a 1× y 2× para servir con `srcset` |
| Nombre de archivo | `beyritech-[codigo]-[descripcion-corta].webp`, sin tildes, ni espacios, ni caracteres chinos |
| Texto alternativo | Obligatorio en todas. Se indica el sugerido en cada ficha |
| Carga | `loading="lazy"` en todas **menos IMG-01** |
| Personas | Con autorización escrita de uso de imagen si son identificables |
| Clientes | Con autorización escrita si aparece marca, logo o instalación identificable |

**Por qué importa la optimización:** el sitio actual pesa 30,6 MB y carga 3.086 KiB de imágenes mal comprimidas, con un solo archivo de 1.347 KiB. Ese es el origen del LCP de 14,6 s en móvil. Este requerimiento existe para no repetirlo.

---

## Prioridad

| Nivel | Imágenes | Sin esto |
|---|---|---|
| **Bloqueante** | IMG-01, IMG-02, IMG-03, IMG-04, IMG-09, IMG-10 | No se puede publicar |
| **Alta** | IMG-05, IMG-11, IMG-12, IMG-13 | Se publica, pero con secciones débiles |
| **Media** | IMG-06, IMG-07, IMG-08 | Pueden resolverse con recortes de otras tomas |

---

## IMG-01 — Hero principal

| | |
|---|---|
| **Ubicación** | Cabecera, junto al titular |
| **Proporción** | 4:3 (escritorio) · recorte 3:4 o 1:1 para móvil |
| **Resolución mínima** | 1600 × 1200 px |
| **Peso máximo web** | 180 KB |
| **Prioridad** | Bloqueante |

**Qué debe mostrar:** un módulo Beyritech **real, ya instalado y en uso**, fotografiado en su emplazamiento. Idealmente con una o dos personas trabajando o entrando, para dar escala y señal de que está operativo.

**Qué evitar:** renders 3D, fotos de catálogo de proveedor extranjero, módulos vacíos sobre fondo blanco, imágenes de banco.

**Condiciones de toma:** luz natural, preferible primera hora de la mañana o última de la tarde. Ángulo a tres cuartos para que se lea el volumen. Encuadre con espacio de aire en el lado que no lleva texto.

**Nota técnica crítica:** esta es la imagen que determina el LCP del sitio. Debe implementarse como `<img>` con `fetchpriority="high"` y `preload`, **nunca** como `background-image` en CSS ni dentro de un carrusel. En la maqueta anterior el hero era un fondo CSS y eso costaba 2,35 s de retraso.

**Alt sugerido:** «Módulo Beyritech instalado en [ubicación], con personal accediendo a la entrada»

---

## IMG-02 · IMG-03 · IMG-04 · IMG-05 — Modelos del catálogo

| | |
|---|---|
| **Ubicación** | Tarjetas del catálogo, Sección 1 |
| **Proporción** | 4:3 |
| **Resolución mínima** | 1200 × 900 px |
| **Peso máximo web** | 120 KB cada una |

**Requisito de coherencia:** las cuatro deben fotografiarse con **el mismo tratamiento**: misma distancia, mismo ángulo, misma altura de cámara, misma iluminación y fondo comparable. Si una está en interior y otra a contraluz, la grilla se ve desordenada y el catálogo pierde credibilidad.

| Código | Modelo | Qué mostrar |
|---|---|---|
| **IMG-02** | Módulo Plegable Multispace | Exterior, módulo desplegado, vista a tres cuartos |
| **IMG-03** | Módulo Doble Ala | Exterior, desplegado, mismo ángulo que IMG-02 |
| **IMG-04** | Módulo Mini Doble Ala | Exterior, desplegado, mismo ángulo |
| **IMG-05** | Modelo del almacén logístico | El modelo que se instaló en la nave. **No está en el sitio actual ni en la maqueta** |

**Recomendación adicional:** para cada modelo, capturar en la misma sesión 4–6 tomas extra (interior, detalle de unión, proceso de despliegue, planta general). Se usarán en las fichas de producto, que son las páginas que más venden del sitio.

**Alt sugerido:** «Módulo [nombre] desplegado, vista exterior»

---

## IMG-06 · IMG-07 · IMG-08 — Sectores

| | |
|---|---|
| **Ubicación** | Tarjetas de aplicaciones por sector, Sección 1 |
| **Proporción** | 16:9 |
| **Resolución mínima** | 1200 × 675 px |
| **Peso máximo web** | 90 KB cada una |
| **Prioridad** | Media |

| Código | Sector | Qué mostrar |
|---|---|---|
| **IMG-06** | Agroindustria | Módulo dormitorio en entorno de fundo o campo. Puede ser recorte del caso real |
| **IMG-07** | Logística y almacenes | Módulo dentro de nave industrial. Puede ser recorte del caso real |
| **IMG-08** | Obra y construcción | Módulo de oficina en entorno de obra |

**Nota:** IMG-06 e IMG-07 pueden resolverse con recortes de IMG-09 e IMG-10 si el presupuesto de producción es ajustado. IMG-08 es el único que quizá no tenga referente propio; si no existe, mejor omitir la tarjeta que usar una imagen de banco genérica.

---

## IMG-09 — Caso real 1: dormitorios agroindustria

| | |
|---|---|
| **Ubicación** | Sección 4, primer caso |
| **Proporción** | 4:3 |
| **Resolución mínima** | 1400 × 1050 px |
| **Peso máximo web** | 140 KB |
| **Prioridad** | Bloqueante |

**Qué debe mostrar:** los dormitorios entregados, instalados y en su emplazamiento definitivo.

**Requisito de autorización:** se necesita **autorización escrita del cliente** para publicar la fotografía. Si el cliente no autoriza que se identifique la empresa, se puede publicar igualmente encuadrando de forma que no aparezcan logos ni carteles, y describiendo el caso como «empresa agroindustrial de [región]».

**Serie recomendada para la página de detalle del proyecto:** exterior general · exterior de detalle · interior del dormitorio · vista del conjunto instalado · si existe, foto del proceso de montaje.

**Alt sugerido:** «Módulos dormitorio Beyritech instalados en fundo agroindustrial»

---

## IMG-10 — Caso real 2: módulo en almacén logístico

| | |
|---|---|
| **Ubicación** | Sección 4, segundo caso |
| **Proporción** | 4:3 |
| **Resolución mínima** | 1400 × 1050 px |
| **Peso máximo web** | 140 KB |
| **Prioridad** | Bloqueante |

**Qué debe mostrar:** el módulo **operando dentro de la nave logística**. Lo valioso de esta imagen es que se vea el contexto: racks, altura de la nave, montacargas al fondo. Esa yuxtaposición es el argumento de venta completo, porque demuestra que se instala sin detener la operación.

**Encuadre recomendado:** plano general que incluya parte de la estructura del almacén, con el módulo a un tercio del encuadre.

**Advertencia de contenido:** este proyecto se ejecutó bajo modalidad de alquiler, que **no es una línea comercial activa**. La imagen y el texto deben presentarlo por la aplicación, no por la modalidad de contratación.

**Alt sugerido:** «Módulo de oficina Beyritech instalado dentro de un almacén logístico en operación»

---

## IMG-11 · IMG-12 · IMG-13 — Planta de fabricación

| | |
|---|---|
| **Ubicación** | Sección 4, bloque "Nuestra planta" |
| **Proporción** | 4:3 |
| **Resolución mínima** | 1200 × 900 px |
| **Peso máximo web** | 110 KB cada una |
| **Prioridad** | Alta |

| Código | Qué mostrar |
|---|---|
| **IMG-11** | Vista general de la planta, con módulos en distintas etapas |
| **IMG-12** | Estructura metálica en fabricación, detalle del proceso |
| **IMG-13** | Equipo trabajando, con EPP correctamente puesto |

**Por qué estas tres importan más de lo que parece:** con solo dos proyectos ejecutados, la prueba de capacidad no puede venir del volumen de casos. Viene de demostrar que existe una fábrica real. Para un comprador corporativo, ver la planta responde la pregunta «¿estos son fabricantes o intermediarios?», que es la duda de fondo cuando la empresa es poco conocida.

**Requisito de seguridad:** todo el personal visible debe aparecer con casco, lentes y calzado de seguridad. Una foto con incumplimiento de EPP en un sitio que vende a agroindustria y minería es contraproducente.

**Alt sugerido:** «Planta de fabricación Beyritech: [descripción de la etapa]»

---

## Recursos gráficos adicionales

Fuera de las fotografías, el sitio necesita:

| Recurso | Especificación |
|---|---|
| **Logotipo SVG** | Versión sobre fondo oscuro y versión sobre fondo claro. En SVG con textos trazados, para evitar la dependencia de la fuente Mainard, que es comercial |
| **Favicon** | 32×32, 180×180 (apple-touch-icon) y 512×512. El logo completo no funciona a 32 px: hay que preparar una versión reducida, probablemente solo el isotipo |
| **Imagen Open Graph** | 1200 × 630 px, para cuando se comparta el enlace en WhatsApp o LinkedIn. Sin esto, el enlace se comparte sin vista previa |
| **Iconos de sector** | Trazo lineal, coherentes entre sí, en SVG. No usar sets mezclados de distintas librerías |
| **Planos de modelo** | Vista en planta y alzado con cotas, exportables a PDF, para las fichas técnicas |

---

## Lo que NO se debe usar

Vale la pena dejarlo por escrito, porque el sitio actual incurre en varios de estos puntos:

1. **Videos del proveedor chino.** Los archivos actuales conservan nombres en chino y sufijo `online-video-cutter.com`. Son visibles en el código fuente y delatan tanto el origen como el uso de un editor gratuito.
2. **Imágenes de banco genéricas** de módulos que no son suyos. Un comprador técnico distingue un módulo europeo de uno peruano.
3. **Renders 3D como sustituto de foto real.** Sirven para mostrar personalización en las fichas, no para el hero ni para casos de éxito.
4. **Fotos de proyectos ajenos.** El riesgo legal y reputacional no compensa.
5. **Imágenes sin texto alternativo.** El sitio actual pierde puntos de accesibilidad por esto.
6. **PNG para fotografía.** Dos placeholders actuales pesan 272 KB cada uno por estar en PNG. Fotografía siempre en WebP o JPG.

---

## Checklist de entrega

- [ ] IMG-01 hero, con autorización de personas visibles
- [ ] IMG-02 a IMG-05, cuatro modelos con tratamiento coherente
- [ ] IMG-06 a IMG-08 sectores, o recortes aprobados
- [ ] IMG-09 caso agroindustria + autorización escrita del cliente
- [ ] IMG-10 caso almacén + autorización escrita del cliente
- [ ] IMG-11 a IMG-13 planta, con EPP verificado
- [ ] Series extendidas por modelo para las fichas técnicas
- [ ] Logotipo SVG en ambas versiones
- [ ] Favicon en los tres tamaños
- [ ] Imagen Open Graph
- [ ] Todas exportadas a WebP 1× y 2×, dentro de los pesos indicados
- [ ] Todas con nombre de archivo normalizado
- [ ] Textos alternativos redactados
