const TOKEN_KEY = "beyritech_dash_token";

export function getToken(): string | null {
  return typeof window !== "undefined" ? window.localStorage.getItem(TOKEN_KEY) : null;
}

export function setToken(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

export async function login(password: string): Promise<boolean> {
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) return false;
    const data = await res.json();
    if (data.token) {
      setToken(data.token);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

async function getData<T>(path: string): Promise<T | null> {
  const token = getToken();
  if (!token) return null;
  try {
    const res = await fetch(path, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 401) {
      clearToken();
      return null;
    }
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export interface WhatsappClickRow {
  idClicks: number;
  page: string | null;
  referer: string | null;
  source: string | null;
  created_at: string;
}

export interface WhatsappLeadRow {
  idWspLead: number;
  modelo: string;
  message: string | null;
  page: string | null;
  referer: string | null;
  created_at: string;
}

export interface FichaLeadRow {
  idFichaLead: number;
  email: string;
  modelo: string;
  page: string | null;
  referer: string | null;
  created_at: string;
}

export function getWhatsappClicks(): Promise<WhatsappClickRow[] | null> {
  return getData<WhatsappClickRow[]>("/api/dashboard/whatsapp-clicks");
}

export function getWhatsappLeads(): Promise<WhatsappLeadRow[] | null> {
  return getData<WhatsappLeadRow[]>("/api/dashboard/whatsapp-leads");
}

export function getFichaLeads(): Promise<FichaLeadRow[] | null> {
  return getData<FichaLeadRow[]>("/api/dashboard/ficha-leads");
}

// ─── CMS: Artículos y Casos de éxito ────────────────────
export interface CmsPost {
  idBlog: number;
  slug: string;
  modelo: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  image: string | null;
  featured: number | boolean;
  trafficRank: number;
  isNew: number | boolean;
  keywords: string | null;
  published: number | boolean;
  gallery?: string[] | null;
}

export interface CmsListItem {
  id: number;
  slug: string;
  modelo: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  image: string | null;
  featured: number | boolean;
  isNew: number | boolean;
  published: number | boolean;
  updatedAt: string;
}

export type CmsKind = "blog" | "casos";

function adminUrl(kind: CmsKind, id?: number) {
  const base = `/api/admin/${kind === "blog" ? "blog" : "casos-exito"}`;
  return id ? `${base}/${id}` : base;
}

async function authedJson(path: string, method: string, body?: unknown): Promise<any> {
  const token = getToken();
  if (!token) return { ok: false, status: 401 };
  try {
    const res = await fetch(path, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    if (res.status === 401) {
      clearToken();
      return { ok: false, status: 401 };
    }
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { ok: false, status: res.status, error: data.error as string | undefined };
    }
    return { ok: true, status: res.status, data: await res.json() };
  } catch {
    return { ok: false, status: 0 };
  }
}

export async function listCms(kind: CmsKind): Promise<CmsListItem[]> {
  const res = await authedJson(adminUrl(kind), "GET");
  if (!res.ok) return [];
  const rows = res.data as any[];
  return rows.map((r) => ({
    id: kind === "blog" ? r.idBlog : r.idCasos,
    slug: r.slug,
    modelo: r.modelo,
    title: r.title,
    excerpt: r.excerpt,
    date: r.date,
    author: r.author,
    readTime: r.readTime,
    image: r.image,
    featured: r.featured,
    isNew: r.isNew,
    published: r.published,
    updatedAt: r.updatedAt,
  }));
}

export async function getCms(kind: CmsKind, id: number): Promise<CmsPost | null> {
  const res = await authedJson(adminUrl(kind, id), "GET");
  if (!res.ok) return null;
  const r = res.data;
  return {
    idBlog: r.idBlog ?? r.idCasos,
    slug: r.slug,
    modelo: r.modelo,
    title: r.title,
    excerpt: r.excerpt,
    content: r.content,
    date: r.date,
    author: r.author,
    readTime: r.readTime,
    image: r.image,
    featured: r.featured,
    trafficRank: r.trafficRank,
    isNew: r.isNew,
    keywords: r.keywords,
    published: r.published,
    gallery: r.gallery,
  };
}

export async function createCms(kind: CmsKind, payload: Record<string, unknown>): Promise<{ ok: boolean; error?: string; id?: number }> {
  const res = await authedJson(adminUrl(kind), "POST", payload);
  if (!res.ok) return { ok: false, error: res.error };
  return { ok: true, id: res.data?.id };
}

export async function updateCms(kind: CmsKind, id: number, payload: Record<string, unknown>): Promise<{ ok: boolean; error?: string }> {
  const res = await authedJson(adminUrl(kind, id), "PUT", payload);
  if (!res.ok) return { ok: false, error: res.error };
  return { ok: true };
}

export async function deleteCms(kind: CmsKind, id: number): Promise<boolean> {
  const res = await authedJson(adminUrl(kind, id), "DELETE");
  return res.ok;
}

export async function uploadCmsImage(file: File, modelo: string, slug: string): Promise<string | null> {
  const token = getToken();
  if (!token) return null;
  const fd = new FormData();
  fd.append("file", file);
  fd.append("modelo", modelo);
  fd.append("slug", slug);
  try {
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.url || null;
  } catch {
    return null;
  }
}
