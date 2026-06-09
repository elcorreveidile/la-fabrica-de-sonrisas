"use client";

import { useState, useEffect } from "react";

type AdminView = "login" | "dashboard" | "treatments" | "leads";

interface Treatment {
  id: string;
  nombre: string;
  categoria: string;
  precio_min: number;
  precio_max: number;
  visible: boolean;
  es_precio_real: boolean;
}

interface Lead {
  id: string;
  nombre: string;
  email: string;
  origen: string;
  created_at: string;
}

export default function AdminClient() {
  const [view, setView] = useState<AdminView>("login");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("admin_authed") === "1") {
      setAuthed(true);
      setView("dashboard");
    }
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      sessionStorage.setItem("admin_authed", "1");
      setAuthed(true);
      setView("dashboard");
    } else {
      setError("Contraseña incorrecta");
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("admin_authed");
    setAuthed(false);
    setView("login");
  }

  if (!authed || view === "login") {
    return (
      <div className="pt-16 min-h-screen bg-[#fdf8f3] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-[#e07a5f] flex items-center justify-center text-white font-bold mx-auto mb-3">
              FS
            </div>
            <h1 className="text-2xl font-black text-[#2d2d2d]">Panel de administración</h1>
            <p className="text-[#8b7d72] text-sm mt-1">La Fábrica de Sonrisas</p>
          </div>

          <form onSubmit={handleLogin} className="bg-white rounded-3xl border border-[#f5ede0] p-6 space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>
            )}
            <div>
              <label className="block text-sm font-medium text-[#2d2d2d] mb-1.5">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-[#f5ede0] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#e07a5f]/30 bg-[#fdf8f3]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#e07a5f] text-white font-semibold hover:bg-[#c4614a] transition-colors"
            >
              Entrar
            </button>
          </form>

          <div className="mt-4 bg-[#fdf4eb] rounded-2xl p-4 text-xs text-[#8b7d72] text-center">
            Configura <code>ADMIN_PASSWORD</code> en las variables de entorno de Vercel.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-[#fdf8f3]">
      <div className="bg-white border-b border-[#f5ede0] px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-bold text-[#2d2d2d]">Admin</span>
            <div className="flex gap-1">
              {[
                { id: "dashboard", label: "Inicio" },
                { id: "treatments", label: "Tratamientos" },
                { id: "leads", label: "Leads" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id as AdminView)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    view === item.id
                      ? "bg-[#e07a5f] text-white"
                      : "text-[#8b7d72] hover:bg-[#f5ede0]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-[#8b7d72] hover:text-[#e07a5f] transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {view === "dashboard" && <AdminDashboard setView={setView} />}
        {view === "treatments" && <AdminTreatments />}
        {view === "leads" && <AdminLeads />}
      </div>
    </div>
  );
}

function AdminDashboard({ setView }: { setView: (v: AdminView) => void }) {
  return (
    <div>
      <h1 className="text-2xl font-black text-[#2d2d2d] mb-2">Panel de administración</h1>
      <p className="text-[#8b7d72] mb-8">Desde aquí puedes gestionar todos los contenidos de tu web.</p>
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: "🦷", title: "Tratamientos", desc: "Añade, edita u oculta tratamientos y sus precios", action: "treatments" },
          { icon: "📋", title: "Leads y citas", desc: "Ve las solicitudes recibidas y expórtalas a CSV", action: "leads" },
          { icon: "🧮", title: "Presupuestador", desc: "Configura las preguntas y opciones del wizard", action: "dashboard" },
        ].map((item) => (
          <button
            key={item.title}
            onClick={() => setView(item.action as AdminView)}
            className="bg-white rounded-3xl border border-[#f5ede0] p-6 text-left hover:shadow-md transition-shadow hover:border-[#e07a5f]/30"
          >
            <span className="text-3xl block mb-3">{item.icon}</span>
            <h3 className="font-bold text-[#2d2d2d] mb-1">{item.title}</h3>
            <p className="text-[#8b7d72] text-sm">{item.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function AdminTreatments() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/treatments")
      .then((r) => r.json())
      .then((data) => { setTreatments(data.treatments ?? []); setLoading(false); });
  }, []);

  async function toggleVisible(id: string, current: boolean) {
    await fetch("/api/admin/treatments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, visible: !current }),
    });
    setTreatments((prev) => prev.map((t) => t.id === id ? { ...t, visible: !current } : t));
  }

  if (loading) return <p className="text-[#8b7d72]">Cargando tratamientos...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-[#2d2d2d]">Tratamientos ({treatments.length})</h2>
      </div>

      {treatments.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#f5ede0] p-8 text-center text-[#8b7d72]">
          <p className="text-4xl mb-3">🔌</p>
          <p className="font-semibold">Conecta Vercel Postgres y ejecuta el seed para ver los tratamientos.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#f5ede0] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#fdf8f3] border-b border-[#f5ede0]">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-[#2d2d2d]">Tratamiento</th>
                <th className="text-left px-4 py-3 font-semibold text-[#2d2d2d] hidden sm:table-cell">Categoría</th>
                <th className="text-left px-4 py-3 font-semibold text-[#2d2d2d]">Precio</th>
                <th className="text-left px-4 py-3 font-semibold text-[#2d2d2d]">Visible</th>
              </tr>
            </thead>
            <tbody>
              {treatments.map((t) => (
                <tr key={t.id} className="border-b border-[#f5ede0] last:border-0 hover:bg-[#fdf8f3]">
                  <td className="px-4 py-3 font-medium text-[#2d2d2d]">{t.nombre}</td>
                  <td className="px-4 py-3 text-[#8b7d72] hidden sm:table-cell capitalize">{t.categoria}</td>
                  <td className="px-4 py-3 text-[#8b7d72]">
                    {t.precio_min}–{t.precio_max} €
                    {!t.es_precio_real && <span className="ml-1 text-xs text-[#e07a5f]">(orient.)</span>}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleVisible(t.id, t.visible)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        t.visible
                          ? "bg-[#7a9e7e]/10 text-[#5a7e5e] hover:bg-[#7a9e7e]/20"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {t.visible ? "✓ Visible" : "Oculto"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/leads")
      .then((r) => r.json())
      .then((data) => { setLeads(data.leads ?? []); setLoading(false); });
  }, []);

  function exportCSV() {
    const headers = ["Nombre", "Email", "Origen", "Fecha"];
    const rows = leads.map((l) => [l.nombre, l.email, l.origen, new Date(l.created_at).toLocaleString("es-ES")]);
    const csv = [headers, ...rows].map((r) => r.join(";")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads-fabrica-sonrisas.csv";
    a.click();
  }

  if (loading) return <p className="text-[#8b7d72]">Cargando leads...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-[#2d2d2d]">Solicitudes / Leads</h2>
        {leads.length > 0 && (
          <button
            onClick={exportCSV}
            className="px-4 py-2 rounded-full bg-[#7a9e7e] text-white text-sm font-medium hover:bg-[#5a7e5e] transition-colors"
          >
            ⬇️ Exportar CSV
          </button>
        )}
      </div>

      {leads.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#f5ede0] p-8 text-center text-[#8b7d72]">
          <p className="text-4xl mb-3">📭</p>
          <p className="font-semibold">Aún no hay leads.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#f5ede0] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#fdf8f3] border-b border-[#f5ede0]">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-[#2d2d2d]">Nombre</th>
                <th className="text-left px-4 py-3 font-semibold text-[#2d2d2d]">Email</th>
                <th className="text-left px-4 py-3 font-semibold text-[#2d2d2d] hidden sm:table-cell">Origen</th>
                <th className="text-left px-4 py-3 font-semibold text-[#2d2d2d] hidden sm:table-cell">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-b border-[#f5ede0] last:border-0 hover:bg-[#fdf8f3]">
                  <td className="px-4 py-3 font-medium text-[#2d2d2d]">{l.nombre}</td>
                  <td className="px-4 py-3 text-[#8b7d72]">{l.email}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-xs bg-[#e07a5f]/10 text-[#e07a5f] px-2 py-0.5 rounded-full font-medium">
                      {l.origen}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#8b7d72] text-xs hidden sm:table-cell">
                    {new Date(l.created_at).toLocaleString("es-ES")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
