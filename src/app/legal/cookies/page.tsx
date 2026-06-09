import { Metadata } from "next";

export const metadata: Metadata = { title: "Política de cookies" };

export default function CookiesPage() {
  return (
    <div className="pt-16 max-w-3xl mx-auto px-4 py-12">
      <div className="bg-[#fdf4eb] border border-[#e07a5f]/20 rounded-2xl p-4 mb-8 text-sm text-[#8b7d72]">
        ⚠️ <strong>Demo de propuesta</strong> — Borrador. Sin validez legal hasta revisión por el titular.
      </div>
      <h1 className="text-3xl font-black text-[#2d2d2d] mb-8">Política de cookies</h1>
      <div className="prose prose-sm max-w-none text-[#8b7d72] space-y-6">
        <section>
          <h2 className="text-lg font-bold text-[#2d2d2d]">¿Qué son las cookies?</h2>
          <p>Las cookies son pequeños ficheros que se almacenan en tu navegador cuando visitas un sitio web.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#2d2d2d]">Cookies en esta demo</h2>
          <p>Esta demo utiliza únicamente cookies de sesión técnicamente necesarias para el funcionamiento del panel de administración (Supabase Auth). No se utilizan cookies de analítica ni publicidad.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#2d2d2d]">Gestión</h2>
          <p>Puedes desactivar las cookies desde la configuración de tu navegador, aunque esto puede afectar al funcionamiento del panel de administración.</p>
        </section>
      </div>
    </div>
  );
}
