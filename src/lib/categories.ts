export const CATEGORIES = [
  "Handicrafts",
  "Textiles & Tailoring",
  "Food & Snacks",
  "Pottery & Home Decor",
  "Jewelry",
  "Woodwork",
  "Beauty & Wellness",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Listing {
  id: string;
  name: string;
  category: string;
  city: string;
  description: string;
  contact: string;
  date_added: string;
}

export function whatsappLink(contact: string, businessName: string) {
  let digits = contact.replace(/\D/g, "");
  // wa.me requires full international format — assume India for 10-digit numbers
  if (digits.length === 10) digits = `91${digits}`;
  const text = encodeURIComponent(
    `Namaste! I found ${businessName} on Hunar Hub and I'd like to know more about your work.`,
  );
  // wa.me opens the WhatsApp app on phones and WhatsApp Web on desktop.
  // WhatsApp refuses to load inside iframes (ERR_BLOCKED_BY_RESPONSE),
  // so this must only ever be opened as a new top-level tab (target=_blank),
  // never by navigating the current window/iframe.
  return `https://wa.me/${digits}?text=${text}`;
}

export function displayNumber(contact: string) {
  let digits = contact.replace(/\D/g, "");
  if (digits.length === 10) digits = `91${digits}`;
  return `+${digits}`;
}
