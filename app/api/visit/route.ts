import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { PERSONAL_INFO } from "@/lib/constants";
import { renderEmail } from "@/lib/email-template";

export const runtime = "nodejs";

const BOT_RE = /bot|crawl|spider|slurp|preview|facebookexternalhit|headless|lighthouse|vercel|curl|wget/i;

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
  const { html, text } = renderEmail({
    badge: "Nouvelle visite",
    title: "Quelqu'un consulte ton portfolio",
    rows: [
      {
        label: "Date",
        value: new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" }),
      },
      { label: "Lieu", value: `${city}, ${country}` },
      { label: "Provenance", value: referrer },
      { label: "Appareil", value: ua.slice(0, 200) },
    ],
    cta: {
      label: "Ouvrir le portfolio",
      href: "https://new-portfolio-eight-omega.vercel.app/?owner=1",
    },
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio" <${user}>`,
      to: process.env.CONTACT_TO || PERSONAL_INFO.email,
      subject: `Nouvelle visite sur ton portfolio (${city}, ${country})`,
      text,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erreur mail visite:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
