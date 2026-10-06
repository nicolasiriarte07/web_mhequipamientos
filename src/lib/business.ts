export const BUSINESS_NAME = "MH Equipamientos";
export const BUSINESS_ADDRESS = "Yrigoyen 727, Carhué, Provincia de Buenos Aires";
export const BUSINESS_HOURS = [
  { dias: "Lunes a Viernes", horario: "8:00 a 12:00 y 16:00 a 20:00" },
  { dias: "Sábados", horario: "8:30 a 12:30" },
];

// Mismos datos de arriba, pero en las piezas que piden los datos estructurados
// (schema.org PostalAddress / OpeningHoursSpecification) en vez de los textos
// ya armados para mostrar en pantalla.
export const BUSINESS_STREET_ADDRESS = "Yrigoyen 727";
export const BUSINESS_CITY = "Carhué";
export const BUSINESS_REGION = "Buenos Aires";
export const BUSINESS_COUNTRY = "AR";

export const BUSINESS_OPENING_HOURS = [
  { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "12:00" },
  { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "16:00", closes: "20:00" },
  { dayOfWeek: ["Saturday"], opens: "08:30", closes: "12:30" },
];

export const INSTAGRAM_URL = "https://www.instagram.com/equipamientos.mh/";

export const PAYMENT_METHODS = [
  "Cheques hasta 210 días",
  "Todas las tarjetas",
  "Cuotas semanales y mensuales",
  "Descuento por pago contado",
  "Descuento extra por compra por cantidad",
];

export const SITE_URL = "https://equipamientosmh.com.ar";

export const LEAD_NOTIFICATION_EMAIL = "ventas@mundohogar.com.ar";
export const LEAD_FROM_EMAIL = "MH Equipamientos <notificaciones@equipamientosmh.com.ar>";
