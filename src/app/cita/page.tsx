import { Metadata } from "next";
import Image from "next/image";
import CitaForm from "./CitaForm";

export const metadata: Metadata = {
  title: "Pide cita",
  description: "Reserva tu primera visita en La Fábrica de Sonrisas. Primera valoración gratuita y sin compromiso.",
};

export default function CitaPage() {
  return (
    <div className="pt-16">
      <div className="bg-gradient-to-br from-[#fdf8f3] to-[#fdf4eb] py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-[#2d2d2d] mb-4">
            Tu sonrisa nos espera
          </h1>
          <p className="text-[#8b7d72] text-lg">
            Primera visita de valoración <strong>gratuita y sin compromiso</strong>.
            Cuéntanos qué necesitas y te escribimos para confirmar.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full text-sm text-[#8b7d72] border border-[#f5ede0]">
            <span>⚠️</span>
            <span>Demo — los datos del formulario no se almacenan permanentemente.</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-start">
        <div>
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg mb-6">
            <Image
              src="https://www.lafabricadesonrisasgranada.com/wp-content/uploads/primera-visita.webp"
              alt="Primera visita en La Fábrica de Sonrisas"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-3">
            {[
              "Primera valoración gratuita y sin compromiso",
              "Te explicamos todo antes de empezar",
              "Sin listas de espera — respuesta en 24h",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-[#8b7d72]">
                <span className="text-[#7a9e7e] mt-0.5">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
        <CitaForm />

        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 pb-12">
        <div className="mt-0 text-center">
          <p className="text-[#8b7d72] text-sm mb-4">¿Prefieres contactarnos directamente?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/34958227474?text=${encodeURIComponent("Hola, me gustaría pedir cita en La Fábrica de Sonrisas 😊")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#1fba57] transition-colors"
            >
              💬 WhatsApp
            </a>
            <a
              href="tel:958227474"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-[#e07a5f] text-[#e07a5f] font-semibold hover:bg-[#fdf4eb] transition-colors"
            >
              📞 958 22 74 74
            </a>
          </div>
        </div>

        <div className="mt-8 bg-[#7a9e7e]/10 rounded-2xl p-5 text-center text-sm text-[#5a7e5e]">
          <p className="font-semibold mb-1">📅 Versión 2: calendario de reserva online</p>
          <p className="text-xs text-[#8b7d72]">
            En la próxima versión del proyecto incluiremos un calendario interactivo con reserva y confirmación automática por email.
          </p>
        </div>
      </div>
    </div>

  );
}
