import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#fdf8f3] via-[#fdf4eb] to-[#fdf8f3] overflow-hidden pt-16">
      {/* Decorative circles */}
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-[#e07a5f]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-80 h-80 rounded-full bg-[#7a9e7e]/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in-up">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#e07a5f]/10 text-[#e07a5f] text-sm font-semibold">
            🏆 Premio Nacional de Medicina · Odontología 2023 — Dra. Hunayda Bumedien
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#2d2d2d] leading-tight mb-6">
            El dentista que{" "}
            <span className="text-[#e07a5f]">esperabas</span>{" "}
            que existiera
          </h1>

          <p className="text-lg text-[#8b7d72] leading-relaxed mb-8 max-w-lg">
            ¿Llevas tiempo aplazando esa visita? En La Fábrica de Sonrisas lo hacemos diferente:
            sin prisa, sin miedo, con mucho mimo. Tu boca en buenas manos, y tú, tranquilo/a.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/cita"
              className="px-8 py-4 rounded-full bg-[#e07a5f] text-white font-bold text-lg hover:bg-[#c4614a] transition-all hover:shadow-lg hover:scale-[1.02] text-center"
            >
              Pide tu primera cita
            </Link>
            <Link
              href="/presupuestador"
              className="px-8 py-4 rounded-full bg-white border-2 border-[#e07a5f] text-[#e07a5f] font-bold text-lg hover:bg-[#fdf4eb] transition-all text-center"
            >
              Calcula tu presupuesto
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-6 text-sm text-[#8b7d72]">
            <div className="flex items-center gap-1.5">
              <span className="text-[#e07a5f]">⭐⭐⭐⭐⭐</span>
              <span>+300 reseñas 5★</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>🌿</span>
              <span>Mínimamente invasiva</span>
            </div>
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="https://www.lafabricadesonrisasgranada.com/wp-content/uploads/verbena_FABRICASONRISAS_dientes_01.png"
              alt="Clínica dental La Fábrica de Sonrisas, Granada"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 0px, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#e07a5f]/20 to-transparent" />
          </div>

          {/* Floating card */}
          <div className="absolute -bottom-4 -left-8 bg-white rounded-2xl shadow-xl p-4 max-w-[200px]">
            <p className="text-2xl font-black text-[#e07a5f]">98%</p>
            <p className="text-xs text-[#8b7d72] font-medium">de pacientes recomiendan la clínica</p>
          </div>
        </div>
      </div>
    </section>
  );
}
