/**
 * Utility functions for transforming article HTML:
 * - Adds anchors to <h2> headings for Table of Contents (TOC)
 * - Extracts TOC items
 * - Groups consecutive images to display side-by-side
 * - Injects lazy loading attributes
 */

export function extractToc(html: string): { id: string; text: string }[] {
  const h2Regex = /<h2[^>]*>(.*?)<\/h2>/gi;
  const items: { id: string; text: string }[] = [];
  let match;
  let index = 0;
  while ((match = h2Regex.exec(html)) !== null) {
    let text = match[1].replace(/<[^>]+>/g, "").trim();
    if (!text) continue;
    // Strip leading number like "1. ", "2) ", etc. to avoid duplicate index numbers
    text = text.replace(/^\d+[\.\-\)]\s*/, "");
    items.push({ id: `h2-${index++}`, text });
  }
  return items;
}

export function addTocAnchors(html: string): string {
  let index = 0;
  return html.replace(/<h2/gi, () => `<h2 id="h2-${index++}" style="scroll-margin-top:120px"`);
}

export function groupConsecutiveImages(html: string): string {
  let result = html;
  // 1. Group consecutive <figure class="img-figure">
  result = result.replace(
    /(<figure[^>]*class="img-figure"[^>]*>[\s\S]*?<\/figure>)((?:\s*(?:<br\s*\/?>)?\s*<figure[^>]*class="img-figure"[^>]*>[\s\S]*?<\/figure>)+)/gi,
    (match) => {
      const figures = match.replace(/<br\s*\/?>/gi, "");
      return `<div class="article-img-row grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">${figures}</div>`;
    }
  );

  // 2. Group consecutive <img>
  result = result.replace(
    /(<img[^>]*>)((?:\s*(?:<br\s*\/?>)?\s*<img[^>]*>)+)/gi,
    (match) => {
      const imgs = match.replace(/<br\s*\/?>/gi, "");
      return `<div class="article-img-row grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">${imgs}</div>`;
    }
  );

  return result;
}

export function addLazyLoading(html: string): string {
  return html.replace(/<img\s/gi, '<img loading="lazy" decoding="async" ');
}

export function processArticleHtml(rawHtml: string): { html: string; toc: { id: string; text: string }[] } {
  const toc = extractToc(rawHtml);
  const withAnchors = addTocAnchors(rawHtml);
  const withGroups = groupConsecutiveImages(withAnchors);
  const finalHtml = addLazyLoading(withGroups);
  return { html: finalHtml, toc };
}
