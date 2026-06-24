import { Metadata } from "next";
import TreatmentsClient from "./TreatmentsClient";
import { TREATMENTS_FALLBACK } from "@/lib/treatments-data";

export const metadata: Metadata = {
  title: "Tratamientos",
  description: "Catálogo completo de tratamientos dentales. Ortodoncia, implantes, estética, periodoncia, cirugía oral y odontopediatría.",
};

export default function TratamientosPage() {
  return <TreatmentsClient initialTreatments={TREATMENTS_FALLBACK} />;
}
