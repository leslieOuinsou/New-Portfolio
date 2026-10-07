import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { PERSONAL_INFO } from "@/lib/constants";

export const runtime = "nodejs";

const BOT_RE = /bot|crawl|spider|slurp|preview|facebookexternalhit|headless|lighthouse|vercel|curl|wget/i;

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const decode = (v: string | null) => {
  if (!v) return "inconnu";
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
};

export async function POST(req: Request) {
  const ua = req.headers.get("user-agent") ?? "";
  if (!ua || BOT_RE.test(ua)) return NextResponse.json({ ok: true, skipped: true });

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return NextResponse.json({ ok: false }, { status: 500 });

  let referrer = "direct";
  try {
    const body = await req.json();
    if (typeof body?.referrer === "string" && body.referrer) {
      referrer = body.referrer.slice(0, 300);
    }
  } catch {}

  const country = decode(req.headers.get("x-vercel-ip-country"));
  const city = decode(req.headers.get("x-vercel-ip-city"));
  const lines = [
    `Date : ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}`,
    `Lieu : ${city}, ${country}`,
    `Provenance : ${referrer}`,
    `Appareil : ${ua.slice(0, 200)}`,
  ];

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio" <${user}>`,
      to: process.env.CONTACT_TO || PERSONAL_INFO.email,
      subject: `Nouvelle visite sur ton portfolio (${city}, ${country})`,
      text: lines.join("\n"),
      html: lines.map((l) => `<div>${escapeHtml(l)}</div>`).join(""),
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erreur mail visite:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
