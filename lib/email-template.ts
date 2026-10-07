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

const FONT = "'Segoe UI',Helvetica,Arial,sans-serif";

export function renderEmail({ badge, title, rows, body, cta }: EmailOptions) {
  const rowsHtml = rows
    .map(
      (r) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #f3e4ea;width:120px;vertical-align:top;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#ba96a8;font-weight:600;">${escapeHtml(r.label)}</td>
        <td style="padding:12px 0;border-bottom:1px solid #f3e4ea;font-size:15px;color:#302830;word-break:break-word;">${escapeHtml(r.value)}</td>
      </tr>`
    )
    .join("");

  const bodyHtml = body
    ? `<div style="margin-top:24px;padding:20px;background:#fcf7f9;border-left:4px solid #d68ca2;border-radius:8px;font-size:15px;line-height:1.6;color:#302830;">${escapeHtml(body).replace(/\n/g, "<br>")}</div>`
    : "";

  const ctaHtml = cta
    ? `<div style="margin-top:28px;"><a href="${escapeHtml(cta.href)}" style="display:inline-block;padding:12px 24px;background:#c4708c;color:#ffffff;text-decoration:none;border-radius:999px;font-size:14px;font-weight:600;">${escapeHtml(cta.label)}</a></div>`
    : "";

  const html = `<!doctype html>
<html lang="fr"><body style="margin:0;padding:0;background:#fcf7f9;font-family:${FONT};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fcf7f9;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #f3e4ea;">
        <tr><td style="background:linear-gradient(135deg,#e8b4c4,#c4708c);padding:28px 32px;">
          <div style="display:inline-block;padding:4px 12px;background:rgba(255,255,255,.25);border-radius:999px;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#ffffff;font-weight:600;">${escapeHtml(badge)}</div>
          <h1 style="margin:14px 0 0;font-size:24px;line-height:1.3;color:#ffffff;font-weight:600;">${escapeHtml(title)}</h1>
        </td></tr>
        <tr><td style="padding:24px 32px 32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rowsHtml}</table>
          ${bodyHtml}
          ${ctaHtml}
        </td></tr>
        <tr><td style="padding:16px 32px;background:#fcf7f9;text-align:center;font-size:12px;color:#ba96a8;">
          Portfolio de Leslie OUINSOU
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
  ].join("\n");

  return { html, text };
}
