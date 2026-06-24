import { TREATMENTS_FALLBACK } from "./treatments-data";
import { PresupuestoResult, ConceptoPresupuesto } from "@/types";

export interface WizardStep {
  id: string;
  pregunta: string;
  descripcion?: string;
  opciones: WizardOption[];
}

export interface WizardOption {
  label: string;
  value: string;
  emoji?: string;
  nextStepId?: string | null;
  treatmentSlugs?: string[];
}

export const WIZARD_STEPS: WizardStep[] = [
  {
    id: "objetivo",
    pregunta: "¿Qué te gustaría mejorar?",
    descripcion: "Elige la opción que mejor describe lo que buscas. Puedes cambiarla después.",
    opciones: [
      { label: "Alinear mis dientes", value: "ortodoncia", emoji: "😁", nextStepId: "ortodoncia-tipo" },
      { label: "Reponer piezas perdidas", value: "implantes", emoji: "🦷", nextStepId: "implantes-tipo" },
      { label: "Mejorar el aspecto de mi sonrisa", value: "estetica", emoji: "✨", nextStepId: "estetica-tipo" },
      { label: "Revisión, limpieza o caries", value: "general", emoji: "😬", nextStepId: "general-tipo" },
      { label: "Encías o periodoncia", value: "periodoncia", emoji: "🌿", nextStepId: "periodoncia-tipo" },
      { label: "Es para mi hijo/a", value: "ninos", emoji: "👶", nextStepId: null, treatmentSlugs: ["revision-infantil", "selladores-fisuras", "ortodoncia-infantil"] },
    ],
  },
  {
    id: "ortodoncia-tipo",
    pregunta: "¿Qué tipo de ortodoncia te interesa?",
    descripcion: "Hay opciones para todos los gustos y presupuestos.",
    opciones: [
      { label: "Ortodoncia invisible (alineadores)", value: "invisible", emoji: "👻", nextStepId: "ortodoncia-edad", treatmentSlugs: ["ortodoncia-invisible"] },
      { label: "Brackets tradicionales", value: "brackets", emoji: "🔩", nextStepId: "ortodoncia-edad", treatmentSlugs: ["brackets-metalicos"] },
      { label: "Disyunción palatina (maxilar estrecho)", value: "disyuncion", emoji: "🦷", nextStepId: null, treatmentSlugs: ["disyuncion-palatina"] },
      { label: "No lo sé, necesito valoración", value: "valoracion", emoji: "🤔", nextStepId: "ortodoncia-edad", treatmentSlugs: ["brackets-metalicos", "ortodoncia-invisible"] },
    ],
  },
  {
    id: "ortodoncia-edad",
    pregunta: "¿Para quién es el tratamiento?",
    opciones: [
      { label: "Para mí (adulto/a)", value: "adulto", emoji: "🧑", nextStepId: null, treatmentSlugs: [] },
      { label: "Para mi hijo/a (menor)", value: "nino", emoji: "👦", nextStepId: null, treatmentSlugs: ["ortodoncia-infantil"] },
    ],
  },
  {
    id: "implantes-tipo",
    pregunta: "¿Qué tipo de solución buscas?",
    descripcion: "Ofrecemos varias opciones según tu caso.",
    opciones: [
      { label: "Implante convencional", value: "convencional", emoji: "🔩", nextStepId: "implantes-cantidad", treatmentSlugs: [] },
      { label: "Autotrasplante dental (usar un diente propio)", value: "autotrasplante", emoji: "🌱", nextStepId: null, treatmentSlugs: ["autotrasplante-dental"] },
      { label: "Microimplantes", value: "micro", emoji: "🔬", nextStepId: null, treatmentSlugs: ["microimplantes-dentales"] },
      { label: "No lo sé, necesito valoración", value: "no-se", emoji: "🤔", nextStepId: "implantes-cantidad", treatmentSlugs: [] },
    ],
  },
  {
    id: "implantes-cantidad",
    pregunta: "¿Cuántas piezas necesitas reponer?",
    descripcion: "Una estimación aproximada está bien.",
    opciones: [
      { label: "Una pieza", value: "1", emoji: "1️⃣", nextStepId: null, treatmentSlugs: ["implante-unitario"] },
      { label: "2–3 piezas", value: "2-3", emoji: "2️⃣", nextStepId: null, treatmentSlugs: ["implantes-multiples"] },
      { label: "Más de 3 piezas", value: "4+", emoji: "🦷", nextStepId: null, treatmentSlugs: ["implantes-multiples"] },
    ],
  },
  {
    id: "estetica-tipo",
    pregunta: "¿Qué aspecto quieres mejorar?",
    opciones: [
      { label: "Color / blanqueamiento", value: "blanqueo", emoji: "🤍", nextStepId: null, treatmentSlugs: ["blanqueamiento-dental"] },
      { label: "Forma y color (carillas)", value: "carillas", emoji: "💎", nextStepId: null, treatmentSlugs: ["carillas-porcelana", "composite-estetico"] },
      { label: "Ver cómo quedaría antes de decidir (DSD)", value: "dsd", emoji: "🖥️", nextStepId: null, treatmentSlugs: ["diseno-digital-sonrisa"] },
      { label: "Quiero una transformación completa", value: "integral", emoji: "✨", nextStepId: null, treatmentSlugs: ["diseno-digital-sonrisa", "blanqueamiento-dental", "carillas-porcelana"] },
    ],
  },
  {
    id: "general-tipo",
    pregunta: "¿Qué tipo de problema tienes?",
    opciones: [
      { label: "Revisión general / limpieza", value: "revision", emoji: "🔍", nextStepId: null, treatmentSlugs: ["revision-diagnostico", "limpieza-bucal"] },
      { label: "Caries o dolor de muela", value: "caries", emoji: "😣", nextStepId: null, treatmentSlugs: ["empaste", "endodoncia"] },
      { label: "Diente roto o muy dañado", value: "roto", emoji: "💥", nextStepId: null, treatmentSlugs: ["corona-dental", "implante-unitario"] },
      { label: "Extracción / muela del juicio", value: "extraccion", emoji: "😰", nextStepId: null, treatmentSlugs: ["extraccion-muela-juicio"] },
    ],
  },
  {
    id: "periodoncia-tipo",
    pregunta: "¿Cómo están tus encías?",
    opciones: [
      { label: "Limpieza y revisión preventiva", value: "preventiva", emoji: "🌿", nextStepId: null, treatmentSlugs: ["limpieza-bucal", "tratamiento-periodontal"] },
      { label: "Sangran o están retraídas", value: "enfermedad", emoji: "🩸", nextStepId: null, treatmentSlugs: ["tratamiento-periodontal"] },
      { label: "Caso avanzado, ya me lo han dicho", value: "avanzado", emoji: "⚠️", nextStepId: null, treatmentSlugs: ["tratamiento-periodontal", "cirugia-periodontal"] },
    ],
  },
];

