import { Metadata } from "next";

export const metadata: Metadata = { title: "Política de privacidad" };

export default function PrivacidadPage() {
  return (
    <div className="pt-16 max-w-3xl mx-auto px-4 py-12">
      <div className="bg-[#fdf4eb] border border-[#e07a5f]/20 rounded-2xl p-4 mb-8 text-sm text-[#8b7d72]">
        ⚠️ <strong>Demo de propuesta</strong> — Este documento es un borrador para demostración. No tiene validez legal hasta que sea revisado y adaptado por el titular de la web.
      </div>
      <h1 className="text-3xl font-black text-[#2d2d2d] mb-8">Política de privacidad</h1>
      <div className="prose prose-sm max-w-none text-[#8b7d72] space-y-6">
        <section>
          <h2 className="text-lg font-bold text-[#2d2d2d]">1. Responsable del tratamiento</h2>
          <p>La Fábrica de Sonrisas · C. Molinos 34, 18009 Granada · [email por confirmar]</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#2d2d2d]">2. Datos recogidos</h2>
          <p>En esta demo, los formularios recogen nombre, email, teléfono y mensaje. Estos datos se almacenan en una tabla de pruebas y no se utilizan con fines comerciales.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#2d2d2d]">3. Finalidad</h2>
          <p>Exclusivamente para demostrar la funcionalidad del presupuestador y formulario de cita de esta demo de propuesta comercial.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#2d2d2d]">4. Derechos ARCO</h2>
          <p>Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición contactando en la dirección indicada.</p>
        </section>
      </div>
    </div>
  );
}
