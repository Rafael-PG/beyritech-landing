interface TrackPayload {
  page: string;
  referer?: string;
  source?: string;
}

interface WhatsappClickPayload extends TrackPayload {}

interface WhatsappLeadPayload extends TrackPayload {
  modelo: string;
  message: string;
}

interface FichaDownloadPayload extends TrackPayload {
  email: string;
  modelo: string;
}

function baseMetadata(): { page: string; referer: string; source: string } {
  return {
    page: typeof window !== "undefined" ? window.location.pathname : "",
    referer: typeof document !== "undefined" ? document.referrer : "",
    source: "organic",
  };
}

async function post<T>(url: string, body: T): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export function trackWhatsAppClick(): Promise<boolean> {
  return post<WhatsappClickPayload>("/api/track/whatsapp-click", baseMetadata());
}

export function trackWhatsAppLead(modelo: string, message: string): Promise<boolean> {
  const payload: WhatsappLeadPayload = { ...baseMetadata(), modelo, message };
  return post<WhatsappLeadPayload>("/api/track/whatsapp-lead", payload);
}

export function trackFichaDownload(email: string, modelo: string): Promise<boolean> {
  const payload: FichaDownloadPayload = { ...baseMetadata(), email, modelo };
  return post<FichaDownloadPayload>("/api/track/ficha-download", payload);
}
