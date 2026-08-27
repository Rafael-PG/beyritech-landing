# Mapa de Contenidos — Beyritech
### Documento de arquitectura y estrategia de contenido para el nuevo sitio web
**Versión 1.0 — 27 de agosto de 2026**

---

## 0. Principio rector

Cada página de este mapa responde a una pregunta que el comprador se hace, en el orden en que se la hace. Ninguna página existe para "tener contenido": todas empujan hacia una de las tres conversiones definidas.

**Conversiones del sitio, por orden de valor:**

| Nivel | Conversión | Dónde ocurre |
|---|---|---|
| Alta | Solicitud de cotización (formulario completo) | Página de contacto, fichas de modelo |
| Media | Descarga de ficha técnica (con captura de correo) | Modelos, sectores, recursos |
| Baja | Contacto por WhatsApp | Botón flotante, presente en todo el sitio |

**Regla de oro para redacción:** todo lo que se afirme debe poder demostrarse. Cada número, certificación o porcentaje sin respaldo documental se elimina o se reformula sin cifra. Este es el mayor riesgo del contenido actual de la maqueta.

---

## 1. Corrección de posicionamiento

La maqueta actual apunta a minería de alta montaña, hospitales y corporativo premium. La realidad comercial es otra:

| Lo que la maqueta dice que eres | Lo que realmente has vendido |
|---|---|
| Campamentos mineros de 1,500 operadores | Dormitorios para agroindustria |
| Hospitales y clínicas modulares | Módulo en alquiler dentro de almacén logístico |
| Casos en Chile (Antofagasta, Copiapó, Pudahuel) | Proyectos en Perú |
| Catálogo incompleto | Falta el modelo instalado en el almacén logístico |

### Decisiones de posicionamiento

**A. El core es la venta. El alquiler no se ofrece como servicio.**
El caso del almacén logístico se ejecutó bajo esa modalidad de forma experimental, pero no es una línea comercial activa. Por tanto **no se publica una página de alquiler ni se menciona como modalidad disponible**: prometer un servicio que no se presta genera consultas que no se pueden atender y desgasta la credibilidad.

Ese proyecto sí se publica, pero contado por lo que demuestra: **un módulo operando dentro de una nave logística**. El valor del caso está en la aplicación, no en cómo se facturó.

**B. Sectores primarios: Agroindustria y Logística/Almacenes.**
Son los dos donde tienes prueba. Reciben página propia, contenido profundo y son los que se muestran primero en la home.

**C. Sectores secundarios: Construcción/Obra, Minería, Corporativo.**
Se mencionan como capacidad ("nuestros módulos también se aplican a...") pero **no** llevan página propia ni casos inventados hasta que existan proyectos reales. Se activan a medida que llegue tracción.

**D. Se elimina todo contenido de Chile y toda certificación no documentada.**
Sin excepción, antes de publicar.

---

## 2. Estructura de la home

Respeta los cuatro segmentos solicitados. Cada segmento tiene un trabajo específico dentro del recorrido de convencimiento.

```
HERO
 ├── SECCIÓN 1 — Qué ofrecemos (productos y servicios)
 ├── SECCIÓN 2 — Por qué elegirnos
 ├── SECCIÓN 3 — Cómo lo hacemos
 ├── SECCIÓN 4 — Quiénes ya confían
 ├── FAQ
 ├── FORMULARIO DE COTIZACIÓN
 └── FOOTER
```

### HERO

**Trabajo:** que en 5 segundos el visitante sepa qué vendes, a quién y qué hacer ahora.

| Elemento | Contenido |
|---|---|
| Etiqueta superior | Categoría clara: *Módulos prefabricados de fabricación nacional* |
| Titular | Beneficio concreto, no adjetivos. Ej: "Espacios habilitados en semanas, no en meses" |
| Subtítulo | A quién sirve: agroindustria, logística, obra. Y las dos modalidades. |
| CTA primario | **SOLICITAR COTIZACIÓN** (amarillo) |
| CTA secundario | **VER MODELOS** (contorno) |
| Barra de confianza | 3–4 datos verificables: fabricación nacional, tiempo de entrega, garantía, cobertura |

