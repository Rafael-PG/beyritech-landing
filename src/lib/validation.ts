export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const ALLOWED_MODELS = ["multispace", "doble-ala", "mini-doble-ala"] as const;
export type ModelSlug = (typeof ALLOWED_MODELS)[number];

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

export function isValidModelSlug(slug: string): boolean {
  return (ALLOWED_MODELS as readonly string[]).includes(slug);
}
