export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

export function addTocAnchors(html: string): string {
  let index = 0;
  return html.replace(/<h2(?![^>]*id=)[^>]*>/gi, (match) => {
    const id = `seccion-${++index}`;
    return match.replace(/^<h2/, `<h2 id="${id}"`);
  });
}

export function groupConsecutiveImages(html: string): string {
  return html.replace(
    /(<img[^>]*>\s*){2,}/gi,
    (block) =>
      `<div class="flex flex-col sm:flex-row gap-4 my-6">${block.trim()}</div>`
  );
}

export function addLazyLoading(html: string): string {
  return html.replace(/<img(?![^>]*loading=)[^>]*>/gi, (tag) => {
    return tag.replace(/^<img/, '<img loading="lazy"');
  });
}

export function processHtml(html: string): string {
  return addLazyLoading(groupConsecutiveImages(addTocAnchors(html || "")));
}

export function extractHeadings(html: string): { id: string; text: string }[] {
  const temp = document.createElement("div");
  temp.innerHTML = addTocAnchors(html || "");
  return Array.from(temp.querySelectorAll("h1, h2, h3")).map((el) => ({
    id: el.id,
    text: el.textContent?.trim() || "",
  }));
}
