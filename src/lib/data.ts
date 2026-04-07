export type ProjectItem = {
  title: string;
  /** Résumé court pour les cartes */
  summary: string;
  problem: string;
  solution: string;
  impact: string;
  tech: string[];
  image: string;
  link?: string;
  github?: string;
};

export const PROJECTS: ProjectItem[] = [
  {
    title: "Player Finder",
    summary: "Trouver le bon joueur, au bon moment, sur mobile.",
    problem:
      "Les joueurs perdent du temps à chercher des partenaires compatibles sur des forums ou groupes dispersés.",
    solution:
      "App React Native avec recherche filtrée, profils clairs et favoris persistés (AsyncStorage) pour un retour instantané.",
    impact:
      "Parcours mobile-first fluide : moins de friction entre intention et partie lancée.",
    tech: ["React Native", "Expo", "React Navigation", "AsyncStorage", "Framer Motion"],
    image: "/player-finder.jpeg",
    link: "https://player-finder-ten.vercel.app",
    github: "https://github.com/leslieOuinsou/Player-Finder",
  },
  {
    title: "Sailingloc",
    summary: "Location de bateaux avec réservation crédible.",
    problem:
      "Coordonner disponibilités, types d’embarcation et paiement sans double réservation ni confusion.",
    solution:
      "Stack SERN (PostgreSQL, Express, React, Node) orchestrée avec Docker Compose pour un environnement reproductible.",
    impact:
      "Une base unique pour propriétaires et locataires : visibilité temps réel sur les créneaux.",
    tech: ["PostgreSQL", "Express", "React", "Node.js", "Docker Compose"],
    image: "/Sailingloc.jpeg",
    link: "https://dsp-dev-o24a-g4.fr/home",
    github: "https://github.com/Yass8/DEVO23-G4-SAILINGLOC",
  },
  {
    title: "Mybudget+",
    summary: "Budget personnel lisible, pas une usine à tableaux.",
    problem:
      "Les utilisateurs abandonnent quand les dépenses ne sont pas catégorisées et qu’ils ne voient pas la tendance.",
    solution:
      "Web app avec suivi en temps réel, catégories et visualisations pour décider vite.",
    impact:
      "Vision immédiate des flux : moins d’erreurs, plus de contrôle sur le mois.",
    tech: ["React", "Node.js", "MongoDB", "TypeScript"],
    image: "/MyBudget.jpeg",
    link: "https://my-budjet-web.vercel.app",
    github: "https://github.com/leslieOuinsou/MyBudjet-",
  },
  {
    title: "Pokemon",
    summary: "Collection et recherche, sans sacrifier la rigueur du code.",
    problem:
      "Afficher beaucoup de données Pokémon sans sacrifier la maintenabilité ni la performance front.",
    solution:
      "TypeScript, composants découpés et consommation d’API structurée pour une UI réactive.",
    impact:
      "Base de code prévisible : évolutions et features sans réécriture permanente.",
    tech: ["TypeScript", "React", "API REST"],
    image: "/Pokemon.jpeg",
    github: "https://github.com/leslieOuinsou/Pokemon",
  },
  {
    title: "Afrofood",
    summary: "Culture culinaire africaine, accessible et searchable.",
    problem:
      "Recettes dispersées, filtres faibles : difficile de trouver par région ou ingrédient.",
    solution:
      "Plateforme Next.js + stack moderne avec recherche, filtres et UX soignée.",
    impact:
      "Découverte guidée : plus de parcours abandonnés en cours de recherche.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind", "Node.js", "Express", "MongoDB"],
    image: "/Afrofood.jpeg",
    link: "https://afrofood.vercel.app",
  },
  {
    title: "Site vitrine Angular",
    summary: "Vitrine pro qui respire la maîtrise du framework.",
    problem:
      "Présenter une offre avec une navigation claire et des animations sans alourdir les perfs.",
    solution:
      "Angular + SCSS, structure modulaire et patterns du framework respectés.",
    impact:
      "Image pro renforcée : site rapide, responsive, évolutif.",
    tech: ["Angular", "SCSS", "TypeScript"],
    image: "/site-angular.jpeg",
    github: "https://github.com/leslieOuinsou/site-vitrine-angular",
  },
  {
    title: "Gestion des Événements",
    summary: "Événements de bout en bout, jusqu’au paiement.",
    problem:
      "Les organisateurs ont besoin de CRUD fiable, validation, et parfois monétisation (Stripe) sans stack bricolée.",
    solution:
      "React 19, Flowbite, Framer Motion côté client ; Express 5, MongoDB, JWT, Stripe, Nodemailer côté serveur — déployé sur Vercel.",
    impact:
      "Un produit cohérent de l’inscription à la notification : moins d’erreurs métier, plus de confiance.",
    tech: [
      "React 19",
      "Tailwind",
      "Flowbite",
      "React Router",
      "Framer Motion",
      "Node.js",
      "Express 5",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Stripe",
      "Nodemailer",
      "Vercel",
    ],
    image: "/events.jpeg",
    link: "https://gestion-evenements-frontend.vercel.app",
    github: "https://github.com/leslieOuinsou/gestion-des-evenements",
  },
  {
    title: "Sudoku Game",
    summary: "Jeu complet, règles respectées, feedback immédiat.",
    problem:
      "Les joueurs veulent des grilles valides et un feedback sans rechargement de page.",
    solution:
      "Logique de génération/validation et UI claire en JS vanilla maîtrisé.",
    impact:
      "Expérience de jeu fluide : règles apprises par l’usage.",
    tech: ["JavaScript", "HTML5", "CSS3"],
    image: "/Sudoku.jpeg",
    github: "https://github.com/leslieOuinsou/Sudoku-game",
  },
  {
    title: "Marketplace",
    summary: "Marketplace conteneurisée, prête pour l’infra cloud.",
    problem:
      "Vendre en ligne avec un socle PHP/Java cohérent et déployable sans « ça marche sur ma machine ».",
    solution:
      "Architecture Docker, services PHP/Java articulés pour catalogue et commandes.",
    impact:
      "Déploiement Railway : disponibilité et itérations plus rapides pour le métier.",
    tech: ["PHP", "Java", "Docker"],
    image: "/Logo_MarketPlace.png",
    link: "https://maketplace-production.up.railway.app",
  },
];

export type SkillEntry = { name: string; level: number };

export type SkillCategory = {
  id: string;
  label: string;
  items: SkillEntry[];
};

/** Niveaux 0–100 — lecture recruteur : barres animées */
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "fe",
    label: "Front-end & UI",
    items: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "Angular", level: 88 },
      { name: "HTML / CSS / Tailwind", level: 94 },
    ],
  },
  {
    id: "be",
    label: "Back-end & API",
    items: [
      { name: "Node.js / Express", level: 90 },
      { name: "PHP / Symfony", level: 78 },
      { name: "Java / Spring", level: 72 },
    ],
  },
  {
    id: "data",
    label: "Données",
    items: [
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 88 },
    ],
  },
  {
    id: "ops",
    label: "DevOps & qualité",
    items: [
      { name: "Docker / CI", level: 82 },
      { name: "Git / GitHub", level: 93 },
      { name: "Tests (Jest / Vitest)", level: 80 },
    ],
  },
];
