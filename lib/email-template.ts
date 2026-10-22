export const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

type Row = { label: string; value: string };

type EmailOptions = {
  badge: string;
  title: string;
  rows: Row[];
  /** Texte libre (ex. message du formulaire), déjà brut : il est échappé ici. */
  body?: string;
  cta?: { label: string; href: string };
};

const FONT =
  "'Nunito', 'Segoe UI', Helvetica, Arial, sans-serif";

export function renderEmail({ badge, title, rows, body, cta }: EmailOptions) {
  const rowsHtml = rows
    .map(
      (r, i) => `
      <tr>
        <td style="padding:14px 16px;background:${i % 2 === 0 ? "#fcf7f9" : "#ffffff"};border-radius:10px;">
          <div style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#c4708c;font-weight:700;margin-bottom:6px;">${escapeHtml(r.label)}</div>
          <div style="font-size:15px;line-height:1.5;color:#120e14;word-break:break-word;">${escapeHtml(r.value)}</div>
        </td>
      </tr>
      <tr><td style="height:8px;font-size:0;line-height:0;">&nbsp;</td></tr>`
    )
    .join("");

  const bodyHtml = body
    ? `<div style="margin-top:8px;padding:18px 20px;background:#fff7fa;border:1px solid #f0d4df;border-radius:14px;font-size:15px;line-height:1.65;color:#302830;">${escapeHtml(body).replace(/\n/g, "<br>")}</div>`
    : "";

  const ctaHtml = cta
    ? `<div style="margin-top:28px;text-align:center;">
        <a href="${escapeHtml(cta.href)}" style="display:inline-block;padding:14px 28px;background:#c4708c;color:#ffffff;text-decoration:none;border-radius:999px;font-size:14px;font-weight:700;letter-spacing:.02em;box-shadow:0 12px 28px rgba(196,112,140,.35);">${escapeHtml(cta.label)}</a>
      </div>`
    : "";

  const html = `<!doctype html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f6eef2;font-family:${FONT};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6eef2;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">
        <tr><td style="padding:0 8px 18px;text-align:center;">
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:22px;color:#c4708c;letter-spacing:.04em;">Leslie OUINSOU</div>
          <div style="margin-top:4px;font-size:12px;color:#9a7a88;letter-spacing:.16em;text-transform:uppercase;">Portfolio</div>
        </td></tr>
        <tr><td>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:22px;overflow:hidden;border:1px solid #eedde5;box-shadow:0 18px 50px rgba(186,150,168,.18);">
            <tr><td style="background:linear-gradient(135deg,#e8b4c4 0%,#d68ca2 45%,#c4708c 100%);padding:30px 32px 26px;">
              <span style="display:inline-block;padding:6px 14px;background:rgba(255,255,255,.28);border:1px solid rgba(255,255,255,.35);border-radius:999px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#ffffff;font-weight:700;">${escapeHtml(badge)}</span>
              <h1 style="margin:16px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.25;color:#ffffff;font-weight:500;">${escapeHtml(title)}</h1>
            </td></tr>
            <tr><td style="padding:28px 28px 12px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rowsHtml}</table>
              ${bodyHtml}
              ${ctaHtml}
            </td></tr>
            <tr><td style="padding:22px 28px 28px;text-align:center;">
              <div style="height:1px;background:#f0d4df;margin-bottom:18px;"></div>
              <div style="font-size:12px;line-height:1.5;color:#9a7a88;">Notification automatique · Leslie OUINSOU</div>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const text = [
    title,
    "",
    ...rows.map((r) => `${r.label} : ${r.value}`),
    ...(body ? ["", body] : []),
    ...(cta ? ["", `${cta.label}: ${cta.href}`] : []),
  ].join("\n");

  return { html, text };
}
