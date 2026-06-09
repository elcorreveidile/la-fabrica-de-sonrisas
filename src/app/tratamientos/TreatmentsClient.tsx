"use client";

import { useState } from "react";
import Link from "next/link";
import { Treatment, TreatmentCategory, CATEGORY_LABELS, CATEGORY_ICONS } from "@/types";
import { formatPriceRange } from "@/lib/utils";

const CATEGORIES: (TreatmentCategory | "todos")[] = [
  "todos", "ortodoncia", "implantes", "estetica", "periodoncia", "cirugia", "general", "odontopediatria",
];

export default function TreatmentsClient({ initialTreatments }: { initialTreatments: Treatment[] }) {
  const [activeCategory, setActiveCategory] = useState<TreatmentCategory | "todos">("todos");

  const filtered = activeCategory === "todos"
    ? initialTreatments
    : initialTreatments.filter((t) => t.categoria === activeCategory);

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#fdf8f3] to-[#fdf4eb] py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-[#2d2d2d] mb-4">
            Todos nuestros <span className="text-[#e07a5f]">tratamientos</span>
          </h1>
          <p className="text-[#8b7d72] text-lg max-w-xl mx-auto">
            En lenguaje claro, sin tecnicismos. Encuentra lo que necesitas y descubre cómo podemos ayudarte.
          </p>
          <Link
            href="/presupuestador"
            className="mt-6 inline-block px-8 py-3 rounded-full bg-[#e07a5f] text-white font-semibold hover:bg-[#c4614a] transition-colors"
          >
            🧮 Calcula tu presupuesto orientativo
          </Link>
        </div>
      </div>

      {/* Category filter */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-[#f5ede0] py-3 px-4">
        <div className="max-w-6xl mx-auto overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-[#e07a5f] text-white shadow-sm"
                    : "bg-[#f5ede0] text-[#2d2d2d] hover:bg-[#e8d8ca]"
                }`}
              >
                {cat === "todos" ? "🦷 Todos" : `${CATEGORY_ICONS[cat]} ${CATEGORY_LABELS[cat]}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((treatment) => (
            <TreatmentCard key={treatment.slug} treatment={treatment} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#8b7d72]">
            <p className="text-4xl mb-4">🤔</p>
            <p>No hay tratamientos en esta categoría de momento.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function TreatmentCard({ treatment }: { treatment: Treatment }) {
  const priceLabel = treatment.precio_min === 0 && treatment.precio_max === 0
    ? "Gratuita"
    : treatment.es_precio_real
    ? `Desde ${treatment.precio_min} €`
    : `${formatPriceRange(treatment.precio_min, treatment.precio_max)} (orientativo)`;

  return (
    <div className="bg-white rounded-3xl border border-[#f5ede0] hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col overflow-hidden">
      <div className="p-6 flex-1">
        <div className="flex items-start justify-between mb-3">
          <span className="text-3xl">{CATEGORY_ICONS[treatment.categoria]}</span>
          <span className="text-xs text-[#e07a5f] bg-[#e07a5f]/10 px-2 py-0.5 rounded-full font-medium">
            {CATEGORY_LABELS[treatment.categoria]}
          </span>
        </div>
        <h3 className="font-bold text-[#2d2d2d] text-lg mb-2 leading-tight">{treatment.nombre}</h3>
        <p className="text-[#8b7d72] text-sm leading-relaxed mb-4">{treatment.descripcion_corta}</p>

        <div className="space-y-2 text-xs text-[#8b7d72]">
          {treatment.duracion && (
            <div className="flex items-center gap-1.5">
              <span>⏱</span>
              <span>{treatment.duracion}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <span>💶</span>
            <span className="font-medium text-[#2d2d2d]">{priceLabel}</span>
          </div>
          {!treatment.es_precio_real && treatment.precio_min > 0 && (
            <p className="text-[10px] text-[#8b7d72] italic">
              Precio orientativo de mercado en Granada
            </p>
          )}
        </div>
      </div>

      <div className="px-6 pb-6 flex gap-2">
        <Link
          href={`/tratamientos/${treatment.slug}`}
          className="flex-1 text-center py-2.5 rounded-full border border-[#e07a5f] text-[#e07a5f] text-sm font-semibold hover:bg-[#fdf4eb] transition-colors"
        >
          Ver más
        </Link>
        <Link
          href="/cita"
          className="flex-1 text-center py-2.5 rounded-full bg-[#e07a5f] text-white text-sm font-semibold hover:bg-[#c4614a] transition-colors"
        >
          Pedir cita
        </Link>
      </div>
    </div>
  );
}
