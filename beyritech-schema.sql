-- Schema: landing_beyritech
-- Ejecutar en phpMyAdmin o MySQL Workbench

CREATE DATABASE IF NOT EXISTS landing_beyritech
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE landing_beyritech;

-- ─────────────────────────────────────────────
-- Blog
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blog_posts (
  idBlog       INT AUTO_INCREMENT PRIMARY KEY,
  slug         VARCHAR(255) UNIQUE NOT NULL,
  servicio     VARCHAR(100),
  title        VARCHAR(255) NOT NULL,
  excerpt      TEXT,
  content      LONGTEXT,
  date         DATETIME,
  author       VARCHAR(100),
  readTime     VARCHAR(20),
  image        VARCHAR(500),
  featured     BOOLEAN DEFAULT FALSE,
  trafficRank  INT DEFAULT 0,
  isNew        BOOLEAN DEFAULT FALSE,
  keywords     VARCHAR(500),
  published    BOOLEAN DEFAULT TRUE,
  createdAt    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ─────────────────────────────────────────────
-- Casos de éxito
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS casos_exito (
  idCasos      INT AUTO_INCREMENT PRIMARY KEY,
  slug         VARCHAR(255) UNIQUE NOT NULL,
  servicio     VARCHAR(100),
  title        VARCHAR(255) NOT NULL,
  excerpt      TEXT,
  content      LONGTEXT,
  date         DATETIME,
  author       VARCHAR(100),
  readTime     VARCHAR(20),
  image        VARCHAR(500),
  featured     BOOLEAN DEFAULT FALSE,
  trafficRank  INT DEFAULT 0,
  isNew        BOOLEAN DEFAULT FALSE,
  keywords     VARCHAR(500),
  published    BOOLEAN DEFAULT TRUE,
  gallery      JSON,
  createdAt    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ─────────────────────────────────────────────
-- Datos de prueba (blog)
-- ─────────────────────────────────────────────
INSERT INTO blog_posts (slug, servicio, title, excerpt, content, date, author, readTime, image, featured, trafficRank, isNew, keywords, published) VALUES
('costo-modulo-prefabricado-peru', 'general', 'Cuánto cuesta un módulo prefabricado en Perú',
 'Factores que influyen en el precio de un módulo prefabricado:材料, estructura, aislamiento, personalización y logística.',
 '<h2>Factores que definen el precio</h2><p>El costo de un módulo prefabricado en Perú depende de múltiples variables. No existe un precio único porque cada proyecto se configura según el uso final, las condiciones del terreno y los acabados requeridos.</p><h3>Estructura metálica</h3><p>El tipo de acero, el espesor de los perfiles y el tratamiento anticorrosivo son el componente de mayor peso en el presupuesto. Una estructura galvanizado C5-M cuesta más que una pintada, pero garantiza 50+ años de vida útil.</p><h3>Aislamiento</h3><p>Un núcleo PIR de 100mm (R-32) tiene un costo superior a uno de 60mm, pero reduce el gasto eléctrico de climatización hasta un 45%. El retorno de inversión se mide en meses, no en años.</p><h3>Personalización</h3><p>Acabados premium,.instalaciones sanitarias complejas y diseños a medida incrementan el costo base. Lo importante es que el precio se cierra antes de la fabricación: sin sorpresas.</p>',
 NOW(), 'Equipo Beyritech', '5 min', '/img/blog/costo-modulo.webp', TRUE, 1, TRUE,
 'costo módulo prefabricado Perú, precio módulo modular, cuánto cuesta módulo plegable', TRUE),

('vida-util-modulo-prefabricado', 'general', 'Cuánto dura un módulo prefabricado y qué mantenimiento necesita',
 'Guía completa de vida útil, mantenimiento preventivo y cuidados para módulos prefabricados de acero.',
 '<h2>Vida útil real: más de 50 años</h2><p>Un módulo prefabricado bien fabricado y con mantenimiento preventivo supera los 50 años de vida útil. La clave está en la calidad de los materiales y el proceso de fabricación.</p><h3>Acero galvanizado C5-M</h3><p>La protección multicapa contra la corrosión marina y ambiental es lo que separa un módulo industrial de uno de uso residencial temporal. El galvanizado C5-M soporta salinidad, humedad y radiación UV sin degradación.</p><h3>Mantenimiento preventivo</h3><p>Cada 12 meses: inspección visual de selladores, revisión de juntas y limpieza de canaletas. Cada 5 años: reaplicación de protector en puntos de soldadura. El costo anual es inferior al 0.5% del valor del módulo.</p>',
 NOW(), 'Equipo Beyritech', '4 min', '/img/blog/vida-util.webp', TRUE, 2, FALSE,
 'vida útil módulo prefabricado, mantenimiento módulo modular, duración estructura modular', TRUE),

('requisitos-terreno-modulo', 'general', 'Cómo preparar el terreno para instalar un módulo',
 'Guía técnica: requisitos de terreno, cimentación, accesos y conexiones para instalar módulos prefabricados.',
 '<h2>El terreno define el éxito de la instalación</h2><p>Un módulo prefabricado puede instalarse en prácticamente cualquier terreno, pero la preparación previa es clave para una instalación rápida y segura.</p><h3>Nivelación</h3><p>El terreno debe estar nivelado con una tolerancia de ±2cm. Se pueden usar zapatas corridas, pedestales regulables o placa de concreto según el tipo de suelo.</p><h3>Accesos</h3><p>Se necesita acceso para camión de 40 pies y grúa de mínimo 25 toneladas. El ancho mínimo de acceso es de 3.5 metros.</p><h3>Conexiones</h3><p>Agua, alcantarillado, electricidad y datos deben estar previstos a no más de 15 metros del punto de instalación.</p>',
 NOW(), 'Equipo Beyritech', '6 min', '/img/blog/requisitos-terreno.webp', FALSE, 0, FALSE,
 'requisitos terreno módulo prefabricado, preparación terreno modular, cimentación módulo', TRUE);

-- ─────────────────────────────────────────────
-- Datos de prueba (casos de éxito)
-- ─────────────────────────────────────────────
INSERT INTO casos_exito (slug, servicio, title, excerpt, content, date, author, readTime, image, featured, trafficRank, isNew, keywords, published) VALUES
('dormitorios-agroindustria-ica', 'agroindustria', 'Dormitorios para personal agroindustrial en Ica',
 'Despliegue de módulos dormitorio para campamento de personal de campo en zona agroindustrial de Ica.',
 '<h2>Contexto del proyecto</h2><p>Una agroexportadora de la región de Ica necesitaba alojar a 200 trabajadores temporales durante la campaña de exportación. El plazo máximo era de 3 semanas antes del inicio de la cosecha.</p><h2>Solución implementada</h2><p>Se desplegaron 12 módulos dormitorio tipo Multispace, cada uno con capacidad para 16 personas. Cada módulo incluía camas literas, Taques personales, ventilación cruzada y aislamiento PIR de 80mm.</p><h2>Resultado</h2><ul><li><strong>Plazo de instalación:</strong> 18 días desde la orden de compra</li><li><strong>Capacidad total:</strong> 192 operadores alojados</li><li><strong>Ahorro estimado:</strong> 40% frente a alternativa de built temporales</li></ul>',
 NOW(), 'Equipo Beyritech', '3 min', '/img/casos/agroindustria-ica.webp', TRUE, 1, TRUE,
 'dormitorios agroindustria Ica, módulo campamento temporal, alojamiento personal campo', TRUE),

('oficina-almacen-logistico', 'logistica', 'Oficina dentro de almacén logístico en operación',
 'Instalación de módulo de oficina operando dentro de una nave logística sin detener la actividad.',
 '<h2>El reto</h2><p>Un operador logístico necesitaba una oficina de control operativo dentro de su nave principal, de 8,000 m², sin interrumpir las operaciones de carga y descarga que funcionan 24/7.</p><h2>Solución</h2><p>Se instaló un módulo Doble Ala de 144 m² en el extremo norte de la nave, con acceso independiente y sistemas de climatización propios. La instalación se completó en 72 horas durante el turno nocturno.</p><h2>Resultado</h2><ul><li><strong>Sin parada de operación:</strong> La actividad logística no se vio afectada</li><li><strong>Espacio ganado:</strong> 144 m² de oficina operativa</li><li><strong>Reubicable:</strong> El módulo puede trasladarse si la operación se muda</li></ul>',
 NOW(), 'Equipo Beyritech', '3 min', '/img/casos/almacen-logistico.webp', TRUE, 2, FALSE,
 'oficina almacén logístico, módulo dentro de nave, oficina modular industrial', TRUE);
