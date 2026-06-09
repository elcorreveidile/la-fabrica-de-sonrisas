"use client";

import { useState } from "react";

export default function ContactoForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, origen: "contacto" }),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl border border-[#f5ede0] p-8 text-center">
        <p className="text-4xl mb-3">✅</p>
        <h3 className="text-xl font-black text-[#2d2d2d] mb-2">¡Mensaje recibido!</h3>
        <p className="text-[#8b7d72] text-sm">Te respondemos lo antes posible.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-[#f5ede0] p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#2d2d2d] mb-1.5">
          Nombre <span className="text-[#e07a5f]">*</span>
        </label>
        <input
          type="text"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
          className="w-full rounded-xl border border-[#f5ede0] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#e07a5f]/30 bg-[#fdf8f3]"
        />
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
          className="w-full rounded-xl border border-[#f5ede0] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#e07a5f]/30 bg-[#fdf8f3]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#2d2d2d] mb-1.5">
          Mensaje <span className="text-[#e07a5f]">*</span>
        </label>
        <textarea
          value={form.mensaje}
          onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
          required
          rows={4}
          className="w-full rounded-xl border border-[#f5ede0] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#e07a5f]/30 bg-[#fdf8f3] resize-none"
        />
      </div>
      <p className="text-xs text-[#8b7d72]">Demo — los datos no se almacenan permanentemente.</p>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-full bg-[#e07a5f] text-white font-semibold hover:bg-[#c4614a] transition-colors disabled:opacity-60"
      >
        {loading ? "Enviando..." : "Enviar mensaje →"}
      </button>
    </form>
  );
}
