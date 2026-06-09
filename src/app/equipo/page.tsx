import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "La clínica y el equipo",
  description: "Conoce a la Dra. Hunayda Bumedien y al equipo de La Fábrica de Sonrisas. Odontología integrativa en el Realejo, Granada.",
};

const equipo = [
  {
    nombre: "Dra. Hunayda Bumedien",
    especialidad: "Dirección clínica · Odontología general e integrativa",
    bio: "Fundadora y directora de La Fábrica de Sonrisas. Premio Nacional de Salud Bucodental 2022 (zona Andalucía Oriental). Pionera en odontología mínimamente invasiva en Granada, con más de 15 años de ejercicio clínico.",
    imagen: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
    badge: "🏆 Premio Nacional 2022",
  },
  {
    nombre: "Equipo de higienistas",
    especialidad: "Higiene bucodental · Periodoncia preventiva",
    bio: "Nuestras higienistas son el corazón de la clínica. Cada revisión y limpieza es un momento de cuidado y educación para que tu boca esté siempre en su mejor estado.",
    imagen: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80",
    badge: null,
  },
  {
    nombre: "Equipo de ortodoncia",
    especialidad: "Ortodoncia fija e invisible · Ortodoncia infantil",
    bio: "Especialistas en transformar sonrisas con brackets y alineadores. Tratamos desde los casos más sencillos hasta los más complejos, siempre con una planificación digital de precisión.",
    imagen: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
    badge: null,
  },
];

export default function EquipoPage() {
  return (
    <div className="pt-16">
      <div className="bg-gradient-to-br from-[#fdf8f3] to-[#fdf4eb] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-[#2d2d2d] mb-4">
            Las personas detrás de{" "}
            <span className="text-[#e07a5f]">tu sonrisa</span>
          </h1>
          <p className="text-[#8b7d72] text-lg max-w-xl mx-auto">
            Somos un equipo mayoritariamente femenino, apasionado por la odontología y por hacer que cada visita sea una experiencia positiva.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {equipo.map((persona) => (
            <div key={persona.nombre} className="bg-white rounded-3xl border border-[#f5ede0] overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <Image
                  src={persona.imagen}
                  alt={persona.nombre}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                {persona.badge && (
                  <span className="inline-block mb-2 text-xs bg-[#e07a5f]/10 text-[#e07a5f] px-2 py-0.5 rounded-full font-medium">
                    {persona.badge}
                  </span>
                )}
                <h3 className="font-bold text-[#2d2d2d] mb-1">{persona.nombre}</h3>
                <p className="text-xs text-[#e07a5f] font-medium mb-3">{persona.especialidad}</p>
                <p className="text-[#8b7d72] text-sm leading-relaxed">{persona.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filosofía */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#7a9e7e]/10 text-[#7a9e7e] text-sm font-semibold">
              Nuestra manera de hacer dentística
            </span>
            <h2 className="text-3xl font-black text-[#2d2d2d] mb-5">Odontología integrativa y mínimamente invasiva</h2>
            <div className="space-y-4 text-[#8b7d72] text-sm leading-relaxed">
              <p>
                Creemos en tratar la boca como parte de un todo. Antes de tomar cualquier decisión clínica,
                escuchamos, valoramos y buscamos siempre <strong className="text-[#2d2d2d]">la solución que conserva más tejido sano</strong>.
              </p>
              <p>
                Nada de extraer si se puede salvar. Nada de hacer si no es necesario. Y siempre,
                en un ambiente donde puedes respirar tranquilo/a.
              </p>
              <p>
                Somos especialistas en <strong className="text-[#2d2d2d]">pacientes con miedo al dentista</strong>.
                Sabemos que muchas personas llevan años sin venir por eso.
                En La Fábrica de Sonrisas, eso tiene solución.
              </p>
            </div>
          </div>
          <div className="relative aspect-square rounded-3xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=80"
              alt="Instalaciones de la clínica"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Valores */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: "💚", titulo: "Integrativa", desc: "Tratamos la boca como parte de un todo." },
            { icon: "🌱", titulo: "Mínimamente invasiva", desc: "Siempre la solución menos agresiva." },
            { icon: "❤️", titulo: "Emocional", desc: "Especialistas en miedo al dentista." },
            { icon: "✋", titulo: "De autor", desc: "No somos una franquicia. Somos personas." },
          ].map((v) => (
            <div key={v.titulo} className="bg-[#fdf8f3] rounded-2xl p-5 text-center border border-[#f5ede0]">
              <span className="text-3xl block mb-2">{v.icon}</span>
              <h4 className="font-bold text-[#2d2d2d] mb-1 text-sm">{v.titulo}</h4>
              <p className="text-xs text-[#8b7d72]">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/cita"
            className="inline-block px-10 py-4 rounded-full bg-[#e07a5f] text-white font-bold text-lg hover:bg-[#c4614a] transition-colors hover:shadow-lg"
          >
            Conocernos en persona — pide tu cita
          </Link>
        </div>
      </div>
    </div>
  );
}