**Requisito técnico:** el hero es el elemento LCP. Debe ser una imagen `<img>` con `fetchpriority="high"` y `preload`, no un fondo CSS ni un carrusel. Si se usa video, con póster e imagen de respaldo, nunca autoplay en móvil.

**Advertencia:** la barra de confianza actual dice "ISO 9001 / C5-M · Soporte Minero · Ignífugo Certificado". Ninguna de esas afirmaciones puede publicarse sin certificado. Sustituir por hechos comprobables.

---

### SECCIÓN 1 — Nuestros servicios y productos

**Pregunta que responde:** *¿Qué me pueden vender exactamente?*
**Trabajo:** que el visitante se auto-identifique en una modalidad y un modelo, y baje al detalle.

#### 1.1 Bloque de uso (nuevo, no existe en la maqueta)

Tres o cuatro tarjetas que traducen el producto a la necesidad del visitante, para que se auto-identifique antes de ver specs. No vende el módulo: vende el problema resuelto.

| Tarjeta | Para quién |
|---|---|
| **Alojamiento de personal** | Dormitorios, comedores, vestuarios y SSHH para personal de campo o faena |
| **Espacios de trabajo** | Oficinas, salas de control y garitas, incluso dentro de naves operativas |
| **Aulas y espacios de atención** | Educación y usos de atención al público |
| **Ampliación de operación** | Espacio adicional sin obra húmeda ni parar la actividad |

#### 1.2 Catálogo de modelos

**En grilla, no en carrusel.** El catálogo es el corazón comercial y en carrusel la mayoría de visitantes solo ve el primer modelo.

Modelos a incluir:
- Módulo Plegable Multispace
- Módulo Doble Ala
- Módulo Mini Doble Ala
- **El modelo del almacén logístico** (falta en el sitio actual y en la maqueta, y es uno de tus dos casos reales)

Cada tarjeta lleva: foto real, nombre, uso principal en una línea, 3 specs clave (dimensiones, área útil, capacidad), etiqueta de sector recomendado, y enlace a la ficha completa.

#### 1.3 Aplicaciones por sector

Cinco accesos visuales que llevan a las páginas de sector. Los dos con prueba real van primero y con foto propia; los demás con ilustración genérica.

`Agroindustria` · `Logística y almacenes` · `Obra y construcción` · `Corporativo` · `Educación`

**CTA de cierre de sección:** *Descargar catálogo completo (PDF)* — con captura de correo.

---

### SECCIÓN 2 — Por qué elegirnos

**Pregunta que responde:** *¿Por qué ustedes y no el competidor o la construcción tradicional?*
**Trabajo:** convertir características en consecuencias de negocio.

#### 2.1 Diferenciadores (4 a 6 bloques)

Cada uno se redacta como **beneficio → prueba**, no como característica suelta.

| Eje | Enfoque de redacción |
|---|---|
| Velocidad | Días de entrega reales frente a obra tradicional. Con el dato de tu proyecto real. |
| Fabricación nacional | Repuestos, soporte y respuesta local. Ventaja concreta frente a importado. |
| Reubicable | El módulo sigue siendo un activo si la operación se muda. Argumento financiero fuerte: no es un gasto hundido en obra. |
| Adaptable | Se configura al uso final del cliente, no se vende una caja estándar. |
| Aislamiento y confort | Traducido a lo que le importa al cliente: descanso del personal, menor consumo eléctrico. |
| Acompañamiento | Instalación, puesta en marcha, postventa. |

#### 2.2 Comparativa modular vs. construcción tradicional

Tabla de 5–6 filas. Es el argumento más persuasivo para un gerente de operaciones que nunca compró modular. Comparar: tiempo de ejecución, previsibilidad del presupuesto, obra húmeda, reubicabilidad, impacto en la operación durante el montaje.

**Solo con datos que puedas sostener.** Las cifras de la maqueta (–68% CO₂, –45% climatización, 4% vs 35% de residuos) hay que verificarlas o eliminarlas.

#### 2.3 CTA intermedio

