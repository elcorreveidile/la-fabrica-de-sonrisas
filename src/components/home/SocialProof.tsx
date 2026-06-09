const testimonials = [
  {
    texto: "Por fin un dentista donde entras sin ese nudo en el estómago. El equipo es una maravilla.",
    nombre: "María G.",
    avatar: "👩",
  },
  {
    texto: "La Dra. Hunayda explica todo con calma y paciencia. Me operé de las muelas del juicio sin drama.",
    nombre: "Alejandro M.",
    avatar: "👨",
  },
  {
    texto: "Llevaba años sin ir al dentista por el miedo. Aquí encontré un sitio donde me sentí segura.",
    nombre: "Laura P.",
    avatar: "👩🏽",
  },
];

export default function SocialProof() {
  return (
    <section className="py-20 bg-[#fdf8f3]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-[#7a9e7e]/10 text-[#7a9e7e] text-sm font-semibold">
            Lo dicen nuestros pacientes
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#2d2d2d]">
            Más de 300 familias confían en nosotros
          </h2>
          <div className="flex justify-center mt-3 gap-1 text-2xl">
            {"⭐".repeat(5)}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-[#f5ede0]">
              <div className="flex gap-1 mb-4 text-sm">
                {"⭐".repeat(5)}
              </div>
              <p className="text-[#2d2d2d] leading-relaxed mb-4 italic">"{t.texto}"</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{t.avatar}</span>
                <span className="font-semibold text-[#8b7d72] text-sm">{t.nombre}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-[#e07a5f] to-[#c4614a] rounded-3xl p-8 text-white text-center">
          <p className="text-2xl font-black mb-2">🏆 Triple reconocimiento de excelencia</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-3 text-sm text-white/90">
            <span>🥇 Premio Nacional Salud Bucodental 2022 · Andalucía Oriental</span>
            <span className="hidden sm:block text-white/40">|</span>
            <span>🥇 Premio Nacional de Medicina · Odontología 2023</span>
            <span className="hidden sm:block text-white/40">|</span>
            <span>🥇 Premio Europeo Mejor Trayectoria 2023</span>
          </div>
        </div>
      </div>
    </section>
  );
}
