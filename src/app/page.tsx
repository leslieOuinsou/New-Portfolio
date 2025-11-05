'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Code,
  Database,
  Globe,
  Star,
  Menu,
  X,
  // Icônes pour les animations
  Award,
  Zap as Lightning,
  // Nouvelles icônes
  Phone,
  MapPin,
  Download,
  ChevronDown,
  ArrowUp,
  MessageCircle,
  Send,
  Heart,
  Sparkles,
  Target,
  Shield,
  Palette,
  Zap,
  Cpu,
  Layers,
  Workflow,
  FileText,
  Calendar,
  Gamepad2,
  ExternalLink,
  Sun,
  Moon
} from 'lucide-react';

// React Icons - Collections variées
import { 
  FaReact, 
  FaNodeJs, 
  FaDocker,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaDownload,
  FaHeart,
  FaExternalLinkAlt
} from 'react-icons/fa';

import { 
  SiFigma,
  SiPokemon,
  SiAngular,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiGitlab,
  SiJest,
  SiDocker,
  SiWordpress,
  SiDrupal,
  SiPrestashop,
  SiN8N
} from 'react-icons/si';

import { 
  MdCode,
  MdSecurity,
  MdSpeed,
  MdPalette,
  MdWork,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdDownload,
  MdFavorite,
  MdOpenInNew
} from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
// Composant Galaxy pour le background
import Galaxy from '../components/Galaxy';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  // const [isLoaded, setIsLoaded] = useState(false); // Non utilisé pour le moment

  // Optimisation du chargement
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoaded(true);
  //   }, 100);
  //   return () => clearTimeout(timer);
  // }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Bonjour ! Je suis l&apos;assistant de Leslie. Comment puis-je vous aider ?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    setIsVisible(true);
    // Récupérer le thème sauvegardé
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    // Sauvegarder le thème
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    // Appliquer le thème au body
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simuler une réponse du bot
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: botResponse,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const generateBotResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello')) {
      return 'Bonjour ! Ravi de vous rencontrer. Comment puis-je vous aider concernant le portfolio de Leslie ?';
    }
    
    if (lowerMessage.includes('compétences') || lowerMessage.includes('skills') || lowerMessage.includes('technologies')) {
      return 'Leslie maîtrise Angular, React, Next.js, TypeScript, Node.js, MongoDB, et bien d&apos;autres technologies. Voulez-vous en savoir plus sur une technologie spécifique ?';
    }
    
    if (lowerMessage.includes('projets') || lowerMessage.includes('portfolio') || lowerMessage.includes('travaux')) {
      return 'Leslie a réalisé de nombreux projets : e-commerce, gestion de tâches, applications web... Voulez-vous voir des exemples spécifiques ?';
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('téléphone')) {
      return 'Vous pouvez contacter Leslie via email : ouinsoul5@gmail.com ou téléphone : +33 7 66 23 45 75. Ou utilisez le formulaire de contact !';
    }
    
    if (lowerMessage.includes('expérience') || lowerMessage.includes('années') || lowerMessage.includes('carrière')) {
      return 'Leslie a plus de 5 ans d&apos;expérience dans le développement web. Elle a travaillé sur des projets variés et maîtrise le développement full-stack.';
    }
    
    if (lowerMessage.includes('cv') || lowerMessage.includes('résumé') || lowerMessage.includes('background')) {
      return 'Leslie est développeuse Full Stack passionnée par l&apos;innovation. Elle combine expertise technique et créativité pour créer des solutions exceptionnelles.';
    }
    
    return 'Merci pour votre message ! Je peux vous parler des compétences, projets, expérience ou contact de Leslie. Que souhaitez-vous savoir ?';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Hauteur du header fixe
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-black text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header/Navigation */}
      <header className={`fixed top-0 w-full backdrop-blur-md z-50 border-b transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-black/95 border-white/10' 
          : 'bg-white/95 border-gray-200'
      }`}>
        <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 sm:gap-3"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Code className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className={`text-lg sm:text-xl md:text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Leslie OUINSOU</span>
            </motion.div>

            {/* Navigation Desktop */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {[
                { id: 'home', label: 'Accueil' },
                { id: 'about', label: 'À propos' },
                { id: 'skills', label: 'Compétences' },
                { id: 'projects', label: 'Projets' },
                { id: 'contact', label: 'Contact' }
              ].map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`transition-colors duration-300 relative group text-sm xl:text-base ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0077FF] transition-all duration-300 group-hover:w-full"></span>
                </motion.button>
              ))}
            </div>

            {/* Boutons CTA Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Toggle Theme */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-full transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-white/10 text-white hover:bg-white/20' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </motion.button>

              <button 
                onClick={() => scrollToSection('contact')}
                className="btn-primary text-sm xl:text-base"
              >
                Contact
              </button>
            </div>

            {/* Bouton Menu Mobile */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'text-white hover:bg-white/10' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </motion.button>
          </div>

          {/* Menu Mobile */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isMenuOpen ? 1 : 0,
              height: isMenuOpen ? 'auto' : 0
            }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden"
          >
            <div className={`py-4 space-y-3 sm:space-y-4 border-t mt-3 sm:mt-4 transition-colors duration-300 ${
              isDarkMode ? 'border-white/10' : 'border-gray-200'
            }`}>
              {[
                { id: 'home', label: 'Accueil' },
                { id: 'about', label: 'À propos' },
                { id: 'skills', label: 'Compétences' },
                { id: 'projects', label: 'Projets' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left py-2 px-4 rounded-lg transition-colors text-base sm:text-lg ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-white/5' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Toggle Theme Mobile */}
              <div className="pt-3 sm:pt-4 border-t border-white/10">
                <button 
                  onClick={toggleTheme}
                  className={`w-full px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-colors duration-300 text-sm sm:text-base flex items-center justify-center gap-2 ${
                    isDarkMode 
                      ? 'bg-white/10 text-white hover:bg-white/20' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isDarkMode ? (
                    <Sun className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-gray-600" />
                  )}
                  {isDarkMode ? 'Mode clair' : 'Mode sombre'}
                </button>
              </div>
              
              <div className="pt-3 sm:pt-4 border-t border-white/10">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="btn-primary w-full text-sm sm:text-base"
                >
                  Contact
                </button>
              </div>
            </div>
          </motion.div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-16 sm:pt-20 overflow-hidden">
        {/* Animation Galaxy en arrière-plan */}
        <div className="absolute inset-0 z-0" style={{ width: '100%', height: '100%' }}>
          <Galaxy 
            mouseRepulsion={true}
            mouseInteraction={true}
            density={1.5}
            glowIntensity={0.5}
            saturation={0.8}
            hueShift={240}
            transparent={true}
          />
        </div>
        
        {/* Background pattern avec petits points gris */}
        <div className={`absolute inset-0 z-0 transition-opacity duration-300 ${
          isDarkMode ? 'opacity-20' : 'opacity-10'
        }`}>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${
              isDarkMode ? '#374151' : '#9CA3AF'
            } 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 z-10 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Section Gauche - Texte et CTA */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={`space-y-6 sm:space-y-8 text-center lg:text-left ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              {/* Titre principal */}
              <div className="space-y-3 sm:space-y-4">
                <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Développeuse
                </h1>
                <div className="inline-block">
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.4,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      rotate: [0, -2, 2, 0],
                      transition: { duration: 0.3 }
                    }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-[#0077FF] bg-clip-text text-transparent px-2 sm:px-4 py-1 sm:py-2 rounded-xl sm:rounded-2xl inline-block"
                  >
                    Full Stack
                  </motion.span>
                </div>
              </div>

              {/* Description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className={`text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto lg:mx-0 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Je conçois des applications web performantes et agiles, alliant rigueur, créativité et expérience terrain pour répondre aux défis numériques d&apos;aujourd&apos;hui.
              </motion.p>

              {/* Boutons CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2 sm:pt-4"
              >
                <motion.button 
                  onClick={() => scrollToSection('about')}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -3, 
                    boxShadow: "0 10px 25px rgba(0, 119, 255, 0.3)" 
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 sm:px-8 py-3 sm:py-4 font-semibold rounded-xl sm:rounded-2xl border-2 border-[#0077FF] transition-all duration-300 text-sm sm:text-base ${
                    isDarkMode 
                      ? 'bg-white text-black hover:bg-blue-50' 
                      : 'bg-white text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  À propos de moi
                </motion.button>
                                <motion.a
                  href="/Alternante Développeuse Web Full Stack – React  Node.js  TypeScript (1).pdf"
                  download="Alternante Développeuse Web Full Stack – React  Node.js  TypeScript (1).pdf"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -3, 
                    boxShadow: "0 10px 25px rgba(0, 119, 255, 0.3)" 
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 sm:px-8 py-3 sm:py-4 font-semibold rounded-xl sm:rounded-2xl border-2 border-[#0077FF] transition-all duration-300 flex items-center gap-2 justify-center text-sm sm:text-base ${
                    isDarkMode 
                      ? 'bg-white text-black hover:bg-blue-50' 
                      : 'bg-white text-gray-900 hover:bg-gray-50'
                }`}>
                  Télécharger mon CV
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  </motion.div>
                </motion.a>
              </motion.div>

              {/* Icônes sociales */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex gap-4 sm:gap-6 justify-center lg:justify-start pt-4 sm:pt-6"
              >
                <motion.a
                  href="https://github.com/leslieOuinsou"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-colors duration-300 border ${
                    isDarkMode 
                      ? 'bg-white/10 hover:bg-white/20 border-white/20' 
                      : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
                  }`}
                >
                  <FaGithub className={`w-5 h-5 sm:w-6 sm:h-6 ${
                    isDarkMode ? 'text-white' : 'text-gray-700'
                  }`} />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/leslie-ouinsou-b464822b8"
            target="_blank"
            rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-colors duration-300 border ${
                    isDarkMode 
                      ? 'bg-white/10 hover:bg-white/20 border-white/20' 
                      : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
                  }`}
                >
                  <FaLinkedin className={`w-5 h-5 sm:w-6 sm:h-6 ${
                    isDarkMode ? 'text-white' : 'text-gray-700'
                  }`} />
                </motion.a>
                <motion.a
                  href="mailto:ouinsoul5@gmail.com"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-colors duration-300 border ${
                    isDarkMode 
                      ? 'bg-white/10 hover:bg-white/20 border-white/20' 
                      : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
                  }`}
                >
                  <FaEnvelope className={`w-5 h-5 sm:w-6 sm:h-6 ${
                    isDarkMode ? 'text-white' : 'text-gray-700'
                  }`} />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Section Droite - Vide (photo retirée) */}
            <div className="hidden lg:block"></div>
          </div>
        </div>

        {/* Bouton scroll down */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-white/30 rounded-full flex items-center justify-center cursor-pointer hover:border-white/60 transition-colors"
            onClick={() => scrollToSection('about')}
          >
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-white/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* Section À propos */}
      <section id="about" className={`py-16 sm:py-20 relative transition-colors duration-300 overflow-hidden ${
        isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
      }`}>
        {/* Background pattern avec petits points gris */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: isDarkMode ? 0.15 : 0.08 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${
              isDarkMode ? '#374151' : '#9CA3AF'
            } 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }} />
        </motion.div>

        {/* Éléments décoratifs flottants */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          viewport={{ once: true }}
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.08, scale: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
          viewport={{ once: true }}
          className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-3xl"
        />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              À propos de moi
            </motion.h2>
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "6%", opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
              className="w-12 sm:w-16 lg:w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full shadow-lg"
            />
          </motion.div>

          {/* Contenu principal avec layout amélioré */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Section gauche - Texte */}
            <motion.div
              initial={{ opacity: 0, x: -80, rotateY: -15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 80 }}
              viewport={{ once: true }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Badge de présentation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0077FF]/30 bg-[#0077FF]/10"
              >
                <div className="w-2 h-2 bg-[#0077FF] rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-[#0077FF]">Développeur Full Stack</span>
              </motion.div>

              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Passionné par l&apos;
                <span className="bg-gradient-to-r from-[#0077FF] to-[#00D4FF] bg-clip-text text-transparent">
                  innovation
                </span>
                <br />
                et la créativité
              </motion.h3>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <p className={`text-lg leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Avec <span className="font-semibold text-[#0077FF]">3 ans d&apos;expérience</span> dans le développement web, 
                  je combine expertise technique et vision créative pour créer des solutions digitales exceptionnelles.
                </p>
                <p className={`text-lg leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                Mon approche se base sur une compréhension approfondie des besoins utilisateurs et 
                une maîtrise des technologies les plus récentes pour livrer des projets d&apos;excellence.
                </p>
              </motion.div>
              
              {/* Statistiques améliorées */}
              <motion.div 
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4 sm:gap-6 pt-4"
              >
                <motion.div 
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className={`text-center p-6 rounded-2xl border transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                      : 'bg-white border-gray-200 hover:shadow-lg'
                  }`}
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center gap-3 mb-3"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-3xl font-bold text-[#0077FF]">7+</span>
                  </motion.div>
                  <div className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Projets réalisés</div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className={`text-center p-6 rounded-2xl border transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                      : 'bg-white border-gray-200 hover:shadow-lg'
                  }`}
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7, type: "spring" }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center gap-3 mb-3"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-3xl font-bold text-[#0077FF]">3+</span>
                  </motion.div>
                  <div className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Années d&apos;expérience</div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Section droite - Carte des valeurs */}
            <motion.div
              initial={{ opacity: 0, x: 80, rotateY: 15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 80 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Carte des valeurs modernisée */}
              <motion.div 
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ duration: 0.3 }}
                className={`p-8 rounded-3xl border backdrop-blur-sm ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-white/10 to-white/5 border-white/20' 
                    : 'bg-gradient-to-br from-white/80 to-white/60 border-gray-200/50'
                }`}
              >
                <motion.h4
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className={`text-xl font-bold mb-6 text-center ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Mes Valeurs
                </motion.h4>
                
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { 
                      icon: (
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-3">
                          <Zap className="w-6 h-6 text-white" />
                        </div>
                      ), 
                      title: "Performance", 
                      desc: "Applications rapides et optimisées" 
                    },
                    { 
                      icon: (
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-3">
                          <Palette className="w-6 h-6 text-white" />
                        </div>
                      ), 
                      title: "Design", 
                      desc: "Interfaces modernes et intuitives" 
                    },
                    { 
                      icon: (
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-3">
                          <Code className="w-6 h-6 text-white" />
                        </div>
                      ), 
                      title: "Code", 
                      desc: "Architecture propre et maintenable" 
                    },
                    { 
                      icon: (
                        <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-3">
                          <Shield className="w-6 h-6 text-white" />
                        </div>
                      ), 
                      title: "Qualité", 
                      desc: "Tests et déploiement sécurisé" 
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -3 }}
                      className="text-center"
                    >
                      {item.icon}
                      <h4 className={`text-base font-semibold mb-2 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>{item.title}</h4>
                      <p className={`text-sm leading-relaxed ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Section Compétences */}
      <section id="skills" className={`py-16 sm:py-20 relative transition-colors duration-300 ${
        isDarkMode ? 'bg-black' : 'bg-gray-100'
      }`}>
        {/* Background pattern avec petits points gris */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: isDarkMode ? 0.2 : 0.1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${
              isDarkMode ? '#374151' : '#9CA3AF'
            } 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }} />
        </motion.div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Mes compétences
            </motion.h2>
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "6%", opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
              className="w-12 sm:w-16 lg:w-20 h-1 bg-[#0077FF] mx-auto rounded-full"
            />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: (
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <FaReact className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                ),
                title: "Front-end",
                skills: ["React", "Next.js", "Angular", "Vue.js", "JavaScript ES6+", "TypeScript", "HTML5", "CSS3", "TailwindCSS", "Bootstrap"]
              },
              {
                icon: (
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <FaNodeJs className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                ),
                title: "Back-end",
                skills: ["Node.js", "Express", "PHP", "Symfony", "Java", "Spring Boot"]
              },
              {
                icon: (
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Database className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                ),
                title: "Base de données",
                skills: ["PostgreSQL", "MongoDB"]
              },
              {
                icon: (
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <FaDocker className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                ),
                title: "Outils & DevOps",
                skills: ["Git", "GitHub", "GitLab", "Docker", "CI/CD", "Jest", "Vitest", "Postman", "API REST", "Agile/Scrum", "Jira"]
              },
              {
                icon: (
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                    <SiFigma className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                ),
                title: "Design & CMS",
                skills: ["Figma", "Photoshop", "Illustrator", "WordPress", "Drupal", "Prestashop"]
              },
              {
                icon: (
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Lightning className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                ),
                title: "Automatisation",
                skills: ["n8n"]
              }
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.05, type: "spring", stiffness: 100 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: 1.02, y: -3 }}
                className={`p-6 rounded-2xl transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border border-gray-700/50 hover:border-gray-600/50' 
                    : 'bg-white border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl'
                }`}
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1, type: "spring" }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 mb-6"
                >
                  {category.icon}
                  <h3 className={`text-xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {category.title}
                  </h3>
                </motion.div>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: 0.2 + index * 0.05 + skillIndex * 0.02 }}
                      viewport={{ once: true, margin: "-20px" }}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                        isDarkMode 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Projets */}
      <section id="projects" className={`py-16 sm:py-20 relative transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Background pattern avec petits points gris */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: isDarkMode ? 0.2 : 0.1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${
              isDarkMode ? '#374151' : '#9CA3AF'
            } 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }} />
        </motion.div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Mes projets
            </motion.h2>
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "6%", opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
              className="w-16 sm:w-20 lg:w-24 h-1 bg-[#0077FF] mx-auto rounded-full"
            />
          </motion.div>

          <Swiper
            modules={[Pagination, Autoplay]}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            className="mySwiper"
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
          >
            {[
              {
                title: "Sailingloc",
                description: "Plateforme web de location de bateaux avec système de réservation en temps réel, gestion des disponibilités, recherche avancée par type de bateau et localisation. Interface intuitive pour les propriétaires et locataires avec système de paiement sécurisé.",
                image: (
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/50 to-cyan-600/50"></div>
                    <Globe className="w-8 h-8 text-white relative z-10" />
                  </div>
                ),
                tech: ["React", "Node.js", "MongoDB", "TypeScript", "Tailwind CSS"],
                link: "https://dsp-dev-o24a-g4.fr/home",
                github: "https://github.com/Yass8/DEVO23-G4-SAILINGLOC"
              },
              {
                title: "Mybudget+",
                description: "Application web de gestion budgétaire personnelle avec suivi des dépenses en temps réel, catégorisation automatique, graphiques interactifs et rapports détaillés. Interface moderne et intuitive pour un contrôle total de vos finances.",
                image: (
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                ),
                tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
                link: "https://mybudget-black.vercel.app/",
                github: "https://github.com/leslieOuinsou/MyBudjet-"
              },
              {
                title: "Pokemon",
                description: "Application web interactive de collection Pokemon avec interface moderne, recherche de créatures, affichage des statistiques et gestion de collection personnelle. Développée avec TypeScript pour la robustesse du code.",
                image: (
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <SiPokemon className="w-8 h-8 text-white" />
                  </div>
                ),
                tech: ["TypeScript", "React", "Pokemon API"],
                link: "",
                github: "https://github.com/leslieOuinsou/Pokemon"
              },
              {
                title: "Afrofood",
                description: "Plateforme culinaire africaine moderne avec catalogue de recettes traditionnelles, système de recherche avancée, filtres par région et ingrédients. Interface utilisateur intuitive et design culturel authentique.",
                image: (
                  <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                ),
                tech: ["JavaScript", "HTML5", "CSS3", "SQLite"],
                link: "",
                github: ""
              },
              {
                title: "Site Vitrine Angular",
                description: "Site vitrine professionnel responsive développé avec Angular et SCSS. Design moderne avec animations fluides, navigation intuitive et optimisation des performances. Parfait exemple de maîtrise du framework Angular.",
                image: <SiAngular className="w-16 h-16 text-blue-500" />,
                tech: ["Angular", "SCSS", "TypeScript"],
                link: "",
                github: "https://github.com/leslieOuinsou/site-vitrine-angular"
              },
              {
                title: "Gestion des Événements",
                description: "Application complète de gestion d'événements avec création, modification et suppression d'événements. Interface utilisateur intuitive, validation des données et gestion des dates. Solution pratique pour organisateurs d'événements.",
                image: (
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                ),
                tech: ["JavaScript", "HTML5", "CSS3"],
                link: "",
                github: "https://github.com/leslieOuinsou/gestion-des-evenements"
              },
              {
                title: "Portfolio",
                description: "Portfolio personnel moderne et responsive développé avec Next.js et TypeScript. Design élégant avec animations, sections interactives et optimisation SEO. Démonstration de compétences en développement frontend moderne.",
                image: <SiNextdotjs className="w-16 h-16 text-green-500" />,
                tech: ["TypeScript", "Next.js", "Tailwind CSS"],
                link: "https://new-portfolio-eight-omega.vercel.app/",
                github: "https://github.com/leslieOuinsou/PORTFOLIO"
              },
              {
                title: "Sudoku Game",
                description: "Jeu de Sudoku interactif avec génération automatique de grilles, validation en temps réel et niveaux de difficulté. Interface utilisateur claire, logique de jeu robuste et expérience de jeu fluide pour tous les niveaux.",
                image: (
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Gamepad2 className="w-8 h-8 text-white" />
                  </div>
                ),
                tech: ["JavaScript", "HTML5", "CSS3"],
                link: "",
                github: "https://github.com/leslieOuinsou/Sudoku-game"
              }
            ].map((project, index) => (
              <SwiperSlide key={project.title}>
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.8, rotateY: -10 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1, type: "spring", stiffness: 80 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -15, scale: 1.02, rotateY: 2 }}
                  className={`w-full max-w-sm sm:max-w-md lg:max-w-lg border rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 group cursor-pointer ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/10 hover:border-[#0077FF]/50' 
                      : 'bg-white border-gray-200 hover:border-[#0077FF]/50 shadow-lg hover:shadow-xl'
                  }`}
                >
                  <div className="p-4 sm:p-6">
                    <motion.div 
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.1, type: "spring" }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="text-4xl sm:text-5xl mb-3 sm:mb-4 text-center"
                    >
                      {project.image}
                    </motion.div>
                    <motion.h3 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                      className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-center ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                      className={`mb-3 sm:mb-4 text-center leading-relaxed text-sm sm:text-base ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {project.description}
                    </motion.p>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4 justify-center"
                    >
                      {project.tech.map((tech, techIndex) => (
                        <motion.span 
                          key={tech} 
                          initial={{ opacity: 0, scale: 0.5 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.6 + index * 0.1 + techIndex * 0.05, type: "spring" }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="px-2 sm:px-3 py-1 bg-[#0077FF]/20 text-[#0077FF] text-xs sm:text-sm rounded-full border border-[#0077FF]/30"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>
                    
                    {/* Badge "Hébergé" pour les projets avec un lien */}
                    {project.link && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex justify-center mb-2"
                      >
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 text-xs font-medium rounded-full border border-green-500/30">
                          <Globe className="w-3 h-3" />
                          Hébergé
                        </span>
                      </motion.div>
                    )}
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex gap-2 sm:gap-3 justify-center flex-wrap"
                    >
                      {/* Bouton "Voir le site" uniquement pour les projets hébergés */}
                      {project.link && (
                      <motion.a
                          href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                          className="btn-primary text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1.5"
                      >
                          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                          Voir le site
                      </motion.a>
                      )}
                      {/* Bouton "Code source" si le projet a un lien GitHub */}
                      {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border transition-colors flex items-center gap-1.5 ${
                          isDarkMode 
                            ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' 
                            : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                        }`}
                      >
                          <FaGithub className="w-3 h-3 sm:w-4 sm:h-4" />
                        Code source
                      </motion.a>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
            <div className="swiper-pagination"></div>
          </Swiper>
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" className={`py-16 sm:py-20 relative transition-colors duration-300 ${
        isDarkMode ? 'bg-black' : 'bg-gray-100'
      }`}>
        <div className={`absolute inset-0 transition-opacity duration-300 ${
          isDarkMode ? 'opacity-20' : 'opacity-10'
        }`}>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${
              isDarkMode ? '#374151' : '#9CA3AF'
            } 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }} />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Contactez-moi
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-[#0077FF] mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 sm:space-y-8 order-2 lg:order-1"
            >
              <div className="space-y-4 sm:space-y-6">
                <h3 className={`text-2xl sm:text-3xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Prête à collaborer ?
                </h3>
                <p className={`text-base sm:text-lg leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Si vous avez un projet en tête ou souhaitez simplement échanger, 
                  n&apos;hésitez pas à me contacter. Je suis toujours ouverte aux nouvelles opportunités !
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-white border-gray-200'
                }`}>
                  <FaEnvelope className="w-5 h-5 sm:w-6 sm:h-6 text-[#0077FF]" />
                  <span className={`text-sm sm:text-base ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>ouinsoul5@gmail.com</span>
                </div>
                <div className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-white border-gray-200'
                }`}>
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#0077FF]" />
                  <span className={`text-sm sm:text-base ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>+33 7 66 23 45 75</span>
                </div>
                <div className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-white border-gray-200'
                }`}>
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#0077FF]" />
                  <span className={`text-sm sm:text-base ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>Paris, France</span>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4 pt-4 sm:pt-6">
                <motion.a
                  href="https://www.linkedin.com/in/leslie-ouinsou-b464822b8"
          target="_blank"
          rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 sm:p-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl sm:rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </motion.a>
                <motion.a
                  href="https://github.com/leslieOuinsou"
          target="_blank"
          rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 sm:p-4 bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-xl sm:rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <FaGithub className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 sm:p-4 bg-gradient-to-br from-red-500 to-red-700 text-white rounded-xl sm:rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <FaEnvelope className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl border backdrop-blur-sm order-1 lg:order-2 transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-white border-gray-200 shadow-lg'
              }`}
            >
              <form className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl placeholder-gray-400 focus:ring-2 focus:ring-[#0077FF] focus:border-transparent transition-all text-sm sm:text-base ${
                      isDarkMode 
                        ? 'bg-white/5 border-white/20 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                    placeholder="Votre nom"
                    suppressHydrationWarning
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl placeholder-gray-400 focus:ring-2 focus:ring-[#0077FF] focus:border-transparent transition-all text-sm sm:text-base ${
                      isDarkMode 
                        ? 'bg-white/5 border-white/20 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                    placeholder="votre@email.com"
                    suppressHydrationWarning
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl placeholder-gray-400 focus:ring-2 focus:ring-[#0077FF] focus:border-transparent transition-all resize-none text-sm sm:text-base ${
                      isDarkMode 
                        ? 'bg-white/5 border-white/20 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                    placeholder="Décrivez votre projet..."
                    suppressHydrationWarning
                  ></textarea>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="btn-primary w-full text-base sm:text-lg py-3 sm:py-4"
                >
                  Envoyer le message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chatbot Widget Interactif */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50"
      >
        {/* Bouton de chat flottant */}
        {!isChatOpen && (
          <motion.button
            onClick={toggleChat}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-gradient-to-br from-green-500 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </motion.button>
        )}

        {/* Interface du chat */}
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`w-96 sm:w-[28rem] h-96 sm:h-[28rem] rounded-2xl shadow-2xl border transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-gray-900 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}
          >
            {/* Header du chat */}
            <div className={`flex items-center justify-between p-4 border-b transition-colors duration-300 ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">L</span>
                </div>
                <div>
                  <h3 className={`font-semibold text-sm ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>Assistant Leslie</h3>
                  <p className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>En ligne</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className={`p-2 rounded-full transition-colors duration-300 ${
                  isDarkMode 
                    ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Zone des messages */}
            <div className="flex-1 p-4 space-y-4 h-64 sm:h-80 overflow-y-auto">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs sm:max-w-sm px-4 py-2 rounded-2xl ${
                      msg.type === 'user'
                        ? 'bg-[#0077FF] text-white'
                        : isDarkMode
                        ? 'bg-gray-800 text-gray-100'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-1 ${
                      msg.type === 'user' ? 'text-blue-100' : isDarkMode ? 'text-gray-500' : 'text-gray-500'
                    }`} suppressHydrationWarning>
                      {typeof window !== 'undefined' ? msg.timestamp.toLocaleTimeString('fr-FR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      }) : '--:--'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Zone de saisie */}
            <div className={`p-4 border-t transition-colors duration-300 ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tapez votre message..."
                  className={`flex-1 px-3 py-2 rounded-xl text-sm transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  } border focus:outline-none focus:ring-2 focus:ring-[#0077FF] focus:border-transparent`}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim()}
                  className={`p-2 rounded-xl transition-all duration-300 ${
                    inputMessage.trim()
                      ? 'bg-[#0077FF] text-white hover:bg-[#0056CC]'
                      : isDarkMode
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Scroll to top button */}
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={scrollToTop}
          className="fixed bottom-4 sm:bottom-8 left-4 sm:left-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white p-2.5 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-40 hover:scale-110"
        >
          <ArrowUp className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
        </motion.button>
      )}
    </div>
  );
}
