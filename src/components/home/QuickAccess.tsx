import Link from "next/link";

const accesos = [
  {
    icon: "🦷",
    titulo: "Todos los tratamientos",
    descripcion: "Ortodoncia, implantes, estética y mucho más. Encuentra lo que necesitas.",
    href: "/tratamientos",
    color: "bg-[#e07a5f]/10 hover:bg-[#e07a5f]/20",
    accent: "text-[#e07a5f]",
  },
  {
    icon: "🧮",
    titulo: "Calcula tu presupuesto",
    descripcion: "Descubre en 2 minutos cuánto puede costar tu tratamiento. Sin compromiso.",
    href: "/presupuestador",
    color: "bg-[#7a9e7e]/10 hover:bg-[#7a9e7e]/20",
    accent: "text-[#7a9e7e]",
  },
  {
    icon: "📅",
    titulo: "Pide cita",
    descripcion: "Primera visita de valoración gratuita. Te esperamos en el Realejo.",
    href: "/cita",
    color: "bg-[#e07a5f]/10 hover:bg-[#e07a5f]/20",
    accent: "text-[#e07a5f]",
  },
];

export default function QuickAccess() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {accesos.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`p-6 rounded-3xl ${item.color} transition-all duration-200 group hover:scale-[1.02] hover:shadow-md`}
            >
              <span className="text-4xl mb-4 block">{item.icon}</span>
              <h3 className={`text-xl font-bold mb-2 ${item.accent}`}>{item.titulo}</h3>
              <p className="text-[#8b7d72] text-sm leading-relaxed">{item.descripcion}</p>
              <span className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold ${item.accent}`}>
                Ir →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
