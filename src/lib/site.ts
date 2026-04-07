/** Identité & messages de conversion — Leslie Ouinsou */
export const SITE = {
  name: "Leslie Ouinsou",
  /** Métier précis, orienté recruteur */
  role: "Développeuse Full Stack — produits web & apps (React · Node · cloud)",
  /** Valeur unique en une phrase */
  tagline:
    "Je transforme des idées complexes en interfaces que les gens adorent utiliser.",
  bio: [
    "Plus de cinq ans à livrer des applications web et mobiles : du cadrage à la mise en production, je relie design, API et données sans friction.",
    "Mon terrain de jeu : React & Next.js côté front, Node & bases SQL/NoSQL côté back, avec Docker et CI/CD quand il faut industrialiser.",
    "Ce qui me distingue : je parle aussi bien avec les utilisateurs qu’avec les machines — et je documente pour que le projet survive après mon passage.",
  ],
  /** Les chiffres clés sont calculés dans `lib/stats.ts` (projets = liste réelle, années = CAREER_START_YEAR, collaborations = constante). */
  /** Disponibilité — message d’urgence positive */
  availabilityLabel: "Disponible pour un CDI ou une mission longue",
  availabilityDetail: "Réponse sous 48h — entretien possible en visio ou sur Paris.",
  email: "ouinsoul5@gmail.com",
  phone: "+33 7 66 23 45 75",
  github: "https://github.com/leslieOuinsou",
  linkedin: "https://www.linkedin.com/in/leslie-ouinsou-b464822b8",
  cvPath: "/CV-Leslie-Ouinsou.pdf",
  /** Parcours en 3 étapes (About) */
  journey: [
    {
      step: "01",
      title: "Fondations web & frameworks",
      text: "Formation solide en JavaScript, HTML/CSS, puis spécialisation sur Angular et React — comprendre le web avant de le scaler.",
    },
    {
      step: "02",
      title: "Full stack & données",
      text: "Node, Express, MongoDB, PostgreSQL : j’ai appris à modéliser, sécuriser et exposer des APIs utiles, pas seulement des démos.",
    },
    {
      step: "03",
      title: "Produits en production",
      text: "Aujourd’hui je livre des apps déployées (Vercel, Railway, Docker), avec une exigence UX et une dette technique maîtrisée.",
    },
  ],
  differentiation:
    "Je ne fais pas que coder des tickets : je propose des choix d’architecture, je teste ce qui compte, et je rends les équipes autonomes grâce à une doc claire.",
} as const;