*¿Su proyecto encaja? Solicite una evaluación técnica sin costo.*

> **Corrección respecto a la maqueta:** el CTA "OBTENER FICHA TÉCNICA" estaba ubicado **antes** de mostrar los modelos, pidiendo la ficha de algo que el usuario aún no conocía. Aquí queda después.

---

### SECCIÓN 3 — Cómo lo hacemos

**Pregunta que responde:** *Si les compro, ¿qué va a pasar exactamente?*
**Trabajo:** eliminar el miedo a lo desconocido. En una compra de este ticket, la incertidumbre del proceso es la principal objeción no dicha.

#### 3.1 Proceso en 4 pasos

La maqueta ya lo resuelve bien. Se conserva la estructura, se ajusta el contenido a la realidad operativa:

1. **Levantamiento de requerimientos** — visita o reunión técnica, condiciones del terreno, uso final
2. **Diseño y propuesta cerrada** — planos, especificación y presupuesto sin desviaciones
3. **Fabricación y control de calidad** — en planta, con hitos de avance informados
4. **Transporte, montaje y entrega** — instalación en sitio y puesta en marcha

Para cada paso: qué hace Beyritech, **qué necesita del cliente** (esto genera confianza porque muestra que hay método) y qué entregable recibe.

#### 3.2 Plazos reales

Un bloque simple con rangos honestos por tipo de módulo. La previsibilidad vende más que la velocidad.

#### 3.3 Postventa y garantía

Qué cubre la garantía, por cuánto tiempo, y cómo se solicita soporte. Ausente en la maqueta, y es una objeción frecuente en compra de activo.

**CTA de cierre:** *Agende una visita técnica*

---

### SECCIÓN 4 — Quiénes ya confían

**Pregunta que responde:** *¿Alguien como yo ya lo hizo y le funcionó?*
**Trabajo:** prueba social. Es la sección más importante y la más débil hoy.

#### Cómo construirla con 1–2 casos reales

La maqueta muestra cinco casos ficticios en Chile. **Dos casos reales bien contados convencen más que cinco inventados**, y no exponen a la empresa a un reclamo por publicidad engañosa.

**Caso 1 — Dormitorios para agroindustria (venta)**

| Bloque | Contenido |
|---|---|
| Contexto | Sector, ubicación aproximada, necesidad que tenía el cliente |
| Solución | Modelo, cantidad de módulos, capacidad, adaptaciones |
| Resultado | Tiempo de entrega, personal alojado, qué resolvió |
| Prueba | **Fotos reales del módulo instalado** |

**Caso 2 — Módulo instalado dentro de almacén logístico**

Mismo esquema. Se cuenta por la **aplicación**, no por la modalidad comercial: un módulo operando dentro de una nave logística en actividad. Ese uso interior abre un segmento entero (oficinas dentro de almacén, salas de control, garitas, comedores de turno) que hoy nadie está atacando bien.

> No mencionar que fue en alquiler. Si el visitante pregunta, se responde en la conversación comercial; publicarlo en la web equivale a ofrecer un servicio que no se presta.

#### Elementos complementarios de prueba

- **Testimonio en video o texto**, con nombre, cargo y empresa reales, y autorización escrita. Si el cliente no autoriza usar el nombre, se usa "Gerente de Operaciones, empresa agroindustrial de Ica" — es honesto y sigue funcionando.
- **Logos de clientes**, solo con permiso.
- **Certificaciones**, únicamente las que existan, con entidad emisora y número visible.
- **Galería de fabricación**: fotos de tu planta y del proceso. Si no hay muchos proyectos terminados, la planta es tu prueba de capacidad. Sustituye bien la falta de casos.

> **Qué NO hacer:** rellenar con casos ficticios, testimonios genéricos sin nombre, o logos de certificación sin identificar. Todo eso ya está en el sitio actual y resta credibilidad en vez de sumarla.

---

### Cierre de la home

**FAQ (5–7 preguntas).** La estructura de la maqueta es buena. Preguntas a cubrir: vida útil, qué incluye el precio, plazos, si se puede reubicar, qué necesita el terreno, cobertura geográfica.

