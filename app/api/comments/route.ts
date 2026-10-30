import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { PERSONAL_INFO, PROJECTS } from "@/lib/constants";
import { renderEmail } from "@/lib/email-template";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PROJECT_IDS = new Set(PROJECTS.map((p) => p.id));

export async function POST(req: Request) {
  let body: {
    name?: unknown;
    email?: unknown;
    projectId?: unknown;
    rating?: unknown;
    comment?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const comment = typeof body.comment === "string" ? body.comment.trim() : "";
  const projectId =
    typeof body.projectId === "number"
      ? body.projectId
      : typeof body.projectId === "string"
        ? Number(body.projectId)
        : NaN;
  const rating =
    typeof body.rating === "number"
      ? body.rating
      : typeof body.rating === "string"
        ? Number(body.rating)
        : NaN;

  if (
    !name ||
    !comment ||
    !EMAIL_RE.test(email) ||
    !PROJECT_IDS.has(projectId) ||
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 5 ||
    name.length > 100 ||
    email.length > 200 ||
    comment.length > 2000
  ) {
    return NextResponse.json({ error: "Champs invalides" }, { status: 400 });
  }

  const project = PROJECTS.find((p) => p.id === projectId)!;
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

  const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

  const { html, text } = renderEmail({
    badge: "Nouvel avis projet",
    title: `Avis de ${name}`,
    rows: [
      { label: "Nom", value: name },
      { label: "Email", value: email },
      { label: "Projet", value: project.title },
      { label: "Note", value: `${stars} (${rating}/5)` },
    ],
    body: comment,
    cta: { label: "Répondre", href: `mailto:${email}` },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio" <${user}>`,
      to: process.env.CONTACT_TO || PERSONAL_INFO.email,
      replyTo: `"${name.replace(/["\r\n]/g, "")}" <${email}>`,
      subject: `Avis ${rating}/5 — ${project.title} — ${name.replace(/[\r\n]/g, " ")}`,
      text,
      html,
    });
    return NextResponse.json({
      ok: true,
      comment: {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name,
        projectId,
        projectTitle: project.title,
        projectTitleEn: project.titleEn,
        rating,
        comment,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Erreur envoi avis:", error);
    return NextResponse.json({ error: "Envoi impossible" }, { status: 500 });
  }
}
