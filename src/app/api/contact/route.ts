import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const firstName = body.firstName as string;
  const lastName = body.lastName as string;
  const email = body.email as string;
  const phone = body.phone as string | undefined;
  const industry = body.industry as string | undefined;
  const source = body.source as string | undefined;
  const message = body.message as string | undefined;
  const emailList = body.emailList as boolean | undefined;

  const { error } = await resend.emails.send({
    from: "Diamond View Site <noreply@diamondviewstudios.com>",
    to: "info@diamondviewstudios.com",
    replyTo: email,
    subject: `New Project Inquiry — ${firstName} ${lastName}`,
    text: [
      `Name: ${firstName} ${lastName}`,
      `Email: ${email}`,
      `Phone: ${phone || "—"}`,
      `Industry: ${industry || "—"}`,
      `Referral Source: ${source || "—"}`,
      `Email List Opt-in: ${emailList ? "Yes" : "No"}`,
      ``,
      `Message:`,
      message,
    ].join("\n"),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
