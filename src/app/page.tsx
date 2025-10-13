'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download,
  ChevronDown,
  Code,
  Database,
  Globe,
  ArrowUp,
  Star,
  Zap,
  Palette,
  Menu,
  X,
  Heart,
  Sun,
  Moon
} from 'lucide-react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
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
      element.scrollIntoView({ behavior: 'smooth' });
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
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#0077FF] rounded-xl flex items-center justify-center">
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
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>

              <button 
                onClick={() => scrollToSection('contact')}
                className="px-4 xl:px-6 py-2 bg-[#0077FF] text-white rounded-full font-medium hover:bg-[#0056CC] transition-colors duration-300 text-sm xl:text-base"
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
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  {isDarkMode ? 'Mode clair' : 'Mode sombre'}
                </button>
              </div>
              
              <div className="pt-3 sm:pt-4 border-t border-white/10">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-[#0077FF] text-white rounded-full font-medium hover:bg-[#0056CC] transition-colors duration-300 text-sm sm:text-base"
                >
                  Contact
                </button>
              </div>
            </div>
          </motion.div>
        </nav>
      </header>

      {/* Hero Section - Exactement comme l'image */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-16 sm:pt-20">
        {/* Background pattern avec petits points gris */}
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
                  href="/Alternante Développeuse Informatique.pdf"
                  download="Alternante Développeuse Informatique.pdf"
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
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
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
                  <Github className={`w-5 h-5 sm:w-6 sm:h-6 ${
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
                  <Linkedin className={`w-5 h-5 sm:w-6 sm:h-6 ${
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
                  <Mail className={`w-5 h-5 sm:w-6 sm:h-6 ${
                    isDarkMode ? 'text-white' : 'text-gray-700'
                  }`} />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Section Droite - Avatar */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center lg:justify-end order-first lg:order-last mb-8 lg:mb-0"
            >
              <div className="relative">
                {/* Photo de profil avec effet de bordure */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                  {/* Bordure décorative avec gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0077FF] via-[#0056CC] to-[#0077FF] rounded-full p-1 sm:p-2" />
                  
                  {/* Conteneur de la photo */}
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-200">
                    {/* Remplacez le src par le chemin de votre photo */}
                    <Image
                      src="/Photo.jpeg" // Photo de Leslie OUINSOU
                      alt="Leslie OUINSOU - Développeuse Full Stack"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        // Fallback si l'image ne charge pas
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    
                    {/* Fallback avec emoji si pas de photo */}
                    <div className="hidden absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                      <div className="text-center">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-[#0077FF] to-[#0056CC] rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                          <span className="text-4xl sm:text-6xl">👩‍💻</span>
                        </div>
                        <div className="text-white font-semibold text-sm sm:text-lg">Votre Photo</div>
                      </div>
                    </div>
                  </div>
                  
                </div>
                
              </div>
            </motion.div>
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
      <section id="about" className={`py-16 sm:py-20 relative transition-colors duration-300 ${
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
              À propos de moi
            </motion.h2>
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "6%", opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
              className="w-12 sm:w-16 lg:w-20 h-1 bg-[#0077FF] mx-auto rounded-full"
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -80, rotateY: -15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 80 }}
              viewport={{ once: true }}
              className="space-y-4 sm:space-y-6 order-2 lg:order-1"
            >
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className={`text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Passionnée par l&apos;innovation et la créativité
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className={`text-base sm:text-lg leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Avec 3 ans d&apos;expérience dans le développement web, je combine expertise technique 
                et vision créative pour créer des solutions digitales exceptionnelles.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className={`text-base sm:text-lg leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Mon approche se base sur une compréhension approfondie des besoins utilisateurs et 
                une maîtrise des technologies les plus récentes pour livrer des projets d&apos;excellence.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4 sm:gap-6 pt-6 sm:pt-8"
              >
                <motion.div 
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className={`text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl border transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/10' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl font-bold text-[#0077FF] mb-2"
                  >
                    7+
                  </motion.div>
                  <div className={`text-sm sm:text-base ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Projets réalisés</div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className={`text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl border transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/10' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.9, type: "spring" }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl font-bold text-[#0077FF] mb-2"
                  >
                    3+
                  </motion.div>
                  <div className={`text-sm sm:text-base ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Années d&apos;expérience</div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80, rotateY: 15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 80 }}
              viewport={{ once: true }}
              className="relative order-1 lg:order-2"
            >
              <motion.div 
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-[#0077FF]/20 to-[#0077FF]/40 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#0077FF]/30"
              >
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  {[
                    { icon: <Zap className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-yellow-400 mx-auto mb-2 sm:mb-3" />, title: "Performance", desc: "Applications rapides et optimisées" },
                    { icon: <Palette className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-[#0077FF] mx-auto mb-2 sm:mb-3" />, title: "Design", desc: "Interfaces élégantes et intuitives" },
                    { icon: <Code className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-[#0077FF] mx-auto mb-2 sm:mb-3" />, title: "Code", desc: "Architecture propre et maintenable" },
                    { icon: <Star className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-[#0077FF] mx-auto mb-2 sm:mb-3" />, title: "Qualité", desc: "Tests et déploiement automatisés" }
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, scale: 0.5, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1, type: "spring" }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -3 }}
                      className={`text-center p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-colors duration-300 ${
                        isDarkMode ? 'bg-white/5' : 'bg-white/80'
                      }`}
                    >
                      {item.icon}
                      <h4 className={`font-semibold text-sm sm:text-base ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>{item.title}</h4>
                      <p className={`text-xs sm:text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
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
                icon: <Code className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-[#0077FF]" />,
                title: "Frontend",
                skills: [
                  { name: "React", level: 90 },
                  { name: "Angular", level: 95 },
                  { name: "Next.js", level: 88 },
                  { name: "TypeScript", level: 92 },
                  { name: "HTML/CSS", level: 95 },
                  { name: "Bulma", level: 80 }
                ]
              },
              {
                icon: <Database className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-green-500" />,
                title: "Backend",
                skills: [
                  { name: "Node.js", level: 88 },
                  { name: "Express", level: 85 },
                  { name: "MongoDB", level: 90 },
                  { name: "PostgreSQL", level: 82 },
                  { name: "REST API", level: 92 }
                ]
              },
              {
                icon: <Globe className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-[#0077FF]" />,
                title: "Outils & DevOps",
                skills: [
                  { name: "Git", level: 92 },
                  { name: "Docker", level: 80 },
                  { name: "AWS", level: 75 },
                  { name: "Vercel", level: 88 },
                  { name: "CI/CD", level: 82 }
                ]
              }
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50, scale: 0.8, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2, type: "spring", stiffness: 80 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5, rotateY: 2 }}
                className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/10 hover:border-[#0077FF]/50' 
                    : 'bg-white border-gray-200 hover:border-[#0077FF]/50 shadow-lg hover:shadow-xl'
                }`}
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1, type: "spring" }}
                  viewport={{ once: true }}
                  className="text-center mb-6 sm:mb-8"
                >
                  {category.icon}
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                    className={`text-xl sm:text-2xl font-bold mt-3 sm:mt-4 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {category.title}
                  </motion.h3>
                </motion.div>
                
                <div className="space-y-3 sm:space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div 
                      key={skill.name} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 + skillIndex * 0.05 }}
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{skill.name}</span>
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{skill.level}%</span>
                      </div>
                      <div className={`w-full rounded-full h-1.5 sm:h-2 ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                      }`}>
                        <motion.div 
                          className="h-1.5 sm:h-2 bg-[#0077FF] rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.5, delay: 0.8 + index * 0.1 + skillIndex * 0.1, type: "spring" }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </motion.div>
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
                title: "Pokemon",
                description: "Application web interactive de collection Pokemon avec interface moderne, recherche de créatures, affichage des statistiques et gestion de collection personnelle. Développée avec TypeScript pour la robustesse du code.",
                image: <Zap className="w-16 h-16 text-yellow-500" />,
                tech: ["TypeScript", "React", "Pokemon API"],
                link: "https://github.com/leslieOuinsou/Pokemon",
                github: "https://github.com/leslieOuinsou/Pokemon"
              },
              {
                title: "Afrofood",
                description: "Plateforme culinaire africaine moderne avec catalogue de recettes traditionnelles, système de recherche avancée, filtres par région et ingrédients. Interface utilisateur intuitive et design culturel authentique.",
                image: <Heart className="w-16 h-16 text-red-500" />,
                tech: ["JavaScript", "HTML5", "CSS3", "SQLite"],
                link: "",
                github: ""
              },
              {
                title: "Site Vitrine Angular",
                description: "Site vitrine professionnel responsive développé avec Angular et SCSS. Design moderne avec animations fluides, navigation intuitive et optimisation des performances. Parfait exemple de maîtrise du framework Angular.",
                image: <Globe className="w-16 h-16 text-blue-500" />,
                tech: ["Angular", "SCSS", "TypeScript"],
                link: "https://github.com/leslieOuinsou/site-vitrine-angular",
                github: "https://github.com/leslieOuinsou/site-vitrine-angular"
              },
              {
                title: "Gestion des Événements",
                description: "Application complète de gestion d'événements avec création, modification et suppression d'événements. Interface utilisateur intuitive, validation des données et gestion des dates. Solution pratique pour organisateurs d'événements.",
                image: <Star className="w-16 h-16 text-purple-500" />,
                tech: ["JavaScript", "HTML5", "CSS3"],
                link: "https://github.com/leslieOuinsou/gestion-des-evenements",
                github: "https://github.com/leslieOuinsou/gestion-des-evenements"
              },
              {
                title: "Portfolio",
                description: "Portfolio personnel moderne et responsive développé avec Next.js et TypeScript. Design élégant avec animations, sections interactives et optimisation SEO. Démonstration de compétences en développement frontend moderne.",
                image: <Code className="w-16 h-16 text-green-500" />,
                tech: ["TypeScript", "Next.js", "Tailwind CSS"],
                link: "https://github.com/leslieOuinsou/PORTFOLIO",
                github: "https://github.com/leslieOuinsou/PORTFOLIO"
              },
              {
                title: "Sudoku Game",
                description: "Jeu de Sudoku interactif avec génération automatique de grilles, validation en temps réel et niveaux de difficulté. Interface utilisateur claire, logique de jeu robuste et expérience de jeu fluide pour tous les niveaux.",
                image: <Palette className="w-16 h-16 text-indigo-500" />,
                tech: ["JavaScript", "HTML5", "CSS3"],
                link: "https://github.com/leslieOuinsou/Sudoku-game",
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
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex gap-2 sm:gap-3 justify-center"
                    >
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0077FF] text-white rounded-full text-xs sm:text-sm font-medium hover:shadow-lg transition-shadow"
                      >
                        Voir le projet
                      </motion.a>
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border transition-colors ${
                          isDarkMode 
                            ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' 
                            : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        Code source
                      </motion.a>
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
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#0077FF]" />
                  <span className={`text-sm sm:text-base ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>ouinsoul5@gmail.com</span>
                </div>
                <div className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-white border-gray-200'
                }`}>
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-[#0077FF]" />
                  <span className={`text-sm sm:text-base ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>+33 7 66 23 45 75</span>
                </div>
                <div className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-white border-gray-200'
                }`}>
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
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
                  className="p-3 sm:p-4 bg-[#0077FF] text-white rounded-xl sm:rounded-2xl hover:shadow-lg transition-shadow"
                >
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.a>
                <motion.a
                  href="https://github.com/leslieOuinsou"
          target="_blank"
          rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 sm:p-4 bg-[#0077FF] text-white rounded-xl sm:rounded-2xl hover:shadow-lg transition-shadow"
                >
                  <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 sm:p-4 bg-[#0077FF] text-white rounded-xl sm:rounded-2xl hover:shadow-lg transition-shadow"
                >
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
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
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl placeholder-gray-400 focus:ring-2 focus:ring-[#0077FF] focus:border-transparent transition-all text-sm sm:text-base ${
                      isDarkMode 
                        ? 'bg-white/5 border-white/20 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                    placeholder="Votre nom"
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
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl placeholder-gray-400 focus:ring-2 focus:ring-[#0077FF] focus:border-transparent transition-all text-sm sm:text-base ${
                      isDarkMode 
                        ? 'bg-white/5 border-white/20 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                    placeholder=""
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
                    rows={4}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl placeholder-gray-400 focus:ring-2 focus:ring-[#0077FF] focus:border-transparent transition-all resize-none text-sm sm:text-base ${
                      isDarkMode 
                        ? 'bg-white/5 border-white/20 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                    placeholder="Décrivez votre projet..."
                  ></textarea>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-[#0077FF] text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:shadow-lg transition-shadow"
                >
                  Envoyer le message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t py-12 sm:py-16 transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gray-900 border-white/10' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6"
          >
            <div className={`text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Leslie OUINSOU
            </div>
            <p className={`text-base sm:text-lg ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Développeuse Full Stack passionnée par l&apos;innovation
            </p>
            <div className={`flex justify-center items-center gap-2 text-sm sm:text-base ${
              isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>
              <span>Fait avec</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
              </motion.div>
              <span>et du code</span>
            </div>
            <p className={`text-xs sm:text-sm ${
              isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>
              © 2025 Leslie OUINSOU. Tous droits réservés.
            </p>
          </motion.div>
        </div>
      </footer>

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
            className="bg-[#0077FF] text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
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
                <div className="w-8 h-8 bg-[#0077FF] rounded-full flex items-center justify-center">
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
                    }`}>
                      {msg.timestamp.toLocaleTimeString('fr-FR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
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
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
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
          className="fixed bottom-4 sm:bottom-8 left-4 sm:left-8 bg-[#0077FF] text-white p-2.5 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-40"
        >
          <ArrowUp className="w-4 h-4 sm:w-6 sm:h-6" />
        </motion.button>
      )}
    </div>
  );
}