**Formulario.** Versión corta: nombre, empresa, correo, teléfono, sector, uso previsto, mensaje. **Siete campos, no trece.** El formulario técnico completo de la maqueta vive en la página de contacto, para quien ya tiene el proyecto definido.

Obligatorio: casilla de consentimiento de datos personales con enlace a la política de privacidad (Ley 29733).

**Footer.** Líneas de negocio, modelos, sectores, empresa, legales, y datos de contacto completos con **distrito incluido** (Los Olivos) y el teléfono oficial confirmado.

---

## 3. Mapa completo del sitio

```
/  (Home)

/modelos
   /modelos/multispace
   /modelos/doble-ala
   /modelos/mini-doble-ala
   /modelos/[modelo-almacen]

/soluciones
   /soluciones/agroindustria     ← prioritario
   /soluciones/logistica-almacenes  ← prioritario
   /soluciones/obra-construccion
   /soluciones/corporativo
   /soluciones/educacion

/proceso
/proyectos
   /proyectos/[caso-1]
   /proyectos/[caso-2]
/nosotros
/recursos
/blog
/contacto
/gracias

/politica-de-privacidad
/terminos-y-condiciones
```

---

## 4. Detalle por página

### `/modelos` — Índice de catálogo

| | |
|---|---|
| **Objetivo** | Que el visitante compare y entre a una ficha |
| **Intención de venta** | Comparación asistida |
| **Contenido** | Grilla de todos los modelos + tabla comparativa de specs + filtro por sector y por capacidad |
| **CTA** | Ficha de cada modelo · Descargar catálogo PDF |
| **Debe evitar** | Ser un carrusel |

### `/modelos/[modelo]` — Ficha de producto

Es la página que más vende del sitio. Estructura:

1. **Galería de fotos reales** (no renders solamente) + video si existe
2. **Descripción de uso**: para qué sirve, quién lo usa
3. **Tabla de especificaciones**: dimensiones plegado y desplegado, área útil, capacidad, peso, aislamiento, estructura, acabados, requisitos eléctricos
4. **Planos** con cotas
5. **Opciones y personalización**: qué se puede modificar
6. **Plazo de entrega** estimado y disponibilidad de fabricación
7. **Requisitos de instalación**: qué necesita el terreno, accesos, grúa
8. **Descarga de ficha técnica PDF** (captura correo)
9. **Modelos relacionados**
10. **Formulario de cotización de ese modelo**, con el modelo preseleccionado

> Sin esta página no hay venta B2B posible. Es la ausencia más grave del sitio actual.

### `/soluciones/agroindustria` — Sector prioritario

| | |
|---|---|
| **Objetivo** | Posicionar en búsquedas del sector y convertir |
| **Público** | Jefe de RRHH, jefe de campo o gerente de operaciones de agroexportadora |
| **Contenido** | El problema del alojamiento de personal de campo · Normativa de habitabilidad aplicable · Soluciones: dormitorios, comedores, vestuarios, SSHH, oficinas de campo · Modelos recomendados · **Caso real** · Plazos típicos por campaña · FAQ del sector |
| **Ángulo de venta** | La estacionalidad. La campaña no espera, y una obra tradicional no llega a tiempo. Plazo de entrega como argumento central. |
| **CTA** | Cotizar para mi campaña |

### `/soluciones/logistica-almacenes` — Sector prioritario

| | |
|---|---|
| **Objetivo** | Abrir el segmento que tu caso real ya demostró |
| **Público** | Jefe de almacén, gerente de operaciones logísticas, operador 3PL |
| **Contenido** | Usos: oficinas dentro de nave, salas de control, garitas, comedores de turno, vestuarios · Ventaja del montaje sin obra húmeda dentro de una nave operativa · Modelos aplicables · **Caso real del almacén logístico** · Consideraciones de seguridad y normativa |
| **Ángulo de venta** | Instalar sin parar la operación. Es lo que ningún constructor tradicional puede ofrecer. |

### `/soluciones/[obra, corporativo, educación]` — Sectores secundarios

Misma estructura, versión más breve, **sin casos inventados**. Se enriquecen cuando existan proyectos reales.

