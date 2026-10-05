"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { event } from "@/lib/gtag";
import { event as fbEvent } from "@/lib/fbpixel";

type Status = "idle" | "submitting" | "success" | "error";

export function QuoteRequestForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: si un bot completa este campo oculto, fingimos éxito sin
    // guardar nada. Una persona real nunca lo ve ni lo completa.
    if (data.get("sitio_web")) {
      setStatus("success");
      form.reset();
      return;
    }

    const nombre = String(data.get("nombre") ?? "").trim();
    const telefono = String(data.get("telefono") ?? "").trim();

    if (!nombre || !telefono) {
      setStatus("error");
      setErrorMsg("Completá al menos tu nombre y teléfono.");
      return;
    }

    setStatus("submitting");

    const { error } = await supabase.from("leads_web").insert({
      nombre,
      telefono,
      email: String(data.get("email") ?? "").trim() || null,
      nombre_comercio: String(data.get("nombre_comercio") ?? "").trim() || null,
      mensaje: String(data.get("mensaje") ?? "").trim() || null,
    });

    if (error) {
      setStatus("error");
      setErrorMsg("No pudimos enviar tu consulta. Probá de nuevo o escribinos por WhatsApp.");
      return;
    }

    event("generate_lead", { method: "web_form" });
    fbEvent("Lead");
    setStatus("success");
    form.reset();
  }

  if (status === "success") {
    return (
      <div className="rounded-xl bg-green-50 p-6 text-center">
        <p className="font-semibold text-green-800">¡Listo! Recibimos tu consulta.</p>
        <p className="mt-1 text-sm text-green-700">
          Te vamos a contactar a la brevedad para ayudarte.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="sitio_web"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nombre" className="text-sm font-medium text-gray-700">
            Nombre *
          </label>
          <input
            id="nombre"
            name="nombre"
            required
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>
        <div>
          <label htmlFor="telefono" className="text-sm font-medium text-gray-700">
            Teléfono *
          </label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            required
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>
        <div>
          <label htmlFor="nombre_comercio" className="text-sm font-medium text-gray-700">
            Nombre del comercio
          </label>
          <input
            id="nombre_comercio"
            name="nombre_comercio"
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>
      </div>

      <div>
        <label htmlFor="mensaje" className="text-sm font-medium text-gray-700">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={3}
          placeholder="Contanos qué necesitás..."
          className="mt-1 w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand"
        />
      </div>

      {status === "error" && <p className="text-sm text-red-600">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        {status === "submitting" ? "Enviando..." : "Pedir cotización"}
      </button>
    </form>
  );
}
