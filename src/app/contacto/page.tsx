import { Metadata } from "next";
import ContactoForm from "./ContactoForm";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta con La Fábrica de Sonrisas en Granada. Dirección, teléfono, WhatsApp y formulario.",
};

export default function ContactoPage() {
  return (
    <div className="pt-16">
      <div className="bg-gradient-to-br from-[#fdf8f3] to-[#fdf4eb] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-[#2d2d2d] mb-4">
            Estamos en el <span className="text-[#e07a5f]">Realejo</span>
          </h1>
          <p className="text-[#8b7d72] text-lg">
            En el corazón de uno de los barrios más bonitos de Granada. Te esperamos.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-black text-[#2d2d2d] mb-6">Datos de contacto</h2>
            <div className="space-y-4">
              <ContactItem icon="📍" title="Dirección">
                <p>C. Molinos 34</p>
                <p>Realejo, 18009 Granada</p>
              </ContactItem>
              <ContactItem icon="📞" title="Teléfono">
                <a href="tel:958000000" className="hover:text-[#e07a5f] transition-colors">
                  958 XXX XXX
                </a>
                <p className="text-xs text-[#8b7d72]">(número placeholder — por confirmar)</p>
              </ContactItem>
              <ContactItem icon="🕘" title="Horario">
                <p>Lunes a Viernes: 9:30 – 18:30</p>
                <p className="text-xs text-[#8b7d72]">(por confirmar)</p>
              </ContactItem>
              <ContactItem icon="💬" title="WhatsApp">
                <a
                  href={`https://wa.me/34958000000?text=${encodeURIComponent("Hola, me gustaría pedir cita en La Fábrica de Sonrisas 😊")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1fba57] transition-colors"
                >
                  Escribir por WhatsApp
                </a>
              </ContactItem>
            </div>

            <div className="mt-8 rounded-3xl overflow-hidden h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3177.1766555832447!2d-3.5984!3d37.1760!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd71fcb69e1b19e5%3A0x4b5b3e3e3e3e3e3e!2sCalle%20de%20los%20Molinos%2C%2034%2C%2018009%20Granada!5e0!3m2!1ses!2ses!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa La Fábrica de Sonrisas"
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
