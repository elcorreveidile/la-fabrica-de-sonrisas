import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#2d2d2d] text-white pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="mb-3">
              <Image
                src="/logo.svg"
                alt="Clínica Dental Ejemplo"
                width={180}
                height={44}
                className="h-9 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Odontología integrativa y mínimamente invasiva. Web de demostración.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-[#e07a5f]">Navegación</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/tratamientos" className="hover:text-white transition-colors">Tratamientos</Link></li>
              <li><Link href="/presupuestador" className="hover:text-white transition-colors">Presupuestador</Link></li>
              <li><Link href="/equipo" className="hover:text-white transition-colors">La clínica</Link></li>
              <li><Link href="/cita" className="hover:text-white transition-colors">Pide cita</Link></li>
              <li><Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-[#e07a5f]">Contacto</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Calle Mayor 1, Centro</li>
              <li>28013 Madrid</li>
              <li className="flex items-center gap-1">
                <span>📞</span>
                <a href="tel:900000000" className="hover:text-white transition-colors">900 000 000</a>
              </li>
              <li>L–V 9:30–18:30</li>
              <li>
                <span className="text-xs text-gray-500">Instagram · @clinicadental.ejemplo</span>
              </li>
              <li>
                <span className="text-xs text-gray-500">YouTube · Clínica Dental Ejemplo</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <div className="flex gap-4">
            <Link href="/legal/privacidad" className="hover:text-white transition-colors">Privacidad</Link>
            <Link href="/legal/aviso-legal" className="hover:text-white transition-colors">Aviso legal</Link>
            <Link href="/legal/cookies" className="hover:text-white transition-colors">Cookies</Link>
          </div>
          <p>© 2025 Clínica Dental Ejemplo · Madrid</p>
        </div>
      </div>
    </footer>
  );
}
