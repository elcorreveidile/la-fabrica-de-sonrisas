import Hero from "@/components/home/Hero";
import QuickAccess from "@/components/home/QuickAccess";
import SocialProof from "@/components/home/SocialProof";
import Philosophy from "@/components/home/Philosophy";
import MapSection from "@/components/home/MapSection";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickAccess />
      <SocialProof />
      <Philosophy />

      <section className="py-20 bg-gradient-to-r from-[#e07a5f] to-[#c4614a] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-5xl mb-6">🧮</p>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            ¿Cuánto puede costar tu tratamiento?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
            Nuestro presupuestador interactivo te da una estimación orientativa en menos de 2 minutos.
            Sin compromiso, sin tecnicismos.
          </p>
          <Link
            href="/presupuestador"
            className="inline-block px-10 py-4 rounded-full bg-white text-[#e07a5f] font-bold text-lg hover:shadow-xl hover:scale-[1.03] transition-all"
          >
            Calcular mi presupuesto
          </Link>
          <p className="mt-4 text-white/60 text-sm">
            Los precios son orientativos. El presupuesto definitivo lo recibirás en tu primera visita (gratuita).
          </p>
        </div>
      </section>

      <MapSection />
    </>
  );
}
