"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/tratamientos", label: "Tratamientos" },
  { href: "/presupuestador", label: "Presupuesto" },
  { href: "/equipo", label: "La clínica" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fdf8f3]/95 backdrop-blur-sm border-b border-[#f5ede0]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-black text-[#e07a5f]">●</span>
          <span className="font-black text-[#2d2d2d] text-base leading-tight">
            Clínica Dental <span className="text-[#e07a5f]">Ejemplo</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-full text-sm font-medium text-[#2d2d2d] hover:bg-[#f5ede0] hover:text-[#e07a5f] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/cita"
            className="ml-2 px-5 py-2 rounded-full bg-[#e07a5f] text-white text-sm font-semibold hover:bg-[#c4614a] transition-colors"
          >
            Pide cita
          </Link>
        </nav>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-[#f5ede0] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#fdf8f3] border-t border-[#f5ede0] px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-[#2d2d2d] font-medium border-b border-[#f5ede0] last:border-0"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/cita"
            onClick={() => setOpen(false)}
            className="mt-3 block text-center px-5 py-3 rounded-full bg-[#e07a5f] text-white font-semibold"
          >
            Pide cita
          </Link>
        </div>
      )}
    </header>
  );
}
