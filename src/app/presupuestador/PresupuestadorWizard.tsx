"use client";

import { useState } from "react";
import Link from "next/link";
import {
  WIZARD_STEPS,
  WizardAnswer,
  WizardStep,
  WizardOption,
  calculateBudget,
} from "@/lib/budget-wizard";
import { formatPriceRange, formatPrice } from "@/lib/utils";
import { PresupuestoResult } from "@/types";

type Phase = "wizard" | "result" | "email-sent";

export default function PresupuestadorWizard() {
  const [phase, setPhase] = useState<Phase>("wizard");
  const [currentStepId, setCurrentStepId] = useState("objetivo");
  const [answers, setAnswers] = useState<WizardAnswer[]>([]);
  const [collectedSlugs, setCollectedSlugs] = useState<string[]>([]);
  const [result, setResult] = useState<PresupuestoResult | null>(null);
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);

  const currentStep = WIZARD_STEPS.find((s) => s.id === currentStepId);
  const stepIndex = WIZARD_STEPS.findIndex((s) => s.id === currentStepId);
  const totalVisible = 3; // approximate steps

  function handleOption(option: WizardOption) {
    const newSlugs = [...collectedSlugs, ...(option.treatmentSlugs ?? [])];
    const newAnswer: WizardAnswer = {
      stepId: currentStepId,
      optionValue: option.value,
      treatmentSlugs: option.treatmentSlugs ?? [],
    };
    const newAnswers = [...answers, newAnswer];

    setCollectedSlugs(newSlugs);
    setAnswers(newAnswers);

    if (option.nextStepId) {
      setCurrentStepId(option.nextStepId);
    } else {
      const budget = calculateBudget(newAnswers);
      setResult(budget);
      setPhase("result");
    }
  }

  function handleBack() {
    if (answers.length === 0) return;
    const prev = answers[answers.length - 1];
    setAnswers(answers.slice(0, -1));
    const removedSlugs = prev.treatmentSlugs;
    setCollectedSlugs(collectedSlugs.filter((s) => !removedSlugs.includes(s)));
    setCurrentStepId(prev.stepId);
    setPhase("wizard");
  }

  async function handleSendEmail(e: React.FormEvent) {
    e.preventDefault();
    setSendingEmail(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          email,
          origen: "presupuestador",
          resumen_presupuesto: result,
        }),
      });
      setPhase("email-sent");
    } finally {
      setSendingEmail(false);
    }
  }

  function handleDownloadPDF() {
    if (!result) return;
    const contenido = [
      "LA FÁBRICA DE SONRISAS — Presupuesto Orientativo",
      "================================================",
      `Fecha: ${new Date().toLocaleDateString("es-ES")}`,
      "",
      result.titulo,
      "",
      "CONCEPTOS:",
      ...result.conceptos.map(
        (c) => `• ${c.nombre}: ${formatPriceRange(c.precio_min, c.precio_max)} (por ${c.unidad})`
      ),
      "",
      `TOTAL ESTIMADO: ${formatPriceRange(result.total_min, result.total_max)}`,
      "",
      "⚠️  IMPORTANTE: Este presupuesto es orientativo y no constituye una oferta",
      "de la clínica. Los precios son de referencia de mercado en Granada.",
      "El presupuesto definitivo se entrega tras la visita de valoración (gratuita).",
      "",
      "Clínica La Fábrica de Sonrisas",
      "C. Molinos 34, Realejo — 18009 Granada",
      "Tel: 958 XXX XXX (confirmar)",
      "Horario: L-V 9:30-18:30 (confirmar)",
    ].join("\n");

    const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "presupuesto-orientativo-fabrica-sonrisas.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  if (phase === "wizard" && currentStep) {
    return (
      <WizardStepCard
        step={currentStep}
        stepIndex={stepIndex}
        totalSteps={totalVisible}
        onSelect={handleOption}
        onBack={answers.length > 0 ? handleBack : undefined}
      />
    );
  }

  if (phase === "result" && result) {
    return (
      <div className="space-y-6">
        <ResultCard result={result} />
        <div className="bg-white rounded-3xl border border-[#f5ede0] p-6">
          <h3 className="font-bold text-[#2d2d2d] mb-4">📧 Envíate este presupuesto</h3>
          <form onSubmit={handleSendEmail} className="space-y-3">
            <input
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full rounded-xl border border-[#f5ede0] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#e07a5f]/30"
              required
            />
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-[#f5ede0] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#e07a5f]/30"
              required
            />
            <p className="text-xs text-[#8b7d72]">
              Demo — los datos no se almacenan de forma permanente.
            </p>
            <button
              type="submit"
              disabled={sendingEmail}
              className="w-full py-3 rounded-full bg-[#e07a5f] text-white font-semibold hover:bg-[#c4614a] transition-colors disabled:opacity-50"
            >
              {sendingEmail ? "Enviando..." : "Enviar presupuesto"}
            </button>
          </form>
          <button
            onClick={handleDownloadPDF}
            className="mt-3 w-full py-3 rounded-full border border-[#e07a5f] text-[#e07a5f] font-semibold hover:bg-[#fdf4eb] transition-colors text-sm"
          >
            ⬇️ Descargar como texto
          </button>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setAnswers([]);
              setCollectedSlugs([]);
              setCurrentStepId("objetivo");
              setPhase("wizard");
            }}
            className="flex-1 py-3 rounded-full border border-[#f5ede0] text-[#8b7d72] text-sm font-medium hover:bg-[#f5ede0] transition-colors"
          >
            Empezar de nuevo
          </button>
          <Link
            href="/cita"
            className="flex-1 py-3 rounded-full bg-[#e07a5f] text-white text-sm font-semibold hover:bg-[#c4614a] transition-colors text-center"
          >
            Pedir cita ahora →
          </Link>
        </div>
      </div>
    );
  }

  if (phase === "email-sent") {
    return (
      <div className="bg-white rounded-3xl border border-[#f5ede0] p-8 text-center">
        <p className="text-5xl mb-4">✅</p>
        <h2 className="text-2xl font-black text-[#2d2d2d] mb-3">¡Listo, {nombre}!</h2>
        <p className="text-[#8b7d72] mb-6">
          En breve recibirás tu presupuesto orientativo. Mientras tanto, ¿pedimos cita para la valoración gratuita?
        </p>
        <Link
          href="/cita"
          className="inline-block px-8 py-4 rounded-full bg-[#e07a5f] text-white font-bold hover:bg-[#c4614a] transition-colors"
        >
          Pedir cita gratuita →
        </Link>
      </div>
    );
  }

  return null;
}

