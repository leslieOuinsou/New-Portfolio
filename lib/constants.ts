export const PERSONAL_INFO = {
  name: "Leslie OUINSOU",
  title: "Développeuse Fullstack Junior",
  titleEn: "Junior Fullstack Developer",
  email: "ouinsou15@gmail.com",
  phone: "+33 7 66 23 45 75",
  location: "France",
  github: "https://github.com/leslieOuinsou",
  portfolio: "https://new-portfolio-eight-omega.vercel.app/",
  linkedin: "https://www.linkedin.com/in/ouinsou-leslie",
};

export const SKILLS = {
  frontend: [
    "HTML5",
    "CSS3",
    "JavaScript (ES6+)",
    "TypeScript",
    "React.js",
    "Next.js",
    "Vue.js",
    "Nuxt.js",
    "Tailwind CSS",
  ],
  backend: ["Node.js", "Express.js", "API REST"],
  database: ["PostgreSQL", "MySQL", "MongoDB"],
  tools: ["GitHub", "GitLab CI/CD", "Docker", "Jenkins", "Contabo"],
  design: ["Figma", "Canva", "visily.ai"],
  cms: [] as string[],
  automation: [
    "Tests unitaires",
    "TDD",
    "Clean Code",
    "Cypress",
    "Postman",
    "Insomnia",
  ],
  automationEn: [
    "Unit testing",
    "TDD",
    "Clean Code",
    "Cypress",
    "Postman",
    "Insomnia",
  ],
};

export const EXPERIENCE = [
  {
    id: 1,
    role: "Développeuse Full-Stack",
    roleEn: "Full-Stack Developer",
    company: "Beyond-The Sea",
    location: "La Teste-de-Buch",
    period: "2026",
    description:
      "Développement d’un dashboard de simulation Kites : composants d’interface pour la visualisation de données, adaptation responsive mobile/tablette, pipelines CI/CD, correction de bugs, maintenance et tests Cypress.",
    descriptionEn:
      "Built a Kites simulation dashboard: UI components for data visualization, responsive mobile/tablet layout, CI/CD pipelines, bug fixes, maintenance, and Cypress tests.",
    skills: ["Vue.js", "Nuxt.js", "Cypress", "Docker", "CI/CD"],
    skillsEn: ["Vue.js", "Nuxt.js", "Cypress", "Docker", "CI/CD"],
  },
  {
    id: 2,
    role: "Stage Développeuse Full-Stack",
    roleEn: "Full-Stack Developer Intern",
    company: "I2FTB",
    location: "Gouvieux, France",
    period: "03/2025 – 08/2025",
    description:
      "Analyse des besoins, rédaction de spécifications, développement et maintenance du portail client, résolution d’incidents (support N1) et collaboration en équipe avec gestion de versions.",
    descriptionEn:
      "Requirements analysis, functional/technical specs, client portal development and maintenance, incident resolution (L1 support), and collaborative versioned teamwork.",
    skills: ["TypeScript", "Vue.js", "Node.js", "GitHub", "NoSQL"],
    skillsEn: ["TypeScript", "Vue.js", "Node.js", "GitHub", "NoSQL"],
  },
];

export const PROJECTS = [
  {
    id: 1,
    title: "MyBudget+",
    titleEn: "MyBudget+",
    description:
      "Application web et mobile de gestion de budget avec PostgreSQL, Prisma, tests et reporting qualité.",
    descriptionEn:
      "Web and mobile budget app with PostgreSQL, Prisma, testing and quality reporting.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
    technologies: ["React", "JavaScript", "Node.js", "PostgreSQL", "Prisma", "Vercel", "Render"],
    liveUrl: "https://my-budjet-web.vercel.app/",
    githubUrl: "https://github.com/leslieOuinsou",
  },
  {
    id: 2,
    title: "Gestion d'événements",
    titleEn: "Event Management",
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
    titleEn: "Player Finder",
    description:
      "Application mobile de mise en relation entre joueurs : recherche de partenaires ou d’équipes, profils et interface adaptée au mobile. Projet orienté développement mobile et expérience utilisateur.",
    descriptionEn:
      "Mobile app to connect players: find partners or teams, profiles and a mobile-first UI. Focus on mobile development and UX.",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
    technologies: ["React Native", "Expo", "JavaScript"],
    liveUrl: "https://player-finder-ten.vercel.app/",
    githubUrl: "https://github.com/leslieOuinsou/Player-Finder",
  },
  {
    id: 4,
    title: "Afro-food",
    titleEn: "Afro-food",
    description:
      "Site vitrine et menu digital pour une cuisine camerounaise et béninoise : présentation des plats, navigation fluide et déploiement sur Vercel.",
    descriptionEn:
      "Showcase and digital menu for Cameroonian and Beninese cuisine: dishes, smooth browsing, deployed on Vercel.",
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&h=600&fit=crop",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    liveUrl: "https://afrofood.vercel.app/",
    githubUrl: "https://github.com/leslieOuinsou",
  },
  {
    id: 5,
    title: "Thé Tip Top",
    titleEn: "Thé Tip Top",
    description:
      "Plateforme de jeu concours pour la marque Thé Tip Top : participation, tickets, lots et suivi, avec déploiement et monitoring CI/CD.",
    descriptionEn:
      "Contest platform for the Thé Tip Top brand: entries, tickets, prizes and tracking, with CI/CD deployment and monitoring.",
    image: "/the-tip-top.jpg",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Prisma"],
    liveUrl: "https://dsp5-archi-o24a-4-5-g5.duckdns.org",
    workflowUrl: "https://wk-archi-o24a-4-5-g5.duckdns.org",
    githubUrl: "https://github.com/leslieOuinsou",
  },
];

export const EDUCATION = [
  {
    id: 1,
    degree: "Mastère 2 en Architecture Web",
    degreeEn: "Master's Year 2 — Web Architecture",
    school: "Institut Européen F2I, Vincennes",
    period: "11/2025 – 09/2026",
    description:
      "Spécialisation architecture web et développement d’applications modernes.",
    descriptionEn:
      "Specialization in web architecture and modern application development.",
    skills: ["Architecture web", "Fullstack", "Qualité", "Méthodes agiles"],
    skillsEn: ["Web architecture", "Fullstack", "Quality", "Agile methods"],
  },
  {
    id: 2,
    degree: "Bachelor 3 Développement Web et Mobile",
    degreeEn: "Bachelor Year 3 — Web & Mobile Development",
    school: "Institut F2I, Vincennes",
    period: "03/2024 – 09/2024",
    description:
      "Formation orientée conception et développement d’applications web et mobiles, bonnes pratiques et travail en équipe.",
    descriptionEn:
      "Training focused on designing and building web and mobile apps, best practices, and teamwork.",
    skills: ["Web", "Mobile", "Gestion de projet", "Intégration"],
    skillsEn: ["Web", "Mobile", "Project management", "Integration"],
  },
];
