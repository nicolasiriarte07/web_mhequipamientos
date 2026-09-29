export const WHATSAPP_PHONE = "5492923507782";

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