function WizardStepCard({
  step,
  stepIndex,
  totalSteps,
  onSelect,
  onBack,
}: {
  step: WizardStep;
  stepIndex: number;
  totalSteps: number;
  onSelect: (opt: WizardOption) => void;
  onBack?: () => void;
}) {
  const microcopy = [
    "Sin prisas. Esta información nos ayuda a orientarte mejor.",
    "No hay respuestas incorrectas — es solo para orientarte.",
    "Ya casi tienes tu estimación 🎉",
  ];

  return (
    <div className="bg-white rounded-3xl border border-[#f5ede0] shadow-sm overflow-hidden">
      {/* Progress bar */}
      <div className="h-1.5 bg-[#f5ede0]">
        <div
          className="h-full bg-[#e07a5f] transition-all duration-500"
          style={{ width: `${((stepIndex + 1) / (totalSteps + 2)) * 100}%` }}
        />
      </div>

      <div className="p-6 md:p-8">
        <p className="text-xs text-[#8b7d72] mb-1 font-medium">
          {microcopy[Math.min(stepIndex, microcopy.length - 1)]}
        </p>
        <h2 className="text-2xl font-black text-[#2d2d2d] mb-2">{step.pregunta}</h2>
        {step.descripcion && (
          <p className="text-[#8b7d72] text-sm mb-6">{step.descripcion}</p>
        )}

        <div className="grid gap-3">
          {step.opciones.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onSelect(opt)}
              className="flex items-center gap-4 w-full text-left px-5 py-4 rounded-2xl border-2 border-[#f5ede0] hover:border-[#e07a5f] hover:bg-[#fdf4eb] transition-all group"
            >
              {opt.emoji && (
                <span className="text-2xl flex-shrink-0">{opt.emoji}</span>
              )}
              <span className="font-semibold text-[#2d2d2d] group-hover:text-[#e07a5f] transition-colors">
                {opt.label}
              </span>
            </button>
          ))}
        </div>

        {onBack && (
          <button
            onClick={onBack}
            className="mt-6 text-sm text-[#8b7d72] hover:text-[#e07a5f] transition-colors flex items-center gap-1"
          >
            ← Atrás
          </button>
        )}
      </div>
    </div>
  );
}

function ResultCard({ result }: { result: PresupuestoResult }) {
  return (
    <div className="bg-white rounded-3xl border border-[#f5ede0] overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-[#e07a5f] to-[#c4614a] p-6 text-white">
        <p className="text-sm font-medium opacity-80 mb-1">Tu estimación orientativa</p>
        <h2 className="text-2xl font-black">{result.titulo}</h2>
        <p className="text-3xl font-black mt-2">
          {result.total_min === 0 && result.total_max === 0
            ? "Primera consulta gratuita"
            : formatPriceRange(result.total_min, result.total_max)}
        </p>
      </div>

      <div className="p-6">
        {result.conceptos.length > 0 && (
          <div className="space-y-3 mb-6">
            {result.conceptos.map((c, i) => (
              <div key={i} className="flex justify-between items-start gap-4 py-2 border-b border-[#f5ede0] last:border-0">
                <span className="text-[#2d2d2d] text-sm font-medium flex-1">{c.nombre}</span>
                <span className="text-[#e07a5f] text-sm font-bold whitespace-nowrap">
                  {c.precio_min === 0 && c.precio_max === 0
                    ? "Gratuita"
                    : formatPriceRange(c.precio_min, c.precio_max)}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="bg-[#fdf4eb] rounded-2xl p-4 text-xs text-[#8b7d72] mb-6 leading-relaxed">
          <strong className="text-[#e07a5f]">Precios orientativos de mercado en Granada</strong> — no constituyen oferta de la clínica.
          Este cálculo es una referencia. La Dra. y su equipo te darán un <strong>presupuesto cerrado en tu primera visita (gratuita)</strong>.
          También ofrecemos <strong>financiación disponible</strong> — consulta condiciones.
        </div>

        <Link
          href="/cita"
          className="block w-full text-center py-4 rounded-full bg-[#e07a5f] text-white font-bold hover:bg-[#c4614a] transition-colors"
        >
          Pedir visita de valoración gratuita →
        </Link>
      </div>
    </div>
  );
}
