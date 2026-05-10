export const translations = {
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      skills: "Compétences",
      projects: "Projets",
      education: "Formation",
      contact: "Contact",
    },
    hero: {
      greeting: "Bonjour, je suis",
      title: "Développeuse Fullstack Junior",
      subtitle:
        "Passionnée par l’informatique, le développement et le design -autonome, rigoureuse et créative, prête à m’investir pleinement dans vos projets.",
      cta: "Voir mes projets",
      contact: "Me contacter",
    },
    about: {
      title: "À propos de moi",
      description:
        "Passionnée par l’informatique, le développement et le design, je suis autonome, rigoureuse et créative. J’aime concevoir des applications web modernes, des API robustes et des interfaces soignées, en m’appuyant sur les bonnes pratiques (tests, clean code, agilité). Curieuse des évolutions tech, notamment autour de l’IA. Langues : français (natif), anglais (B1). Centres d’intérêt : sport, lecture, veille tech (notamment IA).",
      downloadCV: "Télécharger mon CV",
      location: "Mobilité : flexible",
    },
    skills: {
      title: "Mes compétences",
      frontend: "Front-end",
      backend: "Back-end",
      database: "Bases de données",
      tools: "Outils & DevOps",
      design: "Design & CMS",
      automation: "Qualité & IA assistée",
    },
    projects: {
      title: "Mes projets",
      viewProject: "Voir le projet",
      viewCode: "Voir le code",
      technologies: "Technologies",
      project1: {
        title: "MyBudget+",
        description: "Application budget avec tests et reporting qualité",
      },
      project2: {
        title: "Gestion d'événements",
        description: "Site fullstack de gestion d’événements (CRUD, MERN)",
      },
      project3: {
        title: "Player Finder",
        description:
          "App mobile pour mettre en relation des joueurs (React Native, Expo)",
      },
      project4: {
        title: "Afro-food",
        description:
          "Menu digital cuisine camerounaise et béninoise (Next.js, Vercel)",
      },
    },
    education: {
      title: "Parcours scolaire",
      subtitle: "Formations et diplômes",
    },
    contact: {
      title: "Contactez-moi",
      subtitle: "Un projet, une question ? Écrivons-nous !",
      name: "Nom",
      email: "Email",
      message: "Message",
      send: "Envoyer",
      sending: "Envoi en cours...",
      success: "Message envoyé avec succès !",
      error: "Erreur lors de l’envoi. Veuillez réessayer.",
      or: "Ou contactez-moi directement",
      phone: "Téléphone",
      portfolio: "Portfolio",
      mobility: "Mobilité",
    },
    footer: {
      rights: "Tous droits réservés.",
      madeWith: "Fait avec",
      using: "avec Next.js, TypeScript & Tailwind CSS",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      education: "Education",
      contact: "Contact",
    },
    hero: {
      greeting: "Hello, I'm",
      title: "Junior Fullstack Developer",
      subtitle:
        "Passionate about IT, development, and design — independent, rigorous, and creative, ready to fully invest in your projects.",
      cta: "View my projects",
      contact: "Contact me",
    },
    about: {
      title: "About Me",
      description:
        "Passionate about IT, development, and design, I am independent, rigorous, and creative. I enjoy building modern web apps, solid APIs, and polished UIs, with a focus on best practices (testing, clean code, agility). I stay curious about tech trends, especially AI. Languages: French (native), English (B1). Interests: sports, reading, tech watch (especially AI).",
      downloadCV: "Download my CV",
      location: "Location: flexible",
    },
    skills: {
      title: "My Skills",
      frontend: "Front-end",
      backend: "Back-end",
      database: "Databases",
      tools: "Tools & DevOps",
      design: "Design & CMS",
      automation: "Quality & AI-assisted",
    },
    projects: {
      title: "My Projects",
      viewProject: "View project",
      viewCode: "View code",
      technologies: "Technologies",
      project1: {
        title: "MyBudget+",
        description: "Budget app with tests and quality reporting",
      },
      project2: {
        title: "Event management",
        description: "Fullstack event site (CRUD, MERN)",
      },
      project3: {
        title: "Player Finder",
        description: "Mobile app connecting players (React Native, Expo)",
      },
      project4: {
        title: "Afro-food",
        description:
          "Digital menu for Cameroonian & Beninese cuisine (Next.js, Vercel)",
      },
    },
    education: {
      title: "Education",
      subtitle: "Academic background",
    },
    contact: {
      title: "Contact Me",
      subtitle: "Have a project or a question? Let’s talk!",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send",
      sending: "Sending...",
      success: "Message sent successfully!",
      error: "Error sending. Please try again.",
      or: "Or reach me directly",
      phone: "Phone",
      portfolio: "Portfolio",
      mobility: "Mobility",
    },
    footer: {
      rights: "All rights reserved.",
      madeWith: "Made with",
      using: "with Next.js, TypeScript & Tailwind CSS",
    },
  },
};

export type Language = keyof typeof translations;
export type TranslationKeys = typeof translations.fr;