### `/proceso`

Versión extendida de la Sección 3 de la home. Añade: qué documentación se entrega en cada fase, quién es el punto de contacto, cómo se maneja un cambio de alcance, y el detalle de garantía y postventa. Convence al comprador metódico, que es el que aprueba presupuestos grandes.

### `/proyectos` y `/proyectos/[caso]`

Índice con filtro por sector. Cada caso con la estructura de la Sección 4. Con 1–2 casos, el índice puede esperar; publica primero las páginas de detalle y enlázalas desde la home.

### `/nosotros`

**Ausente en la maqueta y crítica.** Un comprador corporativo que va a firmar una orden de compra necesita saber a quién le compra.

Contenido: historia y años de operación · **RUC y razón social** · planta de fabricación con fotos y capacidad · equipo (al menos dirección técnica y comercial) · certificaciones reales · política de calidad · ubicación con mapa.

> Sin esta página, todas las afirmaciones técnicas del sitio flotan sin respaldo institucional.

### `/recursos`

Centro de descargas: catálogo general, fichas técnicas por modelo, planos tipo, guía de requisitos de terreno. Todo con captura de correo. Es tu motor de generación de leads de nivel medio.

### `/blog`

El sitio actual tiene SEO técnico 100 y cero tráfico de campo. **Ninguna optimización técnica va a traer visitantes; solo el contenido lo hace.**

Temas de arranque, orientados a búsquedas reales:
- Cuánto cuesta un módulo prefabricado en Perú y qué influye en el precio
- Cuánto dura un módulo prefabricado y qué mantenimiento necesita
- Requisitos legales de alojamiento para personal de campo agroindustrial
- Cómo preparar el terreno para instalar un módulo
- Módulos prefabricados vs. construcción tradicional: comparativa de costo y plazo
- Cómo elegir el aislamiento según el clima de la zona

Meta realista: 2 artículos al mes, de 1,200+ palabras, cada uno cerrando con CTA a cotización.

### `/contacto`

Aquí vive el **formulario técnico completo** de la maqueta (los 13 campos), para quien ya tiene el proyecto definido. Más: WhatsApp directo, teléfono, correo, dirección con mapa, horario de atención, y ruta comercial vs. postventa.

### `/gracias`

Página de confirmación tras enviar el formulario. Confirma recepción, indica el plazo de respuesta, ofrece el catálogo mientras espera, y enlaza a proyectos. Necesaria además para medir conversiones en analítica.

### Páginas legales

`/politica-de-privacidad` — obligatoria por Ley 29733. Debe declarar finalidad del tratamiento, plazo de conservación, derechos ARCO y canal para ejercerlos.
`/terminos-y-condiciones` — condiciones de cotización, garantía, alcance de la información publicada.

---

## 5. Navegación

**Menú principal (visible en escritorio, hamburguesa solo bajo 1024 px):**

`Modelos ▾` · `Soluciones ▾` · `Proceso` · `Proyectos` · `Nosotros` · **[COTIZAR]**

> **Corrección respecto a la maqueta:** el header oculta toda la navegación tras una hamburguesa incluso en escritorio. Para un sitio B2B con múltiples líneas eso reduce el descubrimiento y elimina enlaces internos que el SEO necesita. Además, el botón de cotizar debe estar fijo en el header: la home es muy larga y quien decide a mitad de página no debería tener que seguir bajando.

**Presente en todo el sitio:** botón flotante de WhatsApp (canal real de contacto B2B en Perú, ausente hoy).

---

## 6. Datos que hay que levantar internamente

Ninguna redacción puede empezar sin esto. Es el cuello de botella real del proyecto.

**Empresa**
- [ ] Razón social exacta y RUC *(la maqueta dice "Beyritech Modular Systems S.A." — confirmar; en Perú suele ser S.A.C.)*
- [ ] Dirección completa con distrito *(el manual dice Urb. San Elías, Los Olivos; la maqueta lo omite)*
- [ ] Teléfono oficial *(el manual dice 0800 80142 anexo 1002; la web dice +51 993 694 677 — decidir cuál)*
- [ ] Año de inicio de operaciones
- [ ] Certificaciones reales: entidad, número, vigencia, alcance

