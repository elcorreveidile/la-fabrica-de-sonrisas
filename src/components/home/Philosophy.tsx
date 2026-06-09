import Image from "next/image";
import Link from "next/link";

export default function Philosophy() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="relative w-full aspect-square rounded-3xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=700&q=80"
              alt="Equipo de La Fábrica de Sonrisas"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -top-4 -right-4 bg-[#7a9e7e] text-white rounded-2xl p-4 text-center shadow-lg">
            <p className="text-3xl font-black">+15</p>
            <p className="text-xs font-medium">años de experiencia</p>
          </div>
        </div>

        <div>
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#7a9e7e]/10 text-[#7a9e7e] text-sm font-semibold">
            Nuestra filosofía
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#2d2d2d] mb-6 leading-tight">
            Aquí tu sonrisa es cosa seria;
            <span className="text-[#e07a5f]"> el ambiente, nunca.</span>
          </h2>
          <p className="text-[#8b7d72] leading-relaxed mb-4">
            Practicamos <strong>odontología integrativa y mínimamente invasiva</strong>: buscamos siempre
            la solución que cuide al máximo tu diente natural, con los procedimientos menos invasivos posibles.
          </p>
          <p className="text-[#8b7d72] leading-relaxed mb-6">
            Somos especialistas en atender a <strong>pacientes con miedo al dentista</strong>. Nuestra consulta
            en el Realejo granadino tiene ese algo diferente: te explicamos todo, vamos a tu ritmo
            y nos quedamos sin dormir si no te vamos con una sonrisa.
          </p>

          <ul className="space-y-3 mb-8">
            {[
              "Equipo mayoritariamente femenino, cercano y cálido",
              "Primera visita de valoración siempre tranquila y sin presión",
              "Tecnología avanzada, trato artesano",
              "Clínica de autor — no somos una franquicia",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="text-[#7a9e7e] mt-0.5 flex-shrink-0">✓</span>
                <span className="text-[#2d2d2d] text-sm">{item}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/equipo"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#7a9e7e] text-[#7a9e7e] font-semibold hover:bg-[#7a9e7e] hover:text-white transition-all"
          >
            Conoce al equipo
          </Link>
        </div>
      </div>
    </section>
  );
}
