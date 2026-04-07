import emailjs from "@emailjs/browser";

export type VisitPayload = {
  visitDate: string;
  visitTime: string;
  country: string;
  language: string;
  device: string;
  screen: string;
  url: string;
  referrer: string;
  browser: string;
};

function getEnv(): {
  publicKey: string;
  serviceId: string;
  templateId: string;
} | null {
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
  if (!publicKey || !serviceId || !templateId) return null;
  return { publicKey, serviceId, templateId };
}

/**
 * Envoie une notification EmailJS avec le détail de la visite.
 * Configure ton template EmailJS pour utiliser ces clés (noms courants) :
 * - message ou visit_details : corps du message
 * - from_name : libellé expéditeur
 * - reply_to : email (optionnel)
 */
export async function sendVisitNotification(payload: VisitPayload): Promise<void> {
  const env = getEnv();
  if (!env) {
    if (process.env.NODE_ENV === "development") {
      console.info(
        "[visit] EmailJS désactivé : définir NEXT_PUBLIC_EMAILJS_PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID"
      );
    }
    return;
  }

  const body = [
    `Date : ${payload.visitDate}`,
    `Heure : ${payload.visitTime}`,
    `Pays : ${payload.country}`,
    `Langue : ${payload.language}`,
    `Appareil : ${payload.device}`,
    `Écran : ${payload.screen}`,
    `URL : ${payload.url}`,
    `Referrer : ${payload.referrer}`,
    `Navigateur : ${payload.browser}`,
  ].join("\n");

  await emailjs.send(
    env.serviceId,
    env.templateId,
    {
      from_name: "Visite portfolio",
      message: body,
      visit_details: body,
      ...payload,
    },
    { publicKey: env.publicKey }
  );
}
