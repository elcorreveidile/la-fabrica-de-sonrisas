import { NextResponse } from "next/server";

export async function GET() {
  if (!process.env.POSTGRES_URL) {
    return NextResponse.json({ leads: [] });
  }
  const { sql } = await import("@/lib/db");
  const { rows } = await sql`
    SELECT id, nombre, email, origen, created_at
    FROM leads ORDER BY created_at DESC LIMIT 100
  `;
  return NextResponse.json({ leads: rows });
}
