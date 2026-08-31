export type SeoStatus = "pass" | "warn" | "fail";

export interface SeoMetric {
  status: SeoStatus;
  label: string;
  message: string;
  value: string;
  suggestion?: string;
}

export interface SeoResult {
  score: number;
  metrics: SeoMetric[];
}

export interface SeoInput {
  title: string;
  keywords: string;
  excerpt: string;
  content: string;
}

export function stripHtml(html: string): string {
  return (html || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export function wordCount(html: string): number {
  const words = stripHtml(html).split(/\s+/).filter((w) => w.length > 1);
  return words.length;
}

export function normalizeText(text: string): string {
  return (text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function splitKeywords(keywords: string): string[] {
  return keywords
    .split(",")
    .map((k) => normalizeText(k).trim())
    .filter(Boolean);
}

function wordsIn(phrase: string): string[] {
  return phrase.split(/\s+/).filter(Boolean);
}

export function containsKeyword(text: string, keywords: string): boolean {
  const normalized = normalizeText(text);
  const keywordList = splitKeywords(keywords);
  if (keywordList.length === 0) return false;

  for (const keyword of keywordList) {
    const parts = wordsIn(keyword);
    if (parts.length === 0) continue;
    if (parts.length === 1) {
      if (normalized.includes(keyword)) return true;
      continue;
    }
    // Frase completa presente → cumplido
    if (normalized.includes(keyword)) return true;
    // O al menos 2 partes de la keyword aparecen en el texto
    const hits = parts.filter((p) => normalized.includes(p)).length;
    if (hits >= 2) return true;
  }
  return false;
}

function titleKeywordHint(title: string, keywords: string): string | undefined {
  const parts = splitKeywords(keywords);
  if (parts.length === 0) return "Añade palabras clave y repite la principal en el título.";
  const partsText = parts.join(", ");
  return `Incluye una palabra clave (${partsText}) en el título para mejorar el CTR.`;
}

// ─── Checks (cada uno puro e independiente) ─────────────

function checkTitle(title: string, keywords: string): SeoMetric {
  const len = title.trim().length;
  if (len === 0)
    return { status: "fail", label: "Título", message: "El título está vacío.", value: "0 chars", suggestion: "Escribe un título descriptivo de 50–60 caracteres que incluya tu palabra clave principal." };
  const withKeyword = containsKeyword(title, keywords);
  if (len < 40)
    return { status: "warn", label: "Título", message: "El título es corto.", value: `${len} chars`, suggestion: titleKeywordHint(title, keywords) };
  if (len > 70)
    return { status: "warn", label: "Título", message: "El título es demasiado largo.", value: `${len} chars`, suggestion: "Acorta el título para que no se trunque en Google (máx. 60–70 caracteres)." };
  if (!withKeyword)
    return { status: "warn", label: "Título", message: "No aparece la palabra clave.", value: `${len} chars`, suggestion: titleKeywordHint(title, keywords) };
  return { status: "pass", label: "Título", message: "Longitud y keyword correctas.", value: `${len} chars` };
}

function checkKeywords(keywords: string): SeoMetric {
  const trimmed = keywords.trim();
  if (trimmed.length === 0)
    return { status: "fail", label: "Keywords", message: "No has definido una palabra clave principal.", value: "vacío", suggestion: "Define 1 palabra o frase clave principal, por ejemplo: 'módulos prefabricados'." };
  if (trimmed.length < 10)
    return { status: "warn", label: "Keywords", message: "Palabra clave muy corta.", value: `${trimmed.length} chars`, suggestion: "Usa una frase más descriptiva como término objetivo." };
  return { status: "pass", label: "Keywords", message: "Palabra clave definida.", value: `${trimmed.length} chars` };
}

function checkExcerpt(excerpt: string): SeoMetric {
  const len = excerpt.trim().length;
  if (len === 0)
    return { status: "fail", label: "Excerpt", message: "La meta descripción está vacía.", value: "0 chars", suggestion: "Escribe una descripción de 100–170 caracteres que resuma el contenido e invite al clic." };
  if (len < 100)
    return { status: "warn", label: "Excerpt", message: "La descripción es corta.", value: `${len} chars`, suggestion: "Amplía a 100–170 caracteres para aprovechar el espacio de Google." };
  if (len > 170)
    return { status: "warn", label: "Excerpt", message: "La descripción se cortará en Google.", value: `${len} chars`, suggestion: "Reduce a máximo 170 caracteres." };
  return { status: "pass", label: "Excerpt", message: "Longitud ideal.", value: `${len} chars` };
}

function checkHeadings(html: string, keywords: string): SeoMetric {
  const h2s = (html.match(/<h2[^>]*>/gi) || []).length;
  const h3s = (html.match(/<h3[^>]*>/gi) || []).length;
  const total = h2s + h3s;
  const withKeyword = containsKeyword(stripHtml(html), keywords);
  if (h2s === 0)
    return { status: "fail", label: "Headings", message: "No hay subtítulos H2.", value: `${total} encabezados`, suggestion: "Estructura el texto con al menos un H2 (colócalo con el botón 'H2' del editor)." };
  if (total < 2)
    return { status: "warn", label: "Headings", message: "Pocos encabezados.", value: `${total} encabezados`, suggestion: "Añade más H2/H3 para mejorar la estructura y la lectura." };
  if (!withKeyword)
    return { status: "warn", label: "Headings", message: "La keyword no aparece en el texto.", value: `${total} encabezados`, suggestion: "Repite tu palabra clave de forma natural dentro del contenido." };
  return { status: "pass", label: "Headings", message: "Buena estructura de encabezados.", value: `${total} encabezados` };
}

function checkImages(html: string): SeoMetric {
  const images = (html.match(/<img[^>]*>/gi) || []).length;
  if (images === 0)
    return { status: "pass", label: "Imágenes", message: "Sin imágenes (opcional).", value: "0 img" };
  const emptyAlt = (html.match(/<img(?![^>]*alt="[^"]+")[^>]*>/gi) || []).length;
  if (emptyAlt > 0)
    return { status: "fail", label: "Imágenes", message: "Hay imágenes sin texto alternativo.", value: `${images} img · ${emptyAlt} sin alt`, suggestion: `Añade un atributo 'alt' descriptivo a ${emptyAlt} imagen(es) para accesibilidad y SEO.` };
  return { status: "pass", label: "Imágenes", message: "Imágenes con alt correcto.", value: `${images} img` };
}

function checkInternalLinks(html: string): SeoMetric {
  const links = (html.match(/<a[^>]*href="([^"]*)"/gi) || []);
  const internal = links.filter((l) => /href="\/(blog|casos-de-exito|contacto|modelos)\//.test(l));
  if (internal.length === 0)
    return { status: "fail", label: "Links internos", message: "No hay enlaces internos.", value: `${links.length} links · 0 internos`, suggestion: "Añade enlaces a otros artículos (/blog/…), casos (/casos-de-exito/…) o a la página de modelos." };
  return { status: "pass", label: "Links internos", message: "Hay enlaces internos.", value: `${internal.length} internos` };
}

function checkWordCount(content: string): SeoMetric {
  const count = wordCount(content);
  if (count < 200)
    return { status: "fail", label: "Longitud", message: "Contenido demasiado corto.", value: `${count} palabras`, suggestion: "Amplía el contenido a al menos 400 palabras (ideal para SEO)." };
  if (count < 400)
    return { status: "warn", label: "Longitud", message: "Contenido algo corto.", value: `${count} palabras`, suggestion: "Añade más detalle hasta superar las 400 palabras." };
  return { status: "pass", label: "Longitud", message: "Longitud adecuada.", value: `${count} palabras` };
}

// ─── Análisis central ───────────────────────────────────

const SCORE_MAP: Record<SeoStatus, number> = { pass: 100, warn: 60, fail: 15 };

export function analyzeSeo(input: SeoInput): SeoResult {
  const metrics: SeoMetric[] = [
    checkTitle(input.title, input.keywords),
    checkKeywords(input.keywords),
    checkExcerpt(input.excerpt),
    checkHeadings(input.content, input.keywords),
    checkImages(input.content),
    checkInternalLinks(input.content),
    checkWordCount(input.content),
  ];
  const raw = metrics.reduce((sum, m) => sum + SCORE_MAP[m.status], 0);
  const score = Math.round(raw / metrics.length);
  return { score, metrics };
}
