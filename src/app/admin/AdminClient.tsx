"use client";

import { useState, useEffect } from "react";

type AdminView = "login" | "dashboard" | "treatments" | "leads" | "wizard";

interface Treatment {
  id: string;
  slug: string;
  nombre: string;
  categoria: string;
  descripcion_corta: string;
  precio_min: number;
  precio_max: number;
  unidad: string;
  es_precio_real: boolean;
  visible: boolean;
  orden: number;
}

interface Lead {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
  origen: string;
  created_at: string;
}

const CATEGORIAS = [
  { value: "ortodoncia", label: "Ortodoncia" },
  { value: "implantes", label: "Implantes" },
  { value: "estetica", label: "Estética dental" },
  { value: "periodoncia", label: "Periodoncia" },
  { value: "cirugia", label: "Cirugía oral" },
  { value: "general", label: "Odontología general" },
  { value: "odontopediatria", label: "Odontopediatría" },
];

const UNIDADES = ["tratamiento", "pieza", "arcada", "sesion"];

const EMPTY_TREATMENT: Omit<Treatment, "id"> = {
  slug: "", nombre: "", categoria: "general", descripcion_corta: "",
  precio_min: 0, precio_max: 0, unidad: "tratamiento",
  es_precio_real: false, visible: true, orden: 0,
};

