"use client";

import { useState } from "react";

const MOTIVOS = [
  "Revisión general / primera visita",
  "Ortodoncia",
  "Implantes",
  "Estética dental / blanqueamiento",
  "Dolor o urgencia",
  "Encías / periodoncia",
  "Niños / odontopediatría",
  "Otro",
];

export default function CitaForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    email: "",
    motivo: "",
    horario: "",
    mensaje: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, origen: "cita" }),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl border border-[#f5ede0] p-8 text-center">
        <p className="text-5xl mb-4">🎉</p>
        <h2 className="text-2xl font-black text-[#2d2d2d] mb-3">
          ¡Gracias, {form.nombre}!
        </h2>
        <p className="text-[#8b7d72] leading-relaxed">
          Hemos recibido tu solicitud. Nos pondremos en contacto contigo en las próximas horas para confirmar tu cita.
          ¡Nos alegramos de conocerte pronto!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-[#f5ede0] p-6 md:p-8 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#2d2d2d] mb-1.5">
            Nombre <span className="text-[#e07a5f]">*</span>
          </label>
          <input
            type="text"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            required
            placeholder="Tu nombre"
            className="w-full rounded-xl border border-[#f5ede0] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#e07a5f]/30 bg-[#fdf8f3]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#2d2d2d] mb-1.5">Teléfono</label>
          <input
            type="tel"
            value={form.telefono}
            onChange={(e) => setForm({ ...form, telefono: e.target.value })}
            placeholder="600 000 000"
            className="w-full rounded-xl border border-[#f5ede0] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#e07a5f]/30 bg-[#fdf8f3]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#2d2d2d] mb-1.5">
          Email <span className="text-[#e07a5f]">*</span>
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          placeholder="tu@email.com"
          className="w-full rounded-xl border border-[#f5ede0] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#e07a5f]/30 bg-[#fdf8f3]"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#2d2d2d] mb-1.5">Motivo de la consulta</label>
          <select
            value={form.motivo}
            onChange={(e) => setForm({ ...form, motivo: e.target.value })}
            className="w-full rounded-xl border border-[#f5ede0] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#e07a5f]/30 bg-[#fdf8f3]"
          >
            <option value="">Selecciona...</option>
            {MOTIVOS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#2d2d2d] mb-1.5">Prefiero el horario</label>
          <select
            value={form.horario}
            onChange={(e) => setForm({ ...form, horario: e.target.value })}
            className="w-full rounded-xl border border-[#f5ede0] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#e07a5f]/30 bg-[#fdf8f3]"
          >
            <option value="">Sin preferencia</option>
            <option value="mañana">Mañana (9:30–13:30)</option>
            <option value="tarde">Tarde (13:30–18:30)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#2d2d2d] mb-1.5">¿Algo más que quieras contarnos?</label>
        <textarea
          value={form.mensaje}
          onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
          rows={3}
          placeholder="Cualquier cosa que nos ayude a preparar tu visita..."
          className="w-full rounded-xl border border-[#f5ede0] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#e07a5f]/30 bg-[#fdf8f3] resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-full bg-[#e07a5f] text-white font-bold hover:bg-[#c4614a] transition-colors disabled:opacity-60 text-lg"
      >
        {loading ? "Enviando..." : "Solicitar cita →"}
      </button>
    </form>
  );
}
