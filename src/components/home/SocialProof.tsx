const testimonials = [
  {
    texto: "Por fin un dentista donde entras sin ese nudo en el estómago. El equipo es una maravilla y la doctora te explica todo con una paciencia infinita.",
    nombre: "María G.",
    tratamiento: "Ortodoncia invisible",
    avatar: "👩",
  },
  {
    texto: "Me operé de las muelas del juicio sin drama. La doctora explica todo con calma. Me fui a casa sin dolor y con una sonrisa.",
    nombre: "Alejandro M.",
    tratamiento: "Cirugía oral",
    avatar: "👨",
  },
  {
    texto: "Llevaba años sin ir al dentista por el miedo. Aquí encontré un sitio donde me sentí segura desde el primer momento. No volvería a ningún otro sitio.",
    nombre: "Laura P.",
    tratamiento: "Primera visita",
    avatar: "👩🏽",
  },
  {
    texto: "El presupuestador online me convenció de dar el paso. Entré pensando que no me lo podía permitir y salí con un plan de pago que se adapta a mí.",
    nombre: "Carlos R.",
    tratamiento: "Implante dental",
    avatar: "👨🏻",
  },
  {
    texto: "La recepcionista es un sol. Te responde al WhatsApp en minutos. Y el resultado de mi ortodoncia ha sido increíble.",
    nombre: "Ana S.",
    tratamiento: "Ortodoncia",
    avatar: "👩🏼",
  },
  {
    texto: "Llevaba encías sangrando años. En dos sesiones de periodoncia el cambio fue brutal. Por fin alguien que me lo explicó de verdad.",
    nombre: "Javier T.",
    tratamiento: "Periodoncia",
    avatar: "👨🏽",
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
          <div className="flex justify-center mt-3 gap-0.5 text-xl">
            {"⭐".repeat(5)}
            <span className="ml-2 text-sm text-[#8b7d72] self-center">5,0 · Google</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-[#f5ede0] flex flex-col">
              <div className="flex gap-0.5 mb-3 text-sm">{"⭐".repeat(5)}</div>
              <p className="text-[#2d2d2d] leading-relaxed mb-4 italic flex-1">"{t.texto}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{t.avatar}</span>
                  <span className="font-semibold text-[#2d2d2d] text-sm">{t.nombre}</span>
                </div>
                <span className="text-xs text-[#e07a5f] bg-[#e07a5f]/10 px-2 py-0.5 rounded-full font-medium">
                  {t.tratamiento}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-[#e07a5f] to-[#c4614a] rounded-3xl p-8 text-white text-center">
          <p className="text-2xl font-black mb-3">🏆 Reconocimiento de excelencia</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-2 text-sm text-white/90">
            <span>🥇 Premio Excelencia Odontológica</span>
            <span className="hidden sm:block text-white/40">|</span>
            <span>🥇 Mejor Clínica Dental del Año</span>
            <span className="hidden sm:block text-white/40">|</span>
            <span>🥇 Premio Europeo Trayectoria Profesional</span>
          </div>
        </div>
      </div>
    </section>
  );
}
