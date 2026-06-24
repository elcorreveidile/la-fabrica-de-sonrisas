"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const numero = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "34900000000";
  const mensaje = encodeURIComponent(
    "Hola, me gustaría pedir cita 😊"
  );
  const href = `https://wa.me/${numero}?text=${mensaje}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-12 right-4 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:bg-[#1fba57] transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={26} fill="white" />
    </a>
  );
}
