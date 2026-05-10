export const PERSONAL_INFO = {
  name: "Leslie OUINSOU",
  title: "Développeuse Fullstack Junior",
  email: "ouinsou15@gmail.com",
  phone: "+33 7 66 23 45 75",
  location: "Flexible",
  github: "https://github.com/leslieOuinsou",
  portfolio: "https://new-portfolio-eight-omega.vercel.app/",
  /** Non renseigné sur le CV — laisser vide pour masquer le lien dans l’interface */
  linkedin: "",
};

export const SKILLS = {
  frontend: [
    "HTML5",
    "CSS3",
    "JavaScript (ES6+)",
    "TypeScript",
    "React.js",
    "Next.js",
    "Angular",
    "Tailwind CSS",
    "Bootstrap",
  ],
  backend: [
    "Node.js",
    "Express",
    "PHP",
    "Laravel",
    "Symfony",
    "C#",
    "Python",
    "API REST",
    "GraphQL",
  ],
  database: ["PostgreSQL", "MongoDB", "MySQL", "Firebase", "SQL"],
  tools: [
    "Git",
    "GitHub",
    "Docker",
    "GitHub Actions",
    "AWS",
    "Agile",
    "Scrum",
    "Jest",
  ],
  design: ["Figma", "Canva", "visily.ai"],
  cms: ["WordPress", "ACF", "Elementor", "Twig"],
  automation: [
    "Tests unitaires",
    "TDD",
    "Clean Code",
    "Cursor",
    "Claude",
    "GitHub Copilot",
  ],
};

export const PROJECTS = [
  {
    id: 1,
    title: "MyBudget+",
    description:
      "Application web et mobile de gestion de budget avec dispositifs de tests et de reporting qualité.",
    descriptionEn:
      "Web and mobile budget app with testing and quality reporting.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
    technologies: [
      "React",
      "JavaScript",
      "Node.js",
      "MongoDB",
      "GitHub",
      "Vercel",
      "Render",
    ],
    liveUrl: "https://my-budjet-web.vercel.app/",
    githubUrl: "https://github.com/leslieOuinsou",
  },
  {
    id: 2,
    title: "Gestion d'événements",
    description:
      "Développement fullstack d’un site de gestion d’événements : création, modification et consultation des événements par les utilisateurs.",
    descriptionEn:
      "Fullstack event management site: create, edit and view events.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    technologies: ["MongoDB", "Express", "React", "Node.js"],
    liveUrl: "https://gestion-evenements-frontend.vercel.app/",
    githubUrl: "https://github.com/leslieOuinsou",
  },
  {
    id: 3,
    title: "Player Finder",
    description:
      "Application mobile de mise en relation entre joueurs : recherche de partenaires ou d’équipes, profils et interface adaptée au mobile. Projet orienté développement mobile et expérience utilisateur.",
    descriptionEn:
      "Mobile app to connect players: find partners or teams, profiles and a mobile-first UI. Focus on mobile development and UX.",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
    technologies: ["JavaScript", "React Native", "Expo", "Vercel"],
    liveUrl: "https://player-finder-ten.vercel.app/",
    githubUrl: "https://github.com/leslieOuinsou/Player-Finder",
  },
  {
    id: 4,
    title: "Afro-food",
    description:
      "Site vitrine et menu digital pour une cuisine camerounaise et béninoise : présentation des plats, navigation fluide et déploiement sur Vercel.",
    descriptionEn:
      "Showcase and digital menu for Cameroonian and Beninese cuisine: dishes, smooth browsing, deployed on Vercel.",
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&h=600&fit=crop",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    liveUrl: "https://afrofood.vercel.app/",
    githubUrl: "https://github.com/leslieOuinsou",
  },
];

export const EDUCATION = [
  {
    id: 1,
    degree: "Master 2 Architecture Web",
    school: "Institut Européen F2I, Vincennes",
    period: "En cours",
    description:
      "Spécialisation architecture web et développement d’applications modernes, après le Mastère 1 chef de projets web.",
    skills: ["Architecture web", "Fullstack", "Qualité", "Méthodes agiles"],
  },
  {
    id: 2,
    degree:
      "Mastère 1 Chef de Projets Web Développement — 3ème année",
    school: "Institut Européen F2I, Vincennes",
    period: "2024 / 2025",
    description:
      "Troisième année du parcours Chef de Projets Web Développement : pilotage de projets web, cadrage, gestion d’équipe, livrables, qualité et développement, en lien avec les besoins métiers.",
    skills: [
      "Chef de projet web",
      "Agile / Scrum",
      "Cadrage & specs",
      "Développement web",
    ],
  },
  {
    id: 3,
    degree: "Bachelor 3 Développement Web et Mobile",
    school: "Institut F2I, Vincennes",
    period: "2023 – 2024",
    description:
      "Formation orientée conception et développement d’applications web et mobiles, bonnes pratiques et travail en équipe.",
    skills: ["Web", "Mobile", "Gestion de projet", "Intégration"],
  },
];
