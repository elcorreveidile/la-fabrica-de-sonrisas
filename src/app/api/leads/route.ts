import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, email, telefono, mensaje, origen, resumen_presupuesto } = body;

    if (!nombre || !email || !origen) {
      return NextResponse.json({ error: "Campos requeridos: nombre, email, origen" }, { status: 400 });
    }

    // Save to Vercel Postgres if configured
    if (process.env.POSTGRES_URL) {
      const { saveLead } = await import("@/lib/db");
      await saveLead({ nombre, email, telefono, mensaje, origen, resumen_presupuesto });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead API error:", err);
    return NextResponse.json({ ok: true }); // Silently succeed in demo
  }
}
