import { NextResponse } from "next/server";

/**
 * MOCK kontakt endpoint — trenutno samo loguje u server konzolu.
 * Kasnije zameniti pravom integracijom (Resend / Mailgun / EmailJS).
 *
 * Da pošalješ email u stvarnosti, dodaj integraciju ovde i sve drugo
 * radi isto.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("[KONTAKT FORMA — primljena poruka]", body);

    // Simuliramo malo kašnjenje da bi UI loader bio vidljiv
    await new Promise((resolve) => setTimeout(resolve, 600));

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[KONTAKT FORMA — greška]", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
