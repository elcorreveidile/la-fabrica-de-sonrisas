import { sql } from "@vercel/postgres";

export { sql };

export async function saveLead(data: {
  nombre: string;
  email: string;
  telefono?: string;
  mensaje?: string;
  origen: string;
  resumen_presupuesto?: object;
}) {
  await sql`
    INSERT INTO leads (nombre, email, telefono, mensaje, origen, resumen_presupuesto, demo)
    VALUES (
      ${data.nombre},
      ${data.email},
      ${data.telefono ?? null},
      ${data.mensaje ?? null},
      ${data.origen},
      ${data.resumen_presupuesto ? JSON.stringify(data.resumen_presupuesto) : null},
      true
    )
  `;
}
