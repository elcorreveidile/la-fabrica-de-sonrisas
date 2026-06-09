import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, email, telefono, mensaje, origen, resumen_presupuesto } = body;

    if (!nombre || !email || !origen) {
      return NextResponse.json({ error: "Campos requeridos: nombre, email, origen" }, { status: 400 });
    }

    // Try to save to Supabase if configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && serviceKey && !supabaseUrl.includes("tu-proyecto")) {
      const { createAdminClient } = await import("@/lib/supabase/admin");
      const supabase = createAdminClient();
      await supabase.from("leads").insert({
        nombre,
        email,
        telefono: telefono || null,
        mensaje: mensaje || null,
        origen,
        resumen_presupuesto: resumen_presupuesto || null,
        demo: true,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead API error:", err);
    return NextResponse.json({ ok: true }); // Silently succeed in demo
  }
}
