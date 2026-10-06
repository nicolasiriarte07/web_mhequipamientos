import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase/client";
import { LEAD_FROM_EMAIL, LEAD_NOTIFICATION_EMAIL } from "@/lib/business";

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  // Honeypot: si el campo oculto viene completo, es un bot. Fingimos éxito.
  if (body.sitio_web) {
    return NextResponse.json({ ok: true });
  }

  const nombre = String(body.nombre ?? "").trim();
  const telefono = String(body.telefono ?? "").trim();

  if (!nombre || !telefono) {
    return NextResponse.json(
      { error: "Completá al menos tu nombre y teléfono." },
      { status: 400 }
    );
  }

  const email = String(body.email ?? "").trim() || null;
  const nombreComercio = String(body.nombre_comercio ?? "").trim() || null;
  const mensaje = String(body.mensaje ?? "").trim() || null;

  const { error } = await supabase.from("leads_web").insert({
    nombre,
    telefono,
    email,
    nombre_comercio: nombreComercio,
    mensaje,
  });

  if (error) {
    console.error("Error guardando lead:", error.message);
    return NextResponse.json(
      { error: "No pudimos enviar tu consulta. Probá de nuevo o escribinos por WhatsApp." },
      { status: 500 }
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: LEAD_FROM_EMAIL,
        to: LEAD_NOTIFICATION_EMAIL,
        replyTo: email ?? undefined,
        subject: `Nueva cotización: ${nombre}`,
        html: `
          <h2>Nuevo pedido de cotización desde la web</h2>
          <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
          <p><strong>Teléfono:</strong> ${escapeHtml(telefono)}</p>
          ${email ? `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` : ""}
          ${nombreComercio ? `<p><strong>Comercio:</strong> ${escapeHtml(nombreComercio)}</p>` : ""}
          ${mensaje ? `<p><strong>Mensaje:</strong> ${escapeHtml(mensaje)}</p>` : ""}
        `,
      });
    } catch (emailError) {
      console.error("Error enviando email de notificación:", emailError);
    }
  }

  return NextResponse.json({ ok: true });
}
