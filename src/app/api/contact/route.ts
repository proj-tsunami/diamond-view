import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, phone, industry, source, message, emailList } =
    await req.json();

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
