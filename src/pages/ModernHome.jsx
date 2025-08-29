import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ModernNavbar from '../components/ModernNavbar';
import ModernAuthModal from '../components/ModernAuthModal';
import { 
  PlayIcon, 
  BookOpenIcon, 
  UsersIcon, 
  StarIcon,
  ShieldCheckIcon,
  BoltIcon,
  SparklesIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  FireIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { 
  PlayIcon as PlayIconSolid,
  StarIcon as StarIconSolid 
} from '@heroicons/react/24/solid';
import bgImage from '../assets/bg.jpg';

export default function ModernHome() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: ShieldCheckIcon,
      title: "Matchups Completos",
      description: "Estratégias detalhadas para cada campeão inimigo, com builds otimizadas e dicas de gameplay."
    },
    {
      icon: BoltIcon,
      title: "Builds Personalizadas",
      description: "Crie e compartilhe suas próprias builds com a comunidade de mono Zacs."
    },
    {
      icon: SparklesIcon,
      title: "Atualizações Constantes",
      description: "Sempre atualizado com as últimas mudanças do meta e patches do LoL."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Image */}
      <div className="fixed inset-0 pointer-events-none">
        <img 
          src={bgImage}
          alt="Zac Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/70 to-black/80" />
        
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(20,184,166,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.05),transparent_50%)]" />
          
          {/* Zac Goo Effects */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-teal-400/20 to-cyan-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-br from-emerald-300/20 to-teal-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
          
          {/* Floating Bubbles */}
          <div className="absolute top-1/4 right-1/3 w-4 h-4 bg-emerald-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-1/3 left-1/3 w-3 h-3 bg-teal-400/40 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-2/3 right-1/4 w-5 h-5 bg-cyan-400/30 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }} />
        </div>
      </div>

      {/* Navbar */}
      <ModernNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="relative mb-6">
              {/* Zac Goo Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-3xl animate-pulse" />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold relative z-10">
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Mono Zac
                </span>
                <br />
                <span className="text-white">Guide</span>
              </h1>
              
              {/* Floating Goo Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-emerald-400/40 rounded-full animate-bounce" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-teal-400/50 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
              <div className="absolute -bottom-2 left-1/4 w-4 h-4 bg-cyan-400/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
            </div>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              O guia definitivo para dominar Zac em todas as lanes. 
              <span className="text-emerald-400 font-semibold"> Matchups, builds e estratégias</span> para se tornar um verdadeiro mono Zac.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/guide')}
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold text-lg rounded-2xl hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25"
            >
              <PlayIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              Começar Guia
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>

            {user ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/community')}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <UsersIcon className="w-6 h-6" />
                Acessar Comunidade
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAuthModal(true)}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <UsersIcon className="w-6 h-6" />
                Entrar na Comunidade
              </motion.button>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              { label: "Matchups", value: "150+", icon: ShieldCheckIcon },
              { label: "Builds", value: "500+", icon: BookOpenIcon },
              { label: "Usuários", value: "1000+", icon: UsersIcon }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <stat.icon className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Por que escolher o{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Mono Zac Guide
              </span>
              ?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Desenvolvido por jogadores experientes, para jogadores que querem evoluir
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`p-8 rounded-2xl border transition-all duration-500 ${
                  currentFeature === index
                    ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-500/30 shadow-2xl shadow-emerald-500/20'
                    : 'bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${
                  currentFeature === index
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-black'
                    : 'bg-white/10 text-emerald-400'
                }`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="p-12 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-3xl border border-emerald-500/20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Pronto para dominar Zac?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Junte-se à comunidade de mono Zacs e eleve seu gameplay ao próximo nível
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => user ? navigate('/guide') : setShowAuthModal(true)}
              className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold text-xl rounded-2xl hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25"
            >
              {user ? 'Acessar Guia' : 'Começar Agora'}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">Z</span>
            </div>
            <span className="text-white font-semibold">Mono Zac Guide</span>
          </div>
          <p className="text-gray-400 mb-4">
            Desenvolvido com 💚 para a comunidade de Zac
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <span>© 2024 Mono Zac Guide</span>
            <span>•</span>
            <span>League of Legends</span>
            <span>•</span>
            <span>v2.0</span>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <ModernAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => setShowAuthModal(false)}
      />
    </div>
  );
}
