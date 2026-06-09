import { Metadata } from "next";
import PresupuestadorWizard from "./PresupuestadorWizard";

export const metadata: Metadata = {
  title: "Presupuestador interactivo",
  description: "Calcula el coste orientativo de tu tratamiento dental en La Fábrica de Sonrisas, Granada. Rápido, sin compromiso.",
};

export default function PresupuestadorPage() {
  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-[#fdf8f3] to-[#fdf4eb]">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-[#e07a5f]/10 text-[#e07a5f] text-sm font-semibold">
            Sin compromiso · Sin tecnicismos
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-[#2d2d2d] mb-3">
            ¿Cuánto puede costar<br />
            <span className="text-[#e07a5f]">tu tratamiento?</span>
          </h1>
          <p className="text-[#8b7d72]">
            Responde unas pocas preguntas y te damos una estimación orientativa en menos de 2 minutos.
          </p>
        </div>
        <PresupuestadorWizard />
      </div>
    </div>
  );
}
