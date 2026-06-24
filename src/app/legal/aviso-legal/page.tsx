import { Metadata } from "next";

export const metadata: Metadata = { title: "Aviso legal" };

export default function AvisoLegalPage() {
  return (
    <div className="pt-16 max-w-3xl mx-auto px-4 py-12">
      <div className="bg-[#fdf4eb] border border-[#e07a5f]/20 rounded-2xl p-4 mb-8 text-sm text-[#8b7d72]">
        ⚠️ <strong>Demo de propuesta</strong> — Este documento es un borrador. No tiene validez legal hasta su revisión por el titular.
      </div>
      <h1 className="text-3xl font-black text-[#2d2d2d] mb-8">Aviso legal</h1>
      <div className="prose prose-sm max-w-none text-[#8b7d72] space-y-6">
        <section>
          <h2 className="text-lg font-bold text-[#2d2d2d]">Identificación</h2>
          <p>Este sitio es una <strong>demo de propuesta comercial</strong> para demostrar las posibilidades de una web moderna para una clínica dental.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#2d2d2d]">Propiedad intelectual</h2>
          <p>Los textos son de elaboración propia con fines ilustrativos. Las fotografías son imágenes de muestra. Ningún dato real de ninguna clínica ha sido utilizado.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#2d2d2d]">Precios</h2>
          <p>Todos los precios indicados son orientativos de mercado y no constituyen oferta comercial de la clínica.</p>
        </section>
      </div>
    </div>
  );
}
