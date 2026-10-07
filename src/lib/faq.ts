import type { AccordionItemData } from "@/components/Accordion";
import { BUSINESS_ADDRESS, BUSINESS_HOURS } from "@/lib/business";

const horariosTexto = BUSINESS_HOURS.map((h) => `${h.dias} de ${h.horario}`).join(", ");

export const FAQ_ITEMS: AccordionItemData[] = [
  {
    question: "¿Cómo hago para comprar?",
    answer:
      "Elegís el o los productos que necesitás, los agregás al carrito y hacés clic en el botón para cotizar por WhatsApp. Ahí nuestro equipo de ventas se contacta directo con vos por ese medio para coordinar el pago y la entrega.",
  },
  {
    question: "¿Qué medios de pago aceptan?",
    answer:
      "Aceptamos todas las tarjetas, cheques hasta 210 días, y tenés descuento por pago contado. También ofrecemos la posibilidad de financiación semanal o mensual, y descuento extra si comprás por cantidad.",
  },
  {
    question: "¿Hacen envíos a mi localidad? ¿Tiene costo?",
    answer:
      "Sí. Tenemos envío gratis dentro de un radio de 120 km de Carhué, y entrega a convenir para localidades más lejanas, hasta 450 km. Podés ver el mapa de cobertura completo en la home.",
  },
  {
    question: "¿Puedo retirar en el local? ¿Cuáles son los horarios?",
    answer: `Sí, podés retirar tu compra en nuestro local de ${BUSINESS_ADDRESS}. Atendemos ${horariosTexto}.`,
  },
  {
    question: "¿Hacen factura A o B?",
    answer: "Sí, emitimos factura A y factura B.",
  },
  {
    question: "¿Qué pasa si el producto llega con alguna falla?",
    answer:
      "Por el momento no tenemos un proceso formal armado para esto, pero si te llega algo con un problema escribinos por WhatsApp y lo resolvemos directamente con vos.",
  },
  {
    question: "¿Los equipos son todos nuevos o también venden usados?",
    answer: "Todos nuestros equipos son nuevos.",
  },
  {
    question: "¿Instalan el equipo que compro?",
    answer:
      "No, no realizamos instalación. El equipo llega listo para que lo instale el comprador o un técnico de tu confianza.",
  },
  {
    question: "¿Puedo cambiar o devolver un producto?",
    answer:
      "Por el momento no contamos con una política formal de cambios o devoluciones. Si tenés algún inconveniente con tu compra, escribinos por WhatsApp y vemos cómo ayudarte.",
  },
];
