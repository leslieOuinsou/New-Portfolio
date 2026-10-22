import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { PERSONAL_INFO } from "@/lib/constants";
import { renderEmail } from "@/lib/email-template";

export const runtime = "nodejs";

const BOT_RE =
  /bot|crawl|spider|slurp|preview|facebookexternalhit|headless|lighthouse|vercel|curl|wget/i;

const decode = (v: string | null) => {
  if (!v) return "";
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
};

const clientIp = (req: Request) => {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "";
  return req.headers.get("x-real-ip") || "";
};

type GeoExtra = {
  place?: string;
  isp?: string;
  org?: string;
};

async function enrichGeo(ip: string, lat: string, lon: string): Promise<GeoExtra> {
  const extra: GeoExtra = {};

  if (lat && lon) {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&format=json&zoom=14&addressdetails=1`;
      const res = await fetch(url, {
        headers: { "User-Agent": "LesliePortfolioVisitMail/1.0" },
        next: { revalidate: 0 },
      });
      if (res.ok) {
        const data = (await res.json()) as { display_name?: string };
        if (data.display_name) extra.place = data.display_name;
      }
    } catch {
      /* ignore */
    }
  }

  if (ip && !ip.startsWith("127.") && ip !== "::1") {
    try {
      const res = await fetch(`https://ipapi.co/${encodeURIComponent(ip)}/json/`, {
        headers: { "User-Agent": "LesliePortfolioVisitMail/1.0" },
      });
      if (res.ok) {
        const data = (await res.json()) as {
          org?: string;
          asn?: string;
          error?: boolean;
        };
        if (!data.error) {
          if (data.org) extra.org = data.org;
          if (data.asn) extra.isp = data.asn;
        }
      }
    } catch {
      /* ignore */
    }
  }

  return extra;
}

export async function POST(req: Request) {
  const ua = req.headers.get("user-agent") ?? "";
  if (!ua || BOT_RE.test(ua)) return NextResponse.json({ ok: true, skipped: true });

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return NextResponse.json({ ok: false }, { status: 500 });

  let referrer = "direct";
  let timezone = "";
  let languages = "";
  try {
    const body = await req.json();
    if (typeof body?.referrer === "string" && body.referrer) {
      referrer = body.referrer.slice(0, 300);
    }
    if (typeof body?.timezone === "string" && body.timezone) {
      timezone = body.timezone.slice(0, 80);
    }
    if (typeof body?.languages === "string" && body.languages) {
      languages = body.languages.slice(0, 120);
    }
  } catch {
    /* ignore */
  }

  const country = decode(req.headers.get("x-vercel-ip-country")) || "inconnu";
  const region = decode(req.headers.get("x-vercel-ip-country-region"));
  const city = decode(req.headers.get("x-vercel-ip-city")) || "inconnu";
  const lat = decode(req.headers.get("x-vercel-ip-latitude"));
  const lon = decode(req.headers.get("x-vercel-ip-longitude"));
  const ip = clientIp(req);
  const acceptLang =
    languages || decode(req.headers.get("accept-language")).slice(0, 120) || "inconnu";

  const extra = await enrichGeo(ip, lat, lon);

  const lieuParts = [city, region, country].filter(Boolean);
  const lieu = lieuParts.join(", ") || "inconnu";
  const coords = lat && lon ? `${lat}, ${lon}` : "";
  const mapHref =
    lat && lon
      ? `https://www.google.com/maps?q=${encodeURIComponent(`${lat},${lon}`)}`
      : "";

  const { html, text } = renderEmail({
    badge: "Nouvelle visite",
    title: "Quelqu'un consulte ton portfolio",
    rows: [
      {
        label: "Date",
        value: new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" }),
      },
      {
        label: "Visiteur",
        value:
          "Identité inconnue (un nom/prénom n’est pas disponible sans formulaire rempli)",
      },
      { label: "Lieu", value: lieu },
      ...(extra.place ? [{ label: "Adresse approximative", value: extra.place }] : []),
      ...(coords ? [{ label: "Coordonnées", value: coords }] : []),
      ...(extra.org ? [{ label: "Réseau / FAI", value: extra.org }] : []),
      ...(ip ? [{ label: "IP", value: ip }] : []),
      ...(timezone ? [{ label: "Fuseau", value: timezone }] : []),
      { label: "Langue navigateur", value: acceptLang },
      { label: "Provenance", value: referrer },
      { label: "Appareil", value: ua.slice(0, 200) },
    ],
    cta: mapHref
      ? { label: "Voir sur Google Maps", href: mapHref }
      : {
          label: "Ouvrir le portfolio",
          href: `${PERSONAL_INFO.portfolio.replace(/\/$/, "")}?owner=1`,
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
      subject: `Nouvelle visite — ${lieu}`,
      text,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erreur mail visite:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
