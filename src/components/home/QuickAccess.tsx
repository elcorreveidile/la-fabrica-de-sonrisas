import Link from "next/link";

const accesos = [
  {
    icon: "🦷",
    titulo: "Tratamientos",
    descripcion: "Ortodoncia, implantes, estética, periodoncia y más. Con fotos y precios orientativos.",
    href: "/tratamientos",
    bg: "bg-[#fdf4eb]",
    border: "border-[#e07a5f]/20",
    accent: "text-[#e07a5f]",
    cta: "Ver todos →",
  },
  {
    icon: "🧮",
    titulo: "¿Cuánto cuesta?",
    descripcion: "Calcula una estimación orientativa de tu tratamiento en menos de 2 minutos.",
    href: "/presupuestador",
    bg: "bg-[#f0f5f1]",
    border: "border-[#7a9e7e]/20",
    accent: "text-[#7a9e7e]",
    cta: "Calcular →",
  },
  {
    icon: "📅",
    titulo: "Primera visita gratis",
    descripcion: "Valoración gratuita y sin compromiso. Te lo explicamos todo con calma.",
    href: "/cita",
    bg: "bg-[#fdf4eb]",
    border: "border-[#e07a5f]/20",
    accent: "text-[#e07a5f]",
    cta: "Pedir cita →",
  },
];

export default function QuickAccess() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-5">
          {accesos.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`p-7 rounded-3xl ${item.bg} border ${item.border} transition-all duration-200 hover:scale-[1.02] hover:shadow-md group flex flex-col`}
            >
              <span className="text-4xl mb-4 block">{item.icon}</span>
              <h3 className={`text-xl font-black mb-2 ${item.accent}`}>{item.titulo}</h3>
              <p className="text-[#8b7d72] text-sm leading-relaxed flex-1">{item.descripcion}</p>
              <span className={`mt-5 text-sm font-bold ${item.accent}`}>{item.cta}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