**Producto** — por cada modelo
- [ ] Dimensiones plegado y desplegado, área útil, capacidad, peso
- [ ] Estructura: tipo de acero, espesor, tratamiento anticorrosivo
- [ ] Aislamiento: material, espesor, valor R si está ensayado
- [ ] Requisitos eléctricos y sanitarios
- [ ] Opciones de personalización
- [ ] Plazo de entrega real
- [ ] Rango de precio referencial *(aunque no se publique, define el mensaje)*
- [ ] Fotos profesionales del módulo real
- [ ] Planos con cotas exportables a PDF

**Política comercial**
- [ ] Qué incluye el precio: fabricación, transporte, montaje, puesta en marcha
- [ ] Qué queda fuera y se cotiza aparte (cimentación, conexiones, permisos)
- [ ] Condiciones de pago y validez de la cotización
- [ ] Respuesta definida para quien pregunte por alquiler *(hoy no se ofrece; hay que decidir si se evalúa caso por caso o se descarta)*

**Casos reales**
- [ ] Autorización escrita del cliente para usar nombre y fotos
- [ ] Fotos del proyecto instalado
- [ ] Datos: fecha, plazo de ejecución, cantidad de módulos, capacidad
- [ ] Testimonio con nombre y cargo

**Operación**
- [ ] Cobertura geográfica de entrega
- [ ] Términos de garantía
- [ ] Fotos de planta y proceso de fabricación

---

## 7. Orden de ejecución sugerido

**Fase 1 — Publicable (lo mínimo con integridad)**
Home · Modelos + fichas de los modelos existentes · Nosotros · Contacto · Legales · Los 2 casos reales

**Fase 2 — Captación**
Agroindustria · Logística y almacenes · Proceso · Recursos con descargas · Gracias

**Fase 3 — Crecimiento**
Blog · Sectores secundarios · Nuevos casos a medida que se cierren proyectos

---

## 8. Advertencias que arrastra la maqueta

Para que no se pierdan al pasar a construcción:

1. **Eliminar todos los casos chilenos** (Antofagasta, Copiapó, Pudahuel, Los Andes, San Isidro) y los placeholders con prefijo `+56`
2. **Validar o eliminar** cada certificación y cada porcentaje: ISO 9001, C5-M, Clase 1, sísmica Clase A, OSHA/HSE, 50 años, 180 km/h, 98%, –68%, –45%, 60%
3. **Quitar la mención a Caterpillar** del testimonio
4. **Limpiar los asteriscos de Markdown** sin renderizar en footer y copyright
5. **Borrar las notas del autor** filtradas al texto público: "(como el modelo de madera y metal del video)", "acabados en madera de lujo tipo video"
6. **Eliminar la línea de SEO del footer** ("Optimizado para motores de búsqueda con foco en...") — es relleno de palabras clave declarado
7. **Corregir** "preparación estructural estructural" y "HITOS E ENTREGABLES"
8. **Modo claro:** el amarillo `#FEC934` sobre blanco da 1,55:1 y falla WCAG. Solo como fondo con texto oscuro
9. **Verificar contraste** de los párrafos grises sobre fondo oscuro y el tamaño de las etiquetas monoespaciadas (mínimo 12 px)
10. **Definir el destino** de "VER PLANOS Y MEMORIA DESCRIPTIVA" y "DESCARGAR FICHA TÉCNICA" antes de construir

---

## 9. Cómo se medirá

| Indicador | Línea base actual | Meta 6 meses |
|---|---|---|
| Cotizaciones mensuales | Por definir | — |
| Descargas de ficha técnica | 0 (no existe) | — |
| Tráfico orgánico | Sin datos de campo en CrUX | Datos suficientes para medir |
| Rendimiento móvil (Lighthouse) | 38 | 85+ |
| LCP móvil | 14,6 s | < 2,5 s |
| Accesibilidad | 88 | 95+ |

Configurar en analítica los eventos: envío de formulario, descarga de ficha, clic en WhatsApp, clic en teléfono.
