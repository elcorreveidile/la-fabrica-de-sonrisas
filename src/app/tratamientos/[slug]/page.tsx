import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { TREATMENTS_FALLBACK } from "@/lib/treatments-data";
import { CATEGORY_LABELS, CATEGORY_ICONS } from "@/types";
import { formatPriceRange } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TREATMENTS_FALLBACK.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const treatment = TREATMENTS_FALLBACK.find((t) => t.slug === slug);
  if (!treatment) return { title: "Tratamiento no encontrado" };
  return {
    title: treatment.nombre,
    description: treatment.descripcion_corta,
  };
}

export default async function TreatmentDetailPage({ params }: Props) {
  const { slug } = await params;
  const treatment = TREATMENTS_FALLBACK.find((t) => t.slug === slug);
  if (!treatment) notFound();

  const priceLabel = treatment.precio_min === 0 && treatment.precio_max === 0
    ? "Primera consulta gratuita"
    : treatment.es_precio_real
    ? `Desde ${treatment.precio_min} €`
    : formatPriceRange(treatment.precio_min, treatment.precio_max);

  return (
    <div className="pt-16">
      <div className="bg-gradient-to-br from-[#fdf8f3] to-[#fdf4eb] py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/tratamientos"
            className="inline-flex items-center gap-1 text-sm text-[#e07a5f] font-medium mb-6 hover:underline"
          >
            ← Volver a tratamientos
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{CATEGORY_ICONS[treatment.categoria]}</span>
            <span className="text-sm text-[#e07a5f] bg-[#e07a5f]/10 px-3 py-1 rounded-full font-medium">
              {CATEGORY_LABELS[treatment.categoria]}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[#2d2d2d] mb-4">{treatment.nombre}</h1>
          <p className="text-[#8b7d72] text-lg leading-relaxed">{treatment.descripcion_corta}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-2xl p-4 border border-[#f5ede0] text-center">
            <p className="text-2xl mb-1">⏱</p>
            <p className="font-semibold text-[#2d2d2d] text-sm">{treatment.duracion}</p>
            <p className="text-xs text-[#8b7d72]">Duración estimada</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-[#f5ede0] text-center">
            <p className="text-2xl mb-1">💶</p>
            <p className="font-semibold text-[#2d2d2d] text-sm">{priceLabel}</p>
            <p className="text-xs text-[#8b7d72]">
              {treatment.es_precio_real ? "Precio de la clínica" : "Precio orientativo"}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-[#f5ede0] text-center">
            <p className="text-2xl mb-1">📋</p>
            <p className="font-semibold text-[#2d2d2d] text-sm">{treatment.unidad}</p>
            <p className="text-xs text-[#8b7d72]">Precio por</p>
          </div>
        </div>

        {!treatment.es_precio_real && treatment.precio_min > 0 && (
          <div className="bg-[#fdf4eb] border border-[#e07a5f]/20 rounded-2xl p-4 mb-8 text-sm text-[#8b7d72]">
            💡 <strong>Precios orientativos de mercado en Granada</strong> — no constituyen oferta de la clínica. El presupuesto definitivo se entrega tras la valoración gratuita.
          </div>
        )}

        {treatment.imagen_url && (
          <div className={`mb-8 grid gap-4 ${treatment.imagen2_url ? "sm:grid-cols-2" : ""}`}>
            <div className={`relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-md ${treatment.imagen3_url ? "" : ""}`}>
              <Image src={treatment.imagen_url} alt={treatment.nombre} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
            </div>
            {treatment.imagen2_url && (
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-md">
                <Image src={treatment.imagen2_url} alt={`${treatment.nombre} — detalle`} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
              </div>
            )}
            {treatment.imagen3_url && (
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-md sm:col-span-2">
                <Image src={treatment.imagen3_url} alt={`${treatment.nombre} — vista adicional`} fill className="object-cover" sizes="100vw" />
              </div>
            )}
          </div>
        )}

        <div className="prose prose-sm max-w-none mb-8">
          <h2 className="text-xl font-bold text-[#2d2d2d] mb-3">Sobre este tratamiento</h2>
          {treatment.descripcion_larga.split("\n\n").map((parrafo, i) => (
            <p key={i} className="text-[#8b7d72] leading-relaxed mb-4">{parrafo}</p>
          ))}
        </div>

        {treatment.para_quien && (
          <div className="bg-[#7a9e7e]/10 rounded-2xl p-6 mb-8">
            <h3 className="font-bold text-[#5a7e5e] mb-2">¿Para quién es?</h3>
            <p className="text-[#2d2d2d] text-sm leading-relaxed">{treatment.para_quien}</p>
          </div>
        )}

        {treatment.faq && treatment.faq.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-[#2d2d2d] mb-4">Preguntas frecuentes</h2>
            <div className="space-y-4">
              {treatment.faq.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl border border-[#f5ede0] p-5">
                  <p className="font-semibold text-[#2d2d2d] mb-2">{item.pregunta}</p>
                  <p className="text-[#8b7d72] text-sm leading-relaxed">{item.respuesta}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-[#e07a5f] rounded-3xl p-8 text-white text-center">
          <h3 className="text-2xl font-black mb-3">¿Te interesa este tratamiento?</h3>
          <p className="text-white/80 mb-6">
            Pide tu primera visita de valoración — es gratuita y sin compromiso. Te lo explicamos todo con calma.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/presupuestador"
              className="px-6 py-3 rounded-full bg-white text-[#e07a5f] font-semibold hover:shadow-lg transition-all"
            >
              Calcular presupuesto
            </Link>
            <Link
              href="/cita"
              className="px-6 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-all"
            >
              Pedir cita
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
