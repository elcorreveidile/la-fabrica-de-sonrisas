import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  if (!process.env.POSTGRES_URL) {
    return NextResponse.json({ treatments: [] });
  }
  const { sql } = await import("@/lib/db");
  const { rows } = await sql`
    SELECT id, nombre, categoria, precio_min, precio_max, visible, es_precio_real
    FROM treatments ORDER BY orden
  `;
  return NextResponse.json({ treatments: rows });
}

export async function PATCH(req: NextRequest) {
  if (!process.env.POSTGRES_URL) {
    return NextResponse.json({ ok: true });
  }
  const { id, visible } = await req.json();
  const { sql } = await import("@/lib/db");
  await sql`UPDATE treatments SET visible = ${visible} WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}
