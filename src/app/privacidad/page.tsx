import type { Metadata } from "next";
import { BUSINESS_ADDRESS, BUSINESS_NAME, LEAD_NOTIFICATION_EMAIL, SITE_URL } from "@/lib/business";
import { PHONE_DISPLAY } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Cómo recopilamos, usamos y protegemos tus datos personales en MH Equipamientos.",
  alternates: { canonical: "/privacidad" },
};

const LAST_UPDATED = "6 de octubre de 2026";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      <div className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-gray-600">
        {children}
      </div>
    </div>
  );
}

export default function PrivacidadPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Política de Privacidad</h1>
        <p className="mt-2 text-sm text-gray-500">Última actualización: {LAST_UPDATED}</p>
        <p className="mt-4 text-sm leading-relaxed text-gray-600">
          En {BUSINESS_NAME} nos importa tu privacidad. Esta política explica qué datos
          recopilamos cuando visitás {SITE_URL}, para qué los usamos y qué derechos tenés sobre
          ellos.
        </p>

        <Section title="1. Responsable del tratamiento de datos">
          <p>
            <strong>{BUSINESS_NAME}</strong> (división de Mundo Hogar), con domicilio en{" "}
            {BUSINESS_ADDRESS}, es responsable de los datos personales que se recopilan a través
            de este sitio. Podés contactarnos por email a{" "}
            <a href={`mailto:${LEAD_NOTIFICATION_EMAIL}`} className="text-brand underline">
              {LEAD_NOTIFICATION_EMAIL}
            </a>{" "}
            o por teléfono al {PHONE_DISPLAY}.
          </p>
        </Section>

        <Section title="2. Qué datos recopilamos">
          <p>
            <strong>Datos que nos das vos:</strong> cuando completás el formulario de cotización,
            recopilamos tu nombre, teléfono, email (opcional), nombre de tu comercio (opcional) y
            el mensaje que nos dejes. Son los datos mínimos necesarios para poder responderte.
          </p>
          <p>
            <strong>Datos de navegación:</strong> usamos Google Analytics para entender cómo se
            usa el sitio (páginas visitadas, dispositivo, ubicación aproximada) y Meta Pixel para
            medir la efectividad de nuestra publicidad en Facebook e Instagram.
          </p>
          <p>
            <strong>Carrito y productos vistos:</strong> se guardan únicamente en tu navegador
            (localStorage). No los enviamos a nuestros servidores hasta que confirmás un pedido
            por WhatsApp.
          </p>
        </Section>

        <Section title="3. Para qué usamos tus datos">
          <ul className="list-disc space-y-1 pl-5">
            <li>Responder tu consulta y armar una cotización.</li>
            <li>Coordinar la venta, el pago y la entrega por WhatsApp o email.</li>
            <li>Medir el uso del sitio y mejorar la experiencia de compra.</li>
            <li>Mostrarte publicidad relevante en Meta (Facebook/Instagram) y medir su resultado.</li>
          </ul>
          <p>No usamos tus datos para ningún otro fin, ni los vendemos a terceros.</p>
        </Section>

        <Section title="4. Con quién compartimos tus datos">
          <p>
            Para poder operar el sitio, compartimos datos con estos proveedores, que actúan como
            encargados del tratamiento:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>Supabase</strong>: alojamiento de la base de datos donde se guardan las
              consultas del formulario.
            </li>
            <li>
              <strong>Resend</strong>: envío del email de notificación cuando pedís una
              cotización.
            </li>
            <li>
              <strong>Google Analytics</strong> (Google LLC): estadísticas de uso del sitio.
            </li>
            <li>
              <strong>Meta Platforms, Inc.</strong> (Meta Pixel): medición y optimización de
              publicidad en Facebook e Instagram.
            </li>
            <li>
              <strong>WhatsApp / Meta</strong>: cuando nos escribís por ese medio, la conversación
              queda sujeta también a las políticas de privacidad de WhatsApp.
            </li>
          </ul>
        </Section>

        <Section title="5. Cookies y tecnologías similares">
          <p>
            Google Analytics y Meta Pixel usan cookies y tecnologías similares para identificar tu
            navegador y entender cómo interactuás con el sitio. Podés bloquear o eliminar estas
            cookies desde la configuración de tu navegador; el sitio sigue funcionando igual, solo
            dejamos de recibir esas estadísticas.
          </p>
        </Section>

        <Section title="6. Tus derechos">
          <p>
            De acuerdo con la Ley 25.326 de Protección de Datos Personales, tenés derecho a
            acceder, rectificar, actualizar o solicitar la eliminación de tus datos personales en
            cualquier momento. Para ejercer estos derechos, escribinos a{" "}
            <a href={`mailto:${LEAD_NOTIFICATION_EMAIL}`} className="text-brand underline">
              {LEAD_NOTIFICATION_EMAIL}
            </a>
            .
          </p>
          <p>
            La Agencia de Acceso a la Información Pública (AAIP), en su carácter de órgano de
            control de la Ley 25.326, tiene la atribución de atender denuncias y reclamos que
            interpongan quienes resulten afectados en sus derechos por incumplimiento de las
            normas vigentes en materia de protección de datos personales.
          </p>
        </Section>

        <Section title="7. Seguridad">
          <p>
            Tomamos medidas razonables para proteger tus datos personales contra accesos no
            autorizados, pérdida o alteración. Sin embargo, ningún sistema es 100% infalible, y no
            podemos garantizar la seguridad absoluta de la información transmitida por internet.
          </p>
        </Section>

        <Section title="8. Cambios a esta política">
          <p>
            Podemos actualizar esta política ocasionalmente para reflejar cambios en el sitio o en
            la normativa vigente. La fecha de la última actualización figura al principio de esta
            página.
          </p>
        </Section>
      </div>
    </div>
  );
}
