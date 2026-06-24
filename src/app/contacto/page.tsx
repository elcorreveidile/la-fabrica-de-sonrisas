import { Metadata } from "next";
import Image from "next/image";
import ContactoForm from "./ContactoForm";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta con la Clínica Dental Ejemplo. Dirección, teléfono, WhatsApp y formulario.",
};

export default function ContactoPage() {
  return (
    <div className="pt-16">
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src="/images/clinica-recepcion.jpg"
          alt="Clínica Dental Ejemplo"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2d2d2d]/50 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-black drop-shadow mb-2">
            Estamos en el <span className="text-[#f2a98e]">centro</span>
          </h1>
          <p className="text-white/85 drop-shadow">
            En el corazón de la ciudad. Te esperamos.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-black text-[#2d2d2d] mb-6">Datos de contacto</h2>
            <div className="space-y-4">
              <ContactItem icon="📍" title="Dirección">
                <p>Calle Mayor 1</p>
                <p>Centro, 28013 Madrid</p>
              </ContactItem>
              <ContactItem icon="📞" title="Teléfono">
                <a href="tel:900000000" className="hover:text-[#e07a5f] transition-colors font-semibold">
                  900 000 000
                </a>
              </ContactItem>
              <ContactItem icon="🕘" title="Horario">
                <p>Lunes a Viernes: 9:30 – 18:30</p>
                <p className="text-[#8b7d72]">Sábado y domingo: cerrado</p>
              </ContactItem>
              <ContactItem icon="💬" title="WhatsApp / redes">
                <a
                  href={`https://wa.me/34900000000?text=${encodeURIComponent("Hola, me gustaría pedir cita 😊")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1fba57] transition-colors"
                >
                  Escribir por WhatsApp
                </a>
                <span className="mt-2 inline-flex items-center gap-1 text-sm text-[#8b7d72]">
                  @clinicadental.ejemplo
                </span>
              </ContactItem>
            </div>

            <div className="mt-8 rounded-3xl overflow-hidden h-64">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=-3.7100%2C40.4100%2C-3.6900%2C40.4200&layer=mapnik&marker=40.4168%2C-3.7038"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa clínica dental ejemplo"
              />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-[#2d2d2d] mb-6">Escríbenos</h2>
            <ContactoForm />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactItem({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-2xl border border-[#f5ede0]">
      <span className="text-2xl flex-shrink-0">{icon}</span>
      <div>
        <p className="font-semibold text-[#2d2d2d] text-sm mb-1">{title}</p>
        <div className="text-[#8b7d72] text-sm">{children}</div>
      </div>
    </div>
  );
}