// ─── Wizard steps data (editable in UI) ───────────────────────────────────────
import { WIZARD_STEPS } from "@/lib/budget-wizard";

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
            <div className="w-12 h-12 rounded-full bg-[#e07a5f] flex items-center justify-center text-white font-bold mx-auto mb-3">FS</div>
            <h1 className="text-2xl font-black text-[#2d2d2d]">Panel de administración</h1>
            <p className="text-[#8b7d72] text-sm mt-1">La Fábrica de Sonrisas</p>
          </div>
          <form onSubmit={handleLogin} className="bg-white rounded-3xl border border-[#f5ede0] p-6 space-y-4">
            {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>}
            <div>
              <label className="block text-sm font-medium text-[#2d2d2d] mb-1.5">Contraseña</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full rounded-xl border border-[#f5ede0] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c2b97f]/40 focus:border-[#c2b97f] bg-[#fdf8f3]" />
            </div>
            <button type="submit" className="w-full py-3 rounded-full bg-[#e07a5f] text-white font-semibold hover:bg-[#c4614a] transition-colors">
              Entrar
            </button>
          </form>
          <div className="mt-4 bg-[#fdf4eb] rounded-2xl p-4 text-xs text-[#8b7d72] text-center">
            Contraseña configurada en <code>ADMIN_PASSWORD</code> (Vercel env vars).
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
            <div className="flex gap-1 overflow-x-auto">
              {([
                { id: "dashboard", label: "Inicio" },
                { id: "treatments", label: "Tratamientos" },
                { id: "wizard", label: "Presupuestador" },
                { id: "leads", label: "Leads" },
              ] as { id: AdminView; label: string }[]).map((item) => (
                <button key={item.id} onClick={() => setView(item.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    view === item.id ? "bg-[#e07a5f] text-white" : "text-[#8b7d72] hover:bg-[#f5ede0]"
                  }`}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <button onClick={handleLogout} className="text-sm text-[#8b7d72] hover:text-[#e07a5f] transition-colors">
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {view === "dashboard" && <AdminDashboard setView={setView} />}
        {view === "treatments" && <AdminTreatments />}
        {view === "wizard" && <AdminWizard />}
        {view === "leads" && <AdminLeads />}
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function AdminDashboard({ setView }: { setView: (v: AdminView) => void }) {
  return (
    <div>
      <h1 className="text-2xl font-black text-[#2d2d2d] mb-2">Panel de administración</h1>
      <p className="text-[#8b7d72] mb-8">Gestiona todos los contenidos de tu web sin tocar código.</p>
      <div className="grid sm:grid-cols-3 gap-4">
        {([
          { icon: "🦷", title: "Tratamientos", desc: "Crea, edita, oculta y reordena tratamientos y precios", action: "treatments" },
          { icon: "🧮", title: "Presupuestador", desc: "Revisa las preguntas y opciones del wizard interactivo", action: "wizard" },
          { icon: "📋", title: "Leads y citas", desc: "Ve las solicitudes recibidas y expórtalas a CSV", action: "leads" },
        ] as { icon: string; title: string; desc: string; action: AdminView }[]).map((item) => (
          <button key={item.title} onClick={() => setView(item.action)}
            className="bg-white rounded-3xl border border-[#f5ede0] p-6 text-left hover:shadow-md transition-shadow hover:border-[#e07a5f]/30">
            <span className="text-3xl block mb-3">{item.icon}</span>
            <h3 className="font-bold text-[#2d2d2d] mb-1">{item.title}</h3>
            <p className="text-[#8b7d72] text-sm">{item.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Treatments CRUD ──────────────────────────────────────────────────────────
function AdminTreatments() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Treatment | Omit<Treatment, "id"> | null>(null);
  const [saving, setSaving] = useState(false);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => { loadTreatments(); }, []);

  async function loadTreatments() {
    setLoading(true);
    const r = await fetch("/api/admin/treatments");
    const data = await r.json();
    setTreatments(data.treatments ?? []);
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    await fetch("/api/admin/treatments", {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    setSaving(false);
    setEditing(null);
    loadTreatments();
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Seguro que quieres eliminar este tratamiento?")) return;
    await fetch("/api/admin/treatments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadTreatments();
  }

  async function toggleVisible(id: string, current: boolean) {
    await fetch("/api/admin/treatments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, visible: !current }),
    });
    setTreatments((prev) => prev.map((t) => t.id === id ? { ...t, visible: !current } : t));
  }

  if (editing) {
    const t = editing as Treatment & { id?: string };
    return (
      <div>
        <button onClick={() => setEditing(null)} className="mb-6 text-sm text-[#e07a5f] hover:underline flex items-center gap-1">
          ← Volver a la lista
        </button>
        <h2 className="text-xl font-black text-[#2d2d2d] mb-6">{isNew ? "Nuevo tratamiento" : "Editar tratamiento"}</h2>
        <form onSubmit={handleSave} className="bg-white rounded-3xl border border-[#f5ede0] p-6 space-y-4 max-w-2xl">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Nombre *">
              <input required value={t.nombre} onChange={(e) => setEditing({ ...t, nombre: e.target.value })}
                className={inputCls} placeholder="Ej: Ortodoncia invisible" />
            </Field>
            <Field label="Slug *">
              <input required value={t.slug} onChange={(e) => setEditing({ ...t, slug: e.target.value })}
                className={inputCls} placeholder="ortodoncia-invisible" />
            </Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Categoría">
              <select value={t.categoria} onChange={(e) => setEditing({ ...t, categoria: e.target.value })} className={inputCls}>
                {CATEGORIAS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </Field>
            <Field label="Unidad de precio">
              <select value={t.unidad} onChange={(e) => setEditing({ ...t, unidad: e.target.value })} className={inputCls}>
                {UNIDADES.map((u) => <option key={u} value={u}>{u}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Descripción corta *">
            <textarea required rows={2} value={t.descripcion_corta}
              onChange={(e) => setEditing({ ...t, descripcion_corta: e.target.value })}
              className={`${inputCls} resize-none`} placeholder="Una frase que aparece en la tarjeta del catálogo" />
          </Field>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Precio mínimo (€)">
              <input type="number" min={0} value={t.precio_min}
                onChange={(e) => setEditing({ ...t, precio_min: Number(e.target.value) })} className={inputCls} />
            </Field>
            <Field label="Precio máximo (€)">
              <input type="number" min={0} value={t.precio_max}
                onChange={(e) => setEditing({ ...t, precio_max: Number(e.target.value) })} className={inputCls} />
            </Field>
            <Field label="Orden">
              <input type="number" value={t.orden}
                onChange={(e) => setEditing({ ...t, orden: Number(e.target.value) })} className={inputCls} />
            </Field>
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={t.visible} onChange={(e) => setEditing({ ...t, visible: e.target.checked })}
                className="w-4 h-4 accent-[#e07a5f]" />
              Visible en el catálogo
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={t.es_precio_real} onChange={(e) => setEditing({ ...t, es_precio_real: e.target.checked })}
                className="w-4 h-4 accent-[#e07a5f]" />
              Precio real de la clínica
            </label>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving}
              className="px-6 py-3 rounded-full bg-[#e07a5f] text-white font-semibold hover:bg-[#c4614a] transition-colors disabled:opacity-60">
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
            <button type="button" onClick={() => setEditing(null)}
              className="px-6 py-3 rounded-full border border-[#f5ede0] text-[#8b7d72] hover:bg-[#f5ede0] transition-colors">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (loading) return <p className="text-[#8b7d72]">Cargando tratamientos...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-[#2d2d2d]">Tratamientos ({treatments.length})</h2>
        <button onClick={() => { setEditing({ ...EMPTY_TREATMENT }); setIsNew(true); }}
          className="px-4 py-2 rounded-full bg-[#e07a5f] text-white text-sm font-semibold hover:bg-[#c4614a] transition-colors">
          + Nuevo tratamiento
        </button>
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
                <th className="text-left px-4 py-3 font-semibold text-[#2d2d2d] hidden md:table-cell">Categoría</th>
                <th className="text-left px-4 py-3 font-semibold text-[#2d2d2d]">Precio</th>
                <th className="text-left px-4 py-3 font-semibold text-[#2d2d2d]">Estado</th>
                <th className="text-left px-4 py-3 font-semibold text-[#2d2d2d]">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {treatments.map((t) => (
                <tr key={t.id} className="border-b border-[#f5ede0] last:border-0 hover:bg-[#fdf8f3]">
                  <td className="px-4 py-3 font-medium text-[#2d2d2d]">{t.nombre}</td>
                  <td className="px-4 py-3 text-[#8b7d72] hidden md:table-cell capitalize">{t.categoria}</td>
                  <td className="px-4 py-3 text-[#8b7d72]">
                    {t.precio_min === 0 && t.precio_max === 0 ? "Gratuita" : `${t.precio_min}–${t.precio_max} €`}
                    {!t.es_precio_real && t.precio_min > 0 && <span className="ml-1 text-xs text-[#e07a5f]">(orient.)</span>}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleVisible(t.id, t.visible)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        t.visible ? "bg-[#7a9e7e]/10 text-[#5a7e5e] hover:bg-[#7a9e7e]/20" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}>
                      {t.visible ? "✓ Visible" : "Oculto"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => { setEditing({ ...t }); setIsNew(false); }}
                        className="px-3 py-1 rounded-full bg-[#e07a5f]/10 text-[#e07a5f] text-xs font-medium hover:bg-[#e07a5f]/20 transition-colors">
                        Editar
                      </button>
                      <button onClick={() => handleDelete(t.id)}
                        className="px-3 py-1 rounded-full bg-red-50 text-red-500 text-xs font-medium hover:bg-red-100 transition-colors">
                        Eliminar
                      </button>
                    </div>
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

// ─── Wizard viewer ─────────────────────────────────────────────────────────────
function AdminWizard() {
  return (
    <div>
      <h2 className="text-xl font-black text-[#2d2d2d] mb-2">Presupuestador — Estructura del wizard</h2>
      <p className="text-[#8b7d72] text-sm mb-6">
        Las preguntas y opciones están definidas en el código (<code className="bg-[#f5ede0] px-1 rounded">src/lib/budget-wizard.ts</code>).
        Aquí puedes revisarlas. Para modificarlas en profundidad edita ese fichero o pide ayuda a tu desarrollador.
      </p>
      <div className="space-y-4">
        {WIZARD_STEPS.map((step) => (
          <div key={step.id} className="bg-white rounded-2xl border border-[#f5ede0] p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs bg-[#e07a5f]/10 text-[#e07a5f] px-2 py-0.5 rounded-full font-mono">{step.id}</span>
              <h3 className="font-bold text-[#2d2d2d]">{step.pregunta}</h3>
            </div>
            {step.descripcion && <p className="text-xs text-[#8b7d72] mb-3">{step.descripcion}</p>}
            <div className="grid sm:grid-cols-2 gap-2">
              {step.opciones.map((opt) => (
                <div key={opt.value} className="flex items-start gap-2 p-3 rounded-xl bg-[#fdf8f3] border border-[#f5ede0]">
                  {opt.emoji && <span>{opt.emoji}</span>}
                  <div className="text-xs">
                    <p className="font-semibold text-[#2d2d2d]">{opt.label}</p>
                    {opt.nextStepId && <p className="text-[#8b7d72]">→ paso: <code>{opt.nextStepId}</code></p>}
                    {opt.treatmentSlugs && opt.treatmentSlugs.length > 0 && (
                      <p className="text-[#7a9e7e]">tratamientos: {opt.treatmentSlugs.join(", ")}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Leads ────────────────────────────────────────────────────────────────────
function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/leads").then((r) => r.json()).then((data) => {
      setLeads(data.leads ?? []);
      setLoading(false);
    });
  }, []);

  function exportCSV() {
    const headers = ["Nombre", "Email", "Teléfono", "Origen", "Fecha"];
    const rows = leads.map((l) => [l.nombre, l.email, l.telefono ?? "", l.origen, new Date(l.created_at).toLocaleString("es-ES")]);
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
        <h2 className="text-xl font-black text-[#2d2d2d]">Solicitudes / Leads ({leads.length})</h2>
        {leads.length > 0 && (
          <button onClick={exportCSV}
            className="px-4 py-2 rounded-full bg-[#7a9e7e] text-white text-sm font-medium hover:bg-[#5a7e5e] transition-colors">
            ⬇️ Exportar CSV
          </button>
        )}
      </div>
      {leads.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#f5ede0] p-8 text-center text-[#8b7d72]">
          <p className="text-4xl mb-3">📭</p>
          <p className="font-semibold">Aún no hay leads.</p>
          <p className="text-sm mt-2">Aparecerán aquí cuando alguien rellene un formulario o el presupuestador.</p>
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
                    <span className="text-xs bg-[#e07a5f]/10 text-[#e07a5f] px-2 py-0.5 rounded-full font-medium">{l.origen}</span>
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

// ─── Helpers ──────────────────────────────────────────────────────────────────
const inputCls = "w-full rounded-xl border border-[#f5ede0] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c2b97f]/40 focus:border-[#c2b97f] bg-[#fdf8f3]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#2d2d2d] mb-1.5">{label}</label>
      {children}
    </div>
  );
}
