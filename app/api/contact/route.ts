import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { PERSONAL_INFO } from "@/lib/constants";
import { renderEmail } from "@/lib/email-template";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: { name?: unknown; email?: unknown; message?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (
    !name ||
    !message ||
    !EMAIL_RE.test(email) ||
    name.length > 100 ||
    email.length > 200 ||
    message.length > 5000
  ) {
    return NextResponse.json({ error: "Champs invalides" }, { status: 400 });
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    console.error("GMAIL_USER ou GMAIL_APP_PASSWORD manquant");
    return NextResponse.json({ error: "Serveur mal configuré" }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const { html, text } = renderEmail({
    badge: "Nouveau message",
    title: `Message de ${name}`,
    rows: [
      { label: "Nom", value: name },
      { label: "Email", value: email },
    ],
    body: message,
    cta: { label: "Répondre", href: `mailto:${email}` },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio" <${user}>`,
      to: process.env.CONTACT_TO || PERSONAL_INFO.email,
      replyTo: `"${name.replace(/["\r\n]/g, "")}" <${email}>`,
      subject: `Nouveau message de ${name.replace(/[\r\n]/g, " ")} - Portfolio`,
      text,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erreur envoi mail:", error);
    return NextResponse.json({ error: "Envoi impossible" }, { status: 500 });
  }
}
