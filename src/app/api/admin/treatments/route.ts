import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  if (!process.env.POSTGRES_URL) return NextResponse.json({ treatments: [] });
  const { sql } = await import("@/lib/db");
  const { rows } = await sql`
    SELECT id, slug, nombre, categoria, descripcion_corta, precio_min, precio_max,
           unidad, es_precio_real, visible, orden
    FROM treatments ORDER BY orden, nombre
  `;
  return NextResponse.json({ treatments: rows });
}

export async function POST(req: NextRequest) {
  if (!process.env.POSTGRES_URL) return NextResponse.json({ ok: true });
  const { sql } = await import("@/lib/db");
  const t = await req.json();
  await sql`
    INSERT INTO treatments (slug, nombre, categoria, descripcion_corta, descripcion_larga,
      para_quien, duracion, precio_min, precio_max, unidad, es_precio_real, visible, orden)
    VALUES (
      ${t.slug}, ${t.nombre}, ${t.categoria}, ${t.descripcion_corta ?? ""},
      ${t.descripcion_larga ?? ""}, ${t.para_quien ?? ""}, ${t.duracion ?? ""},
      ${t.precio_min}, ${t.precio_max}, ${t.unidad},
      ${t.es_precio_real}, ${t.visible}, ${t.orden}
    )
  `;
  return NextResponse.json({ ok: true });
}

export async function PUT(req: NextRequest) {
  if (!process.env.POSTGRES_URL) return NextResponse.json({ ok: true });
  const { sql } = await import("@/lib/db");
  const t = await req.json();
  await sql`
    UPDATE treatments SET
      slug = ${t.slug},
      nombre = ${t.nombre},
      categoria = ${t.categoria},
      descripcion_corta = ${t.descripcion_corta ?? ""},
      precio_min = ${t.precio_min},
      precio_max = ${t.precio_max},
      unidad = ${t.unidad},
      es_precio_real = ${t.es_precio_real},
      visible = ${t.visible},
      orden = ${t.orden},
      updated_at = NOW()
    WHERE id = ${t.id}
  `;
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: NextRequest) {
  if (!process.env.POSTGRES_URL) return NextResponse.json({ ok: true });
  const { sql } = await import("@/lib/db");
  const { id, visible } = await req.json();
  await sql`UPDATE treatments SET visible = ${visible} WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!process.env.POSTGRES_URL) return NextResponse.json({ ok: true });
  const { sql } = await import("@/lib/db");
  const { id } = await req.json();
  await sql`DELETE FROM treatments WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}
