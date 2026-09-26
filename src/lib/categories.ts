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
  const digits = contact.replace(/\D/g, "");
  const text = encodeURIComponent(
    `Namaste! I found ${businessName} on Hunar Hub and I'd like to know more about your work.`,
  );
  return `https://wa.me/${digits}?text=${text}`;
}
