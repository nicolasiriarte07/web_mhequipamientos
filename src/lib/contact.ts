export const WHATSAPP_PHONE = "5492923507782";
export const PHONE_TEL = "+542923507782";
export const PHONE_DISPLAY = "2923 50-7782";

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
