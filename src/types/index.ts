export interface Treatment {
  id: string;
  slug: string;
  nombre: string;
  categoria: TreatmentCategory;
  descripcion_corta: string;
  descripcion_larga: string;
  para_quien: string;
  duracion: string;
  precio_min: number;
  precio_max: number;
  unidad: "pieza" | "arcada" | "sesion" | "tratamiento";
  es_precio_real: boolean;
  visible: boolean;
  orden: number;
  updated_at: string;
  faq?: FAQ[];
  imagen_url?: string;
  imagen2_url?: string;
  imagen3_url?: string;
  contenido_extra?: string;
}

export interface FAQ {
  pregunta: string;
  respuesta: string;
}

export type TreatmentCategory =
  | "ortodoncia"
  | "implantes"
  | "estetica"
  | "periodoncia"
  | "cirugia"
  | "general"
  | "odontopediatria";

export const CATEGORY_LABELS: Record<TreatmentCategory, string> = {
  ortodoncia: "Ortodoncia",
  implantes: "Implantes",
  estetica: "Estética dental",
  periodoncia: "Periodoncia",
  cirugia: "Cirugía oral",
  general: "Odontología general",
  odontopediatria: "Odontopediatría",
};

export const CATEGORY_ICONS: Record<TreatmentCategory, string> = {
  ortodoncia: "🦷",
  implantes: "🔩",
  estetica: "✨",
  periodoncia: "🌿",
  cirugia: "🏥",
  general: "👨‍⚕️",
  odontopediatria: "👶",
};

export interface Lead {
  id?: string;
  nombre: string;
  email: string;
  telefono?: string;
  mensaje?: string;
  origen: "presupuestador" | "cita" | "contacto";
  resumen_presupuesto?: object;
  created_at?: string;
  demo: boolean;
}

export interface BudgetQuestion {
  id: string;
  objetivo: string;
  pregunta: string;
  opciones: BudgetOption[];
  orden: number;
}

export interface BudgetOption {
  id: string;
  label: string;
  value: string;
  siguiente_pregunta?: string;
  tratamientos_ids?: string[];
}

export interface PresupuestoResult {
  titulo: string;
  conceptos: ConceptoPresupuesto[];
  total_min: number;
  total_max: number;
}

export interface ConceptoPresupuesto {
  nombre: string;
  precio_min: number;
  precio_max: number;
  unidad: string;
  cantidad?: number;
}
