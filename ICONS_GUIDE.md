# 🎨 Guide des Bibliothèques d'Icônes

## ✅ **1. Lucide React (déjà installé et utilisé)**

```tsx
import { 
  Github, 
  Linkedin, 
  Mail, 
  React as ReactIcon,
  Server,
  Database2,
  Wrench,
  Paintbrush,
  Zap as Lightning,
  TrendingUp,
  Palette,
  Code2,
  Shield,
  Star,
  Award
} from 'lucide-react';

// Utilisation
<ReactIcon className="w-6 h-6 text-white" />
<Server className="w-6 h-6 text-white" />
<Database2 className="w-6 h-6 text-white" />
```

## ✅ **2. React Icons (nouvellement installé)**

```tsx
// Import de différentes collections
import { 
  FaGithub, 
  FaLinkedin, 
  FaReact, 
  FaNodeJs,
  FaDocker,
  FaAws,
  FaGoogle,
  FaApple,
  FaMicrosoft
} from 'react-icons/fa';

import { 
  SiNextdotjs, 
  SiTypescript, 
  SiMongodb, 
  SiPostgresql,
  SiTailwindcss,
  SiFigma,
  SiJest,
  SiGit
} from 'react-icons/si';

import { 
  MdEmail, 
  MdPhone, 
  MdLocationOn, 
  MdWork,
  MdSchool,
  MdCode,
  MdDesignServices
} from 'react-icons/md';

// Utilisation
<FaReact className="w-6 h-6 text-blue-500" />
<SiNextdotjs className="w-6 h-6 text-black" />
<MdEmail className="w-6 h-6 text-gray-600" />
```

## 🎯 **Collections disponibles dans React Icons :**

- **Font Awesome (fa)** : Icônes classiques
- **Simple Icons (si)** : Logos de technologies
- **Material Design (md)** : Style Google Material
- **Feather (fi)** : Style minimaliste
- **Heroicons (hi)** : Style moderne
- **Bootstrap (bs)** : Icônes Bootstrap

## 🚀 **Exemples d'utilisation dans votre portfolio :**

### Section Compétences
```tsx
// Frontend
<FaReact className="w-8 h-8 text-blue-500" />
<SiNextdotjs className="w-8 h-8 text-black" />
<SiTypescript className="w-8 h-8 text-blue-600" />

// Backend
<FaNodeJs className="w-8 h-8 text-green-600" />
<SiMongodb className="w-8 h-8 text-green-500" />
<SiPostgresql className="w-8 h-8 text-blue-700" />

// Outils
<FaDocker className="w-8 h-8 text-blue-500" />
<SiGit className="w-8 h-8 text-orange-500" />
<FaAws className="w-8 h-8 text-orange-600" />
```

### Section Contact
```tsx
<MdEmail className="w-6 h-6 text-gray-600" />
<MdPhone className="w-6 h-6 text-gray-600" />
<MdLocationOn className="w-6 h-6 text-gray-600" />
```

## 💡 **Avantages de chaque bibliothèque :**

### Lucide React
- ✅ Déjà installé
- ✅ Icônes cohérentes
- ✅ Légères et optimisées
- ✅ TypeScript natif

### React Icons
- ✅ Plus de 10,000 icônes
- ✅ Collections variées
- ✅ Logos de technologies
- ✅ Très populaire

## 🔧 **Installation d'autres bibliothèques :**

```bash
# Heroicons
npm install @heroicons/react

# Feather Icons
npm install react-feather

# Phosphor Icons
npm install phosphor-react
```
