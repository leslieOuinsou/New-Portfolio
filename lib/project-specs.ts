export type SpecSection = {
  title: string;
  titleEn: string;
  items: string[];
  itemsEn: string[];
};

export type ProjectSpec = {
  projectId: number;
  docRef: string;
  version: string;
  objective: string;
  objectiveEn: string;
  sections: SpecSection[];
};

export const PROJECT_SPECS: ProjectSpec[] = [
  {
    projectId: 7,
    docRef: "CDC-SAILINGLOC-2025",
    version: "1.2",
    objective:
      "Concevoir et livrer une plateforme web de location de bateaux permettant la recherche, la réservation et le paiement sécurisé, dans le cadre d’un projet académique d’architecture fullstack.",
    objectiveEn:
      "Design and deliver a boat-rental web platform for search, booking and secure payment, as an academic fullstack architecture project.",
    sections: [
      {
        title: "1. Identification du projet",
        titleEn: "1. Project identification",
        items: [
          "Nom : SailingLoc — plateforme de location de bateaux.",
          "Nature : projet académique (architecture web / fullstack).",
          "Périmètre : front web, API REST, base de données, paiements, e-mails.",
          "Hors périmètre : application native mobile, courtage maritime réglementé.",
        ],
        itemsEn: [
          "Name: SailingLoc — boat rental platform.",
          "Nature: academic project (web / fullstack architecture).",
          "Scope: web front, REST API, database, payments, emails.",
          "Out of scope: native mobile app, regulated maritime brokerage.",
        ],
      },
      {
        title: "2. Contexte et enjeux",
        titleEn: "2. Context and stakes",
        items: [
          "Mettre en relation propriétaires et locataires de bateaux via un parcours digital.",
          "Sécuriser les transactions (authentification, CSRF, paiement Stripe).",
          "Démontrer une architecture déployable (Cloudflare Workers, Render, Neon).",
        ],
        itemsEn: [
          "Connect boat owners and renters through a digital journey.",
          "Secure transactions (auth, CSRF, Stripe payment).",
          "Demonstrate a deployable architecture (Cloudflare Workers, Render, Neon).",
        ],
      },
      {
        title: "3. Acteurs et cas d’usage",
        titleEn: "3. Actors and use cases",
        items: [
          "Visiteur : consulte le catalogue sans compte.",
          "Locataire : s’inscrit, réserve une période, paie en ligne.",
          "Propriétaire / admin : gère les annonces et le suivi des réservations.",
          "Système : envoie les e-mails transactionnels et journalise les paiements.",
        ],
        itemsEn: [
          "Visitor: browses the catalog without an account.",
          "Renter: signs up, books a period, pays online.",
          "Owner / admin: manages listings and booking follow-up.",
          "System: sends transactional emails and logs payments.",
        ],
      },
      {
        title: "4. Besoins fonctionnels",
        titleEn: "4. Functional requirements",
        items: [
          "RF01 — Inscription / connexion sécurisée (JWT, protection CSRF).",
          "RF02 — Recherche et fiche détail des bateaux (photos, capacités, tarifs).",
          "RF03 — Réservation d’une période avec vérification de disponibilité.",
          "RF04 — Paiement en ligne via Stripe et confirmation de commande.",
          "RF05 — E-mails transactionnels (Nodemailer) à chaque étape clé.",
          "RF06 — API REST versionnée /api/v1 documentée (Swagger).",
        ],
        itemsEn: [
          "FR01 — Secure sign-up / login (JWT, CSRF protection).",
          "FR02 — Boat search and detail pages (photos, capacity, pricing).",
          "FR03 — Period booking with availability check.",
          "FR04 — Online Stripe payment and order confirmation.",
          "FR05 — Transactional emails (Nodemailer) at key steps.",
          "FR06 — Versioned REST API /api/v1 with Swagger docs.",
        ],
      },
      {
        title: "5. Besoins non fonctionnels",
        titleEn: "5. Non-functional requirements",
        items: [
          "RNF01 — Sécurité : Helmet, validations d’entrée, secrets hors dépôt.",
          "RNF02 — Performance : temps de réponse API acceptable en conditions normales.",
          "RNF03 — Maintenabilité : migrations Sequelize, environnement Docker Compose.",
          "RNF04 — Qualité : tests Jest côté API.",
          "RNF05 — Disponibilité : front et API déployés séparément.",
        ],
        itemsEn: [
          "NFR01 — Security: Helmet, input validation, secrets out of repo.",
          "NFR02 — Performance: acceptable API latency under normal load.",
          "NFR03 — Maintainability: Sequelize migrations, Docker Compose.",
          "NFR04 — Quality: Jest tests on the API.",
          "NFR05 — Availability: front and API deployed separately.",
        ],
      },
      {
        title: "6. Contraintes techniques",
        titleEn: "6. Technical constraints",
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
        title: "7. Livrables",
        titleEn: "7. Deliverables",
        items: [
          "Application déployée et accessible en ligne.",
          "Documentation API Swagger et README d’installation.",
          "Environnement local Docker Compose.",
          "Cahier des charges et démonstration de soutenance.",
        ],
        itemsEn: [
          "Deployed online application.",
          "Swagger API docs and install README.",
          "Local Docker Compose environment.",
          "Specifications document and defense demo.",
        ],
      },
    ],
  },
  {
    projectId: 5,
    docRef: "CDC-THETIPTOP-2025",
    version: "1.3",
    objective:
      "Développer une plateforme de jeu concours pour la marque Thé Tip Top, de la participation au suivi des lots, avec une architecture web déployable, industrialisée (CI/CD) et monitorable.",
    objectiveEn:
      "Build a contest platform for the Thé Tip Top brand, from entry to prize tracking, with a deployable, CI/CD-industrialized and monitorable web architecture.",
    sections: [
      {
        title: "1. Identification du projet",
        titleEn: "1. Project identification",
        items: [
          "Nom : Thé Tip Top — jeu concours digital.",
          "Nature : projet académique Mastère Architecture Web.",
          "Périmètre : participation ticket, attribution de lots, back-office, CI/CD, monitoring.",
          "Hors périmètre : logistique physique d’envoi des lots, CRM marketing avancé.",
        ],
        itemsEn: [
          "Name: Thé Tip Top — digital contest.",
          "Nature: Master's Web Architecture academic project.",
          "Scope: ticket entry, prize assignment, back-office, CI/CD, monitoring.",
          "Out of scope: physical prize shipping logistics, advanced marketing CRM.",
        ],
      },
      {
        title: "2. Contexte et enjeux",
        titleEn: "2. Context and stakes",
        items: [
          "Digitaliser un jeu concours basé sur des tickets / lots pour la marque Thé Tip Top.",
          "Garantir un parcours participant simple et traçable.",
          "Mettre en place une chaîne de déploiement et de supervision (DevOps).",
        ],
        itemsEn: [
          "Digitize a ticket / prize contest for the Thé Tip Top brand.",
          "Ensure a simple and traceable participant journey.",
          "Set up a deployment and supervision pipeline (DevOps).",
        ],
      },
      {
        title: "3. Acteurs et cas d’usage",
        titleEn: "3. Actors and use cases",
        items: [
          "Participant : saisit un ticket, consulte le résultat et le lot associé.",
          "Administrateur : suit les participations, les stocks de lots et les statistiques.",
          "Ops : déploie via CI/CD et surveille l’application (Grafana / Prometheus).",
        ],
        itemsEn: [
          "Participant: enters a ticket, checks result and assigned prize.",
          "Admin: tracks entries, prize stock and statistics.",
          "Ops: deploys via CI/CD and monitors the app (Grafana / Prometheus).",
        ],
      },
      {
        title: "4. Besoins fonctionnels",
        titleEn: "4. Functional requirements",
        items: [
          "RF01 — Saisie et validation d’un code ticket.",
          "RF02 — Attribution / consultation du lot gagné.",
          "RF03 — Suivi des participations (historique, anti-doublon).",
          "RF04 — Espace administrateur de pilotage du concours.",
          "RF05 — Journalisation des événements métier utiles au suivi.",
        ],
        itemsEn: [
          "FR01 — Ticket code entry and validation.",
          "FR02 — Prize assignment / lookup.",
          "FR03 — Participation tracking (history, anti-duplicate).",
          "FR04 — Admin space to steer the contest.",
          "FR05 — Logging of business events for follow-up.",
        ],
      },
      {
        title: "5. Besoins non fonctionnels",
        titleEn: "5. Non-functional requirements",
        items: [
          "RNF01 — Fiabilité : pas de double attribution de lot pour un même ticket.",
          "RNF02 — Sécurité : accès admin protégé, données en base PostgreSQL.",
          "RNF03 — Industrialisation : pipeline CI/CD (Jenkins / GitLab).",
          "RNF04 — Observabilité : métriques et tableaux de bord (Prometheus / Grafana).",
          "RNF05 — Scalabilité raisonnable pour un pic de participations.",
        ],
        itemsEn: [
          "NFR01 — Reliability: no double prize for the same ticket.",
          "NFR02 — Security: protected admin access, PostgreSQL data store.",
          "NFR03 — Industrialization: CI/CD pipeline (Jenkins / GitLab).",
          "NFR04 — Observability: metrics and dashboards (Prometheus / Grafana).",
          "NFR05 — Reasonable scalability for participation spikes.",
        ],
      },
      {
        title: "6. Contraintes techniques",
        titleEn: "6. Technical constraints",
        items: [
          "Stack applicative : Next.js, Node.js, PostgreSQL, Prisma.",
          "Hébergement et workflow CI/CD documentés.",
          "Monitoring associé au déploiement de production.",
        ],
        itemsEn: [
          "App stack: Next.js, Node.js, PostgreSQL, Prisma.",
          "Hosting and documented CI/CD workflow.",
          "Monitoring tied to the production deployment.",
        ],
      },
      {
        title: "7. Livrables",
        titleEn: "7. Deliverables",
        items: [
          "Site concours en production.",
          "Lien / documentation du workflow CI/CD.",
          "Schéma de données Prisma et scripts de migration.",
          "Cahier des charges et démonstration de soutenance.",
        ],
        itemsEn: [
          "Contest site in production.",
          "CI/CD workflow link / documentation.",
          "Prisma data model and migration scripts.",
          "Specifications document and defense demo.",
        ],
      },
    ],
  },
  {
    projectId: 6,
    docRef: "CDC-WARMFIRE-2025",
    version: "1.1",
    objective:
      "Créer une boutique en ligne de bois de chauffage avec catalogue, devis PDF, e-mails et vérification de livraison par zone.",
    objectiveEn:
      "Build an online firewood shop with catalog, PDF quotes, emails and zone-based delivery checks.",
    sections: [
      {
        title: "1. Contexte",
        titleEn: "1. Context",
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
        title: "2. Besoins fonctionnels",
        titleEn: "2. Functional requirements",
        items: [
          "RF01 — Catalogue (bûches, densifiées, granulés).",
          "RF02 — Vérification de livraison par code postal.",
          "RF03 — Devis / factures / bons PDF (pdf-lib).",
          "RF04 — E-mails via Nodemailer.",
          "RF05 — Upload d’images (Vercel Blob).",
        ],
        itemsEn: [
          "FR01 — Catalog (logs, densified logs, pellets).",
          "FR02 — Delivery check by postal code.",
          "FR03 — Quotes / invoices / notes as PDF (pdf-lib).",
          "FR04 — Emails via Nodemailer.",
          "FR05 — Image uploads (Vercel Blob).",
        ],
      },
      {
        title: "3. Contraintes techniques",
        titleEn: "3. Technical constraints",
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
      {
        title: "4. Livrables",
        titleEn: "4. Deliverables",
        items: [
          "Boutique déployée en ligne.",
          "Parcours devis PDF et e-mails opérationnels.",
        ],
        itemsEn: [
          "Online shop deployed.",
          "Working PDF quote and email flows.",
        ],
      },
    ],
  },
  {
    projectId: 1,
    docRef: "CDC-MYBUDGET-2024",
    version: "1.0",
    objective:
      "Proposer une application de gestion de budget web/mobile pour suivre dépenses, revenus et indicateurs financiers.",
    objectiveEn:
      "Provide a web/mobile budget app to track expenses, income and financial indicators.",
    sections: [
      {
        title: "1. Besoins fonctionnels",
        titleEn: "1. Functional requirements",
        items: [
          "RF01 — Saisie des dépenses et revenus.",
          "RF02 — Tableaux de bord et reporting.",
          "RF03 — Persistance PostgreSQL via Prisma.",
        ],
        itemsEn: [
          "FR01 — Expense and income entry.",
          "FR02 — Dashboards and reporting.",
          "FR03 — PostgreSQL persistence via Prisma.",
        ],
      },
      {
        title: "2. Contraintes techniques",
        titleEn: "2. Technical constraints",
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
      {
        title: "3. Livrables",
        titleEn: "3. Deliverables",
        items: ["Application budget déployée.", "Reporting graphique opérationnel."],
        itemsEn: ["Deployed budget app.", "Working chart reporting."],
      },
    ],
  },
  {
    projectId: 2,
    docRef: "CDC-EVENTS-2024",
    version: "1.0",
    objective:
      "Développer un site fullstack de gestion d’événements (création, modification, consultation).",
    objectiveEn:
      "Build a fullstack event-management site (create, edit, view).",
    sections: [
      {
        title: "1. Besoins fonctionnels",
        titleEn: "1. Functional requirements",
        items: [
          "RF01 — CRUD événements.",
          "RF02 — Consultation par les utilisateurs.",
          "RF03 — API et base PostgreSQL.",
        ],
        itemsEn: [
          "FR01 — Event CRUD.",
          "FR02 — User browsing.",
          "FR03 — API and PostgreSQL database.",
        ],
      },
      {
        title: "2. Contraintes techniques",
        titleEn: "2. Technical constraints",
        items: [
          "React, Node.js, Express, Prisma, PostgreSQL.",
          "Déploiement Vercel.",
        ],
        itemsEn: [
          "React, Node.js, Express, Prisma, PostgreSQL.",
          "Vercel deployment.",
        ],
      },
      {
        title: "3. Livrables",
        titleEn: "3. Deliverables",
        items: ["Site événements en ligne.", "API CRUD documentée dans le README."],
        itemsEn: ["Online events site.", "CRUD API documented in the README."],
      },
    ],
  },
  {
    projectId: 3,
    docRef: "CDC-PLAYERFINDER-2024",
    version: "1.0",
    objective:
      "Créer une application mobile de mise en relation entre joueurs (partenaires / équipes).",
    objectiveEn:
      "Create a mobile app to connect players (partners / teams).",
    sections: [
      {
        title: "1. Besoins fonctionnels",
        titleEn: "1. Functional requirements",
        items: [
          "RF01 — Recherche de partenaires ou d’équipes.",
          "RF02 — Profils joueurs.",
          "RF03 — Interface mobile-first.",
        ],
        itemsEn: [
          "FR01 — Search for partners or teams.",
          "FR02 — Player profiles.",
          "FR03 — Mobile-first UI.",
        ],
      },
      {
        title: "2. Contraintes techniques",
        titleEn: "2. Technical constraints",
        items: ["React Native, Expo, JavaScript."],
        itemsEn: ["React Native, Expo, JavaScript."],
      },
      {
        title: "3. Livrables",
        titleEn: "3. Deliverables",
        items: ["Application Expo exécutable.", "Parcours de mise en relation joueurs."],
        itemsEn: ["Runnable Expo app.", "Player matching flow."],
      },
    ],
  },
  {
    projectId: 4,
    docRef: "CDC-AFROFOOD-2024",
    version: "1.0",
    objective:
      "Réaliser un site vitrine / menu digital pour une cuisine camerounaise et béninoise.",
    objectiveEn:
      "Build a showcase / digital menu for Cameroonian and Beninese cuisine.",
    sections: [
      {
        title: "1. Besoins fonctionnels",
        titleEn: "1. Functional requirements",
        items: [
          "RF01 — Présentation des plats.",
          "RF02 — Navigation fluide du menu.",
          "RF03 — Paiement / parcours e-commerce (Stripe).",
        ],
        itemsEn: [
          "FR01 — Dish presentation.",
          "FR02 — Smooth menu browsing.",
          "FR03 — Payment / e-commerce flow (Stripe).",
        ],
      },
      {
        title: "2. Contraintes techniques",
        titleEn: "2. Technical constraints",
        items: [
          "Next.js, React, TypeScript, Tailwind CSS.",
          "Node.js, Express, PostgreSQL, Prisma, Stripe, Vercel.",
        ],
        itemsEn: [
          "Next.js, React, TypeScript, Tailwind CSS.",
          "Node.js, Express, PostgreSQL, Prisma, Stripe, Vercel.",
        ],
      },
      {
        title: "3. Livrables",
        titleEn: "3. Deliverables",
        items: ["Menu digital en production.", "Parcours paiement Stripe."],
        itemsEn: ["Digital menu in production.", "Stripe payment flow."],
      },
    ],
  },
];

export function getProjectSpec(projectId: number) {
  return PROJECT_SPECS.find((s) => s.projectId === projectId) ?? null;
}
