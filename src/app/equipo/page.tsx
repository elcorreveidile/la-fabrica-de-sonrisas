import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "La clínica y el equipo",
  description: "Conoce al equipo de la Clínica Dental Ejemplo. Odontología integrativa y mínimamente invasiva.",
};

const equipo = [
  {
    nombre: "Dra. Ana García",
    especialidad: "Dirección clínica · Ortodoncia · Estética dental",
    bio: "Fundadora de la clínica. Licenciada en Odontología, Máster en Ortodoncia y Ortopedia Dentofacial y Máster en el Sistema Invisalign. Pionera en odontología integrativa. Premio de Excelencia en Odontología 2023.",
    imagen: "/images/equipo-ana-garcia.png",
    badges: ["🏆 Premio Excelencia 2023"],
  },
  {
    nombre: "Marta López",
    especialidad: "Gestión de Agenda · Atención al Paciente",
    bio: "La primera sonrisa que te recibe, la voz tras el teléfono y la persona con la que Whatsappeas. Perfeccionista, siempre sonriente. Experta en hacer que cada paciente se sienta como en casa desde el primer momento.",
    imagen: "/images/equipo-marta-lopez.png",
    badges: [],
  },
  {
    nombre: "Juan Fernández",
    especialidad: "Gerencia · Atención al paciente",
    bio: "Se encarga de la gestión administrativa y financiera de la clínica. También hace lo que puede en marketing y el ámbito digital. Tipo simpático, educado y resolutivo. MBA y experto en gestión de clínicas dentales.",
    imagen: "/images/equipo-juan-fernandez.png",
    badges: [],
  },
  {
    nombre: "Francisco Ruiz",
    especialidad: "Higienista Bucodental",
    bio: "Experto en higiene bucodental y periodoncia preventiva. Meticuloso, cercano y con una habilidad especial para que la revisión se pase volando. Sus pacientes siempre salen con los dientes brillando.",
    imagen: "/images/equipo-francisco-ruiz.png",
    badges: [],
  },
  {
    nombre: "Dr. Carlos Martínez",
    especialidad: "Cirugía Bucal · Implantología",
    bio: "Dedicación exclusiva a la cirugía bucal, implantología e implantoprótesis. Doctor por la Universidad Complutense, autor de más de 50 artículos internacionales. Premio Nacional Fin de Carrera.",
    imagen: "/images/equipo-carlos-martinez.png",
    badges: ["🏆 Premio Nacional Fin de Carrera", "📚 +50 artículos internacionales"],
  },
];

export default function EquipoPage() {
  return (
    <div className="pt-16 pb-0">
      <div className="relative h-80 md:h-[28rem] overflow-hidden">
        <Image
          src="/images/clinica-recepcion.jpg"
          alt="Equipo de la clínica dental"
          fill
          className="object-cover"
          style={{ objectPosition: "center 15%" }}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2d2d2d]/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-black mb-3 drop-shadow">
            Las personas detrás de{" "}
            <span className="text-[#f2a98e]">tu sonrisa</span>
          </h1>
          <p className="text-white/85 text-lg max-w-xl mx-auto drop-shadow">
            Un equipo especializado, en constante formación, con un único objetivo: que salgas de aquí con una sonrisa.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {equipo.map((persona) => (
            <div key={persona.nombre} className="bg-white rounded-3xl border border-[#f5ede0] overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <Image
                  src={persona.imagen}
                  alt={persona.nombre}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                {persona.badges.map((b) => (
                  <span key={b} className="inline-block mb-1 mr-1 text-xs bg-[#e07a5f]/10 text-[#e07a5f] px-2 py-0.5 rounded-full font-medium">
                    {b}
                  </span>
                ))}
                <h3 className="font-bold text-[#2d2d2d] mb-1 text-sm leading-tight mt-1">{persona.nombre}</h3>
                <p className="text-xs text-[#e07a5f] font-medium mb-2">{persona.especialidad}</p>
                <p className="text-[#8b7d72] text-xs leading-relaxed">{persona.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Premios */}
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          {[
            { icon: "🥇", titulo: "Premio Excelencia Odontológica", desc: "Mejor clínica de la región" },
            { icon: "🥇", titulo: "Mejor Clínica Dental del Año", desc: "Especialidad Odontología · 2023" },
            { icon: "🥇", titulo: "Premio Europeo", desc: "Mejor Trayectoria Profesional · 2023" },
          ].map((p) => (
            <div key={p.titulo} className="bg-gradient-to-br from-[#e07a5f]/10 to-[#fdf4eb] rounded-2xl p-5 text-center border border-[#e07a5f]/20">
              <span className="text-3xl block mb-2">{p.icon}</span>
              <p className="font-bold text-[#2d2d2d] text-sm mb-1">{p.titulo}</p>
              <p className="text-xs text-[#8b7d72]">{p.desc}</p>
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
                Nada de extraer si se puede salvar. Nada de hacer si no es necesario. Y cuando algo escapa a nuestra especialidad,
                derivamos a profesionales de confianza — porque el paciente es lo primero.
              </p>
              <p>
                Somos especialistas en <strong className="text-[#2d2d2d]">pacientes con miedo al dentista</strong>.
                Sabemos que muchas personas llevan años sin venir por eso.
                En nuestra clínica, eso tiene solución.
              </p>
            </div>
          </div>
          <div className="relative aspect-square rounded-3xl overflow-hidden">
            <Image
              src="/images/equipo-grupal.png"
              alt="Cómo trabajamos en la clínica"
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