export interface WizardAnswer {
  stepId: string;
  optionValue: string;
  treatmentSlugs: string[];
}

export function calculateBudget(answers: WizardAnswer[]): PresupuestoResult {
  const slugsSet = new Set<string>();

  answers.forEach((a) => {
    a.treatmentSlugs.forEach((s) => slugsSet.add(s));
  });

  const slugs = Array.from(slugsSet);
  const treatments = TREATMENTS_FALLBACK.filter((t) => slugs.includes(t.slug));

  const conceptos: ConceptoPresupuesto[] = treatments.map((t) => ({
    nombre: t.nombre,
    precio_min: t.precio_min,
    precio_max: t.precio_max,
    unidad: t.unidad,
  }));

  const total_min = conceptos.reduce((sum, c) => sum + c.precio_min, 0);
  const total_max = conceptos.reduce((sum, c) => sum + c.precio_max, 0);

  const firstAnswer = answers[0];
  const objetivo = firstAnswer?.optionValue ?? "";
  const titulos: Record<string, string> = {
    ortodoncia: "Ortodoncia",
    implantes: "Implantes dentales",
    estetica: "Estética dental",
    general: "Odontología general",
    periodoncia: "Salud periodontal",
    ninos: "Odontopediatría",
  };

  return {
    titulo: titulos[objetivo] ?? "Tu presupuesto orientativo",
    conceptos,
    total_min,
    total_max,
  };
}
