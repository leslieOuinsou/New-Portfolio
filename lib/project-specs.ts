export type SpecSection = {
  title: string;
  titleEn: string;
  items: string[];
  itemsEn: string[];
};

export type ProjectSpec = {
  projectId: number;
  objective: string;
  objectiveEn: string;
  sections: SpecSection[];
};

export const PROJECT_SPECS: ProjectSpec[] = [
  {
    projectId: 7,
    objective:
      "Concevoir une plateforme web de location de bateaux permettant la recherche, la réservation et le paiement sécurisé en ligne.",
    objectiveEn:
      "Design a boat-rental web platform for search, booking and secure online payment.",
    sections: [
      {
        title: "Contexte",
        titleEn: "Context",
        items: [
          "Projet académique orienté architecture fullstack et paiements.",
          "Besoin métier : mettre en relation propriétaires et locataires de bateaux.",
        ],
        itemsEn: [
          "Academic project focused on fullstack architecture and payments.",
          "Business need: connect boat owners and renters.",
        ],
      },
      {
        title: "Acteurs",
        titleEn: "Actors",
        items: [
          "Visiteur : consulte le catalogue.",
          "Utilisateur connecté : réserve et paie.",
          "Administrateur : gère les annonces et le suivi.",
        ],
        itemsEn: [
          "Visitor: browses the catalog.",
          "Logged-in user: books and pays.",
          "Admin: manages listings and follow-up.",
        ],
      },
      {
        title: "Fonctionnalités",
        titleEn: "Features",
        items: [
          "Inscription / connexion sécurisée (JWT, CSRF).",
          "Recherche et consultation des bateaux.",
          "Réservation d’une période et paiement Stripe.",
          "Envoi d’e-mails transactionnels (Nodemailer).",
          "API REST versionnée /api/v1 documentée (Swagger).",
        ],
        itemsEn: [
          "Secure sign-up / login (JWT, CSRF).",
          "Boat search and details.",
          "Period booking and Stripe payment.",
          "Transactional emails (Nodemailer).",
          "Versioned REST API /api/v1 with Swagger.",
        ],
      },
      {
        title: "Contraintes techniques",
        titleEn: "Technical constraints",
        items: [
          "Front : React 19, Vite, React Router, Tailwind CSS.",
          "Back : Node.js, Express, Helmet, validations.",
          "BDD : PostgreSQL + Sequelize (migrations).",
          "Prod : Cloudflare Workers (front), Render (API), Neon (BDD).",
        ],
        itemsEn: [
          "Front: React 19, Vite, React Router, Tailwind CSS.",
          "Back: Node.js, Express, Helmet, validations.",
          "DB: PostgreSQL + Sequelize (migrations).",
          "Prod: Cloudflare Workers (front), Render (API), Neon (DB).",
        ],
      },
      {
        title: "Livrables",
        titleEn: "Deliverables",
        items: [
          "Application déployée et accessible en ligne.",
          "Stack sécurisée et tests (Jest) côté API.",
          "Environnement local Docker Compose.",
        ],
        itemsEn: [
          "Deployed online application.",
          "Secured stack and API tests (Jest).",
          "Local Docker Compose environment.",
        ],
      },
    ],
  },
  {
    projectId: 5,
    objective:
      "Développer une plateforme de jeu concours pour la marque Thé Tip Top, de la participation au suivi des lots, avec une architecture web déployable et monitorable.",
    objectiveEn:
      "Build a contest platform for the Thé Tip Top brand, from entry to prize tracking, with a deployable and monitorable web architecture.",
    sections: [
      {
        title: "Contexte",
        titleEn: "Context",
        items: [
          "Projet académique Mastère Architecture Web.",
          "Objectif : digitaliser un jeu concours tickets / lots.",
        ],
        itemsEn: [
          "Academic Master's Web Architecture project.",
          "Goal: digitize a ticket / prize contest.",
        ],
      },
      {
        title: "Acteurs",
        titleEn: "Actors",
        items: [
          "Participant : saisit un ticket et consulte son résultat.",
          "Administrateur : suit les participations et les lots.",
        ],
        itemsEn: [
          "Participant: enters a ticket and checks the result.",
          "Admin: tracks entries and prizes.",
        ],
      },
      {
        title: "Fonctionnalités",
        titleEn: "Features",
        items: [
          "Participation au concours via ticket.",
          "Attribution / consultation des lots.",
          "Suivi des participations.",
          "Pipeline CI/CD et monitoring associés au déploiement.",
        ],
        itemsEn: [
          "Contest entry via ticket.",
          "Prize assignment / lookup.",
          "Participation tracking.",
          "CI/CD pipeline and monitoring tied to deployment.",
        ],
      },
      {
        title: "Contraintes techniques",
        titleEn: "Technical constraints",
        items: [
          "Next.js, Node.js, PostgreSQL, Prisma.",
          "Hébergement et workflow CI/CD (Jenkins / monitoring).",
        ],
        itemsEn: [
          "Next.js, Node.js, PostgreSQL, Prisma.",
          "Hosting and CI/CD workflow (Jenkins / monitoring).",
        ],
      },
      {
        title: "Livrables",
        titleEn: "Deliverables",
        items: [
          "Site concours en production.",
          "Lien workflow CI/CD.",
          "Base de données et ORM Prisma.",
        ],
        itemsEn: [
          "Contest site in production.",
          "CI/CD workflow link.",
          "Database with Prisma ORM.",
        ],
      },
    ],
  },
  {
    projectId: 6,
    objective:
      "Créer une boutique en ligne de bois de chauffage avec catalogue, devis PDF, e-mails et vérification de livraison par zone.",
    objectiveEn:
      "Build an online firewood shop with catalog, PDF quotes, emails and zone-based delivery checks.",
    sections: [
      {
        title: "Contexte",
        titleEn: "Context",
        items: [
          "Vente de bois de chauffage sec aux particuliers.",
          "Besoin de transparence prix / humidité / livraison.",
        ],
        itemsEn: [
          "Selling dry firewood to individuals.",
          "Need for transparent pricing / moisture / delivery.",
        ],
      },
      {
        title: "Fonctionnalités",
        titleEn: "Features",
        items: [
          "Catalogue (bûches, densifiées, granulés).",
          "Vérification de livraison par code postal.",
          "Devis / factures / bons PDF (pdf-lib).",
          "E-mails via Nodemailer.",
          "Upload d’images (Vercel Blob).",
        ],
        itemsEn: [
          "Catalog (logs, densified logs, pellets).",
          "Delivery check by postal code.",
          "Quotes / invoices / delivery notes as PDF (pdf-lib).",
          "Emails via Nodemailer.",
          "Image uploads (Vercel Blob).",
        ],
      },
      {
        title: "Contraintes techniques",
        titleEn: "Technical constraints",
        items: [
          "Nuxt / Vue 3 / TypeScript / Tailwind CSS.",
          "API Nitro, PostgreSQL, Prisma.",
          "Déploiement Vercel.",
        ],
        itemsEn: [
          "Nuxt / Vue 3 / TypeScript / Tailwind CSS.",
          "Nitro API, PostgreSQL, Prisma.",
          "Vercel deployment.",
        ],
      },
    ],
  },
  {
    projectId: 1,
    objective:
      "Proposer une application de gestion de budget web/mobile pour suivre dépenses, revenus et indicateurs financiers.",
    objectiveEn:
      "Provide a web/mobile budget app to track expenses, income and financial indicators.",
    sections: [
      {
        title: "Fonctionnalités",
        titleEn: "Features",
        items: [
          "Saisie des dépenses et revenus.",
          "Tableaux de bord et reporting.",
          "Persistance PostgreSQL via Prisma.",
        ],
        itemsEn: [
          "Expense and income entry.",
          "Dashboards and reporting.",
          "PostgreSQL persistence via Prisma.",
        ],
      },
      {
        title: "Contraintes techniques",
        titleEn: "Technical constraints",
        items: [
          "React, TypeScript, Vite, Tailwind CSS.",
          "Node.js / Express, Chart.js.",
          "Déploiement Vercel / Render.",
        ],
        itemsEn: [
          "React, TypeScript, Vite, Tailwind CSS.",
          "Node.js / Express, Chart.js.",
          "Vercel / Render deployment.",
        ],
      },
    ],
  },
  {
    projectId: 2,
    objective:
      "Développer un site fullstack de gestion d’événements (création, modification, consultation).",
    objectiveEn:
      "Build a fullstack event-management site (create, edit, view).",
    sections: [
      {
        title: "Fonctionnalités",
        titleEn: "Features",
        items: [
          "CRUD événements.",
          "Consultation par les utilisateurs.",
          "API et base PostgreSQL.",
        ],
        itemsEn: [
          "Event CRUD.",
          "User browsing.",
          "API and PostgreSQL database.",
        ],
      },
      {
        title: "Contraintes techniques",
        titleEn: "Technical constraints",
        items: [
          "React, Node.js, Express, Prisma, PostgreSQL.",
          "Déploiement Vercel.",
        ],
        itemsEn: [
          "React, Node.js, Express, Prisma, PostgreSQL.",
          "Vercel deployment.",
        ],
      },
    ],
  },
  {
    projectId: 3,
    objective:
      "Créer une application mobile de mise en relation entre joueurs (partenaires / équipes).",
    objectiveEn:
      "Create a mobile app to connect players (partners / teams).",
    sections: [
      {
        title: "Fonctionnalités",
        titleEn: "Features",
        items: [
          "Recherche de partenaires ou d’équipes.",
          "Profils joueurs.",
          "Interface mobile-first.",
        ],
        itemsEn: [
          "Search for partners or teams.",
          "Player profiles.",
          "Mobile-first UI.",
        ],
      },
      {
        title: "Contraintes techniques",
        titleEn: "Technical constraints",
        items: ["React Native, Expo, JavaScript."],
        itemsEn: ["React Native, Expo, JavaScript."],
      },
    ],
  },
  {
    projectId: 4,
    objective:
      "Réaliser un site vitrine / menu digital pour une cuisine camerounaise et béninoise.",
    objectiveEn:
      "Build a showcase / digital menu for Cameroonian and Beninese cuisine.",
    sections: [
      {
        title: "Fonctionnalités",
        titleEn: "Features",
        items: [
          "Présentation des plats.",
          "Navigation fluide du menu.",
          "Paiement / parcours e-commerce (Stripe).",
        ],
        itemsEn: [
          "Dish presentation.",
          "Smooth menu browsing.",
          "Payment / e-commerce flow (Stripe).",
        ],
      },
      {
        title: "Contraintes techniques",
        titleEn: "Technical constraints",
        items: [
          "Next.js, React, TypeScript, Tailwind CSS.",
          "Node.js, Express, PostgreSQL, Prisma, Stripe, Vercel.",
        ],
        itemsEn: [
          "Next.js, React, TypeScript, Tailwind CSS.",
          "Node.js, Express, PostgreSQL, Prisma, Stripe, Vercel.",
        ],
      },
    ],
  },
];

export function getProjectSpec(projectId: number) {
  return PROJECT_SPECS.find((s) => s.projectId === projectId) ?? null;
}
