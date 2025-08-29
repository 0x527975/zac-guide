import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ModernNavbar from '../components/ModernNavbar';
import { getZacData } from '../data/zacData';
import RuneDisplay from '../components/RuneDisplay';
import ItemsDisplay from '../components/ItemsDisplay';
import SpellDisplay from '../components/SpellDisplay';
import SummonerSpellsDisplay from '../components/SummonerSpellsDisplay';
import bgImage from '../assets/bg.jpg';
import { 
  ArrowLeftIcon, 
  UsersIcon, 
  BookOpenIcon,
  ShieldCheckIcon,
  BoltIcon,
  SparklesIcon,
  StarIcon,
  FireIcon,
  HeartIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export default function ModernZacGuide() {
  const navigate = useNavigate();
  const [zacData, setZacData] = useState(null);
  const [selectedLane, setSelectedLane] = useState(null);
  const [selectedMatchup, setSelectedMatchup] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getZacData();
        setZacData(data);
        // Set default lane
        const availableLanes = Object.keys(data).filter(lane => 
          data[lane].matchups && Object.keys(data[lane].matchups).length > 0
        );
        if (availableLanes.length > 0) {
          setSelectedLane(availableLanes[0]);
        }
      } catch (error) {
        console.error('Error fetching Zac data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const lanes = [
    { id: 'top', name: 'Top Lane', icon: ShieldCheckIcon, color: 'from-red-500 to-red-600' },
    { id: 'jungle', name: 'Jungle', icon: BoltIcon, color: 'from-green-500 to-green-600' },
    { id: 'mid', name: 'Mid Lane', icon: SparklesIcon, color: 'from-blue-500 to-blue-600' },
    { id: 'support', name: 'Support', icon: HeartIcon, color: 'from-purple-500 to-purple-600' },
    { id: 'bottom', name: 'Bottom', icon: FireIcon, color: 'from-yellow-500 to-yellow-600' }
  ];

  const getLaneData = (laneId) => {
    return zacData?.[laneId] || null;
  };

  const getMatchups = (laneId) => {
    const laneData = getLaneData(laneId);
    if (!laneData?.matchups) return [];
    
    let matchups = Object.entries(laneData.matchups).map(([id, matchup]) => ({
      id,
      name: matchup.championName,
      icon: matchup.championIcon,
      difficulty: matchup.difficulty || 'medium'
    }));
    
    // Apply search filter
    if (searchTerm) {
      matchups = matchups.filter(matchup => 
        matchup.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply difficulty filter
    if (difficultyFilter !== 'all') {
      matchups = matchups.filter(matchup => 
        matchup.difficulty === difficultyFilter
      );
    }
    
    return matchups;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return '🟢';
      case 'medium': return '🟡';
      case 'hard': return '🔴';
      default: return '⚪';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <ModernNavbar />
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-emerald-400 text-lg font-medium">Carregando dados do Zac...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <ModernNavbar />
      
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(16,185,129,0.05),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(20,184,166,0.05),transparent_50%)]" />
          
          {/* Zac Goo Effects - Main Blobs */}
          <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-emerald-400/15 to-teal-500/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-teal-400/15 to-cyan-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-40 left-1/4 w-28 h-28 bg-gradient-to-br from-emerald-300/15 to-teal-400/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
          
          {/* Floating Bubbles - Small */}
          <div className="absolute top-1/4 right-1/3 w-6 h-6 bg-emerald-400/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-1/3 left-1/3 w-4 h-4 bg-teal-400/25 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-2/3 right-1/4 w-8 h-8 bg-cyan-400/20 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }} />
          
          {/* Goo Drips - Falling Effect */}
          <div className="absolute top-0 left-1/6 w-3 h-16 bg-gradient-to-b from-emerald-400/30 to-transparent animate-pulse" style={{ animationDelay: '0.8s' }} />
          <div className="absolute top-0 right-1/4 w-2 h-12 bg-gradient-to-b from-teal-400/40 to-transparent animate-pulse" style={{ animationDelay: '1.2s' }} />
          <div className="absolute top-0 left-2/3 w-4 h-20 bg-gradient-to-b from-cyan-400/25 to-transparent animate-pulse" style={{ animationDelay: '1.8s' }} />
          
          {/* Floating Goo Particles */}
          <div className="absolute top-1/5 left-1/5 w-2 h-2 bg-emerald-300/50 rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
          <div className="absolute top-2/5 right-1/5 w-3 h-3 bg-teal-300/40 rounded-full animate-ping" style={{ animationDelay: '0.7s' }} />
          <div className="absolute top-3/5 left-3/5 w-2 h-2 bg-cyan-300/50 rounded-full animate-ping" style={{ animationDelay: '1.1s' }} />
          <div className="absolute top-4/5 right-2/5 w-4 h-4 bg-emerald-300/30 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
          
          {/* Goo Streams - Flowing Effect */}
          <div className="absolute top-0 left-1/3 w-1 h-screen bg-gradient-to-b from-emerald-400/20 via-teal-400/15 to-transparent animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-0 right-1/3 w-1 h-screen bg-gradient-to-b from-teal-400/20 via-cyan-400/15 to-transparent animate-pulse" style={{ animationDelay: '2.5s' }} />
        </div>
      </div>
      
      {/* Header */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Voltar
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/community')}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-semibold rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all duration-300"
            >
              <UsersIcon className="w-4 h-4" />
              Comunidade
            </motion.button>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Guia Zac
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Selecione uma lane e descubra as melhores estratégias para cada matchup
            </p>
          </motion.div>

          {/* Lane Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12"
          >
            {lanes.map((lane, index) => {
              const isActive = selectedLane === lane.id;
              const laneData = getLaneData(lane.id);
              const hasMatchups = laneData?.matchups && Object.keys(laneData.matchups).length > 0;
              
              return (
                <motion.button
                  key={lane.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedLane(lane.id)}
                  disabled={!hasMatchups}
                  className={`relative p-6 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-500/50 shadow-2xl shadow-emerald-500/20'
                      : hasMatchups
                        ? 'bg-white/5 backdrop-blur-sm border-white/20 hover:bg-white/10 hover:border-white/30'
                        : 'bg-white/5 backdrop-blur-sm border-white/10 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto ${
                    isActive 
                      ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-black' 
                      : `bg-gradient-to-br ${lane.color} text-white`
                  }`}>
                    <lane.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{lane.name}</h3>
                  {hasMatchups ? (
                    <p className="text-sm text-gray-400">
                      {Object.keys(laneData.matchups).length} matchups
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500">Em breve</p>
                  )}
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeLane"
                      className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl border border-emerald-500/30"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Matchups Section */}
      {selectedLane && (
        <section className="relative py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Matchups - {lanes.find(l => l.id === selectedLane)?.name}
              </h2>
              <p className="text-gray-300">
                Clique em um campeão para ver as estratégias detalhadas
              </p>
            </motion.div>

            {/* Champion Selection Grid - LoL Style */}
            <div className="relative">
              {/* Search and Filter Bar */}
              <div className="mb-8 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="relative flex-1 max-w-md">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar campeão..."
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-5 h-5 bg-emerald-400/60 rounded-full animate-pulse" />
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setDifficultyFilter('all')}
                      className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                        difficultyFilter === 'all' 
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                          : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                      }`}
                    >
                      Todos
                    </button>
                    <button 
                      onClick={() => setDifficultyFilter('easy')}
                      className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                        difficultyFilter === 'easy' 
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                          : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                      }`}
                    >
                      Fácil
                    </button>
                    <button 
                      onClick={() => setDifficultyFilter('medium')}
                      className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                        difficultyFilter === 'medium' 
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                          : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                      }`}
                    >
                      Médio
                    </button>
                    <button 
                      onClick={() => setDifficultyFilter('hard')}
                      className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                        difficultyFilter === 'hard' 
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                          : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                      }`}
                    >
                      Difícil
                    </button>
                  </div>
                </div>
              </div>

              {/* Results Counter */}
              <div className="mb-4 text-center">
                <p className="text-gray-400">
                  {getMatchups(selectedLane).length} campeão{getMatchups(selectedLane).length !== 1 ? 'es' : ''} encontrado{getMatchups(selectedLane).length !== 1 ? 's' : ''}
                  {searchTerm && ` para "${searchTerm}"`}
                  {difficultyFilter !== 'all' && ` (${difficultyFilter === 'easy' ? 'Fácil' : difficultyFilter === 'medium' ? 'Médio' : 'Difícil'})`}
                </p>
              </div>

              {/* Champions Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                {getMatchups(selectedLane).length > 0 ? getMatchups(selectedLane).map((matchup, index) => (
                  <motion.div
                    key={matchup.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -8,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedMatchup(matchup.id)}
                    className={`relative group cursor-pointer transition-all duration-300 ${
                      selectedMatchup === matchup.id
                        ? 'transform scale-110 -translate-y-2'
                        : ''
                    }`}
                  >
                    {/* Champion Card */}
                    <div className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                      selectedMatchup === matchup.id
                        ? 'border-emerald-400 shadow-2xl shadow-emerald-500/50'
                        : 'border-white/20 hover:border-emerald-400/50'
                    }`}>
                      {/* Champion Image */}
                      <div className="relative w-full aspect-square overflow-hidden">
                        <img 
                          src={matchup.icon} 
                          alt={matchup.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/128x128/374151/FFFFFF?text=?';
                          }}
                        />
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Difficulty Badge */}
                        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${
                          matchup.difficulty === 'easy' ? 'bg-green-500/90 text-white' :
                          matchup.difficulty === 'medium' ? 'bg-yellow-500/90 text-black' :
                          'bg-red-500/90 text-white'
                        }`}>
                          {matchup.difficulty === 'easy' ? '🟢' : 
                           matchup.difficulty === 'medium' ? '🟡' : '🔴'}
                        </div>
                      </div>
                      
                      {/* Champion Name */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent">
                        <h3 className="text-xs font-bold text-white text-center truncate">
                          {matchup.name}
                        </h3>
                      </div>
                      
                      {/* Selection Glow */}
                      {selectedMatchup === matchup.id && (
                        <motion.div
                          layoutId="selectedChampion"
                          className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-2xl"
                          initial={false}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </div>
                    
                    {/* Floating Particles */}
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-emerald-400/60 rounded-full animate-ping" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-teal-400/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute -bottom-1 left-1/2 w-2 h-2 bg-cyan-400/60 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                  </motion.div>
                )) : (
                  <div className="col-span-full text-center py-16">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <div className="w-12 h-12 bg-emerald-400/40 rounded-full animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Nenhum campeão encontrado
                    </h3>
                    <p className="text-gray-300 mb-6">
                      {searchTerm 
                        ? `Nenhum campeão encontrado para "${searchTerm}"`
                        : difficultyFilter !== 'all'
                        ? `Nenhum campeão ${difficultyFilter === 'easy' ? 'fácil' : difficultyFilter === 'medium' ? 'médio' : 'difícil'} encontrado`
                        : 'Nenhum campeão disponível para esta lane'
                      }
                    </p>
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => setSearchTerm('')}
                        className="px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200"
                      >
                        Limpar Busca
                      </button>
                      <button
                        onClick={() => setDifficultyFilter('all')}
                        className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30 hover:bg-emerald-500/30 transition-all duration-200"
                      >
                        Ver Todos
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Matchup Details - Professional LoL Style */}
      {selectedMatchup && selectedLane && (
        <section className="relative py-16 px-6 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            {/* Header with Close Button */}
            <div className="flex items-center justify-between mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center flex-1"
              >
                <h2 className="text-5xl font-bold text-white mb-4">
                  Estratégia vs {zacData[selectedLane].matchups[selectedMatchup].championName}
                </h2>
                <p className="text-gray-300 text-xl">
                  {lanes.find(l => l.id === selectedLane)?.name} • 
                  <span className={`ml-2 px-3 py-1 rounded-full text-sm font-bold ${
                    zacData[selectedLane].matchups[selectedMatchup].difficulty === 'easy' ? 'bg-green-500/90 text-white' :
                    zacData[selectedLane].matchups[selectedMatchup].difficulty === 'medium' ? 'bg-yellow-500/90 text-black' :
                    'bg-red-500/90 text-white'
                  }`}>
                    {zacData[selectedLane].matchups[selectedMatchup].difficulty === 'easy' ? '🟢 Fácil' : 
                     zacData[selectedLane].matchups[selectedMatchup].difficulty === 'medium' ? '🟡 Médio' : '🔴 Difícil'}
                  </span>
                </p>
              </motion.div>
              
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedMatchup(null)}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all duration-200"
              >
                <XMarkIcon className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            {/* Champion Info Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12 p-8 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-3xl border border-emerald-500/20"
            >
              <div className="flex items-center justify-center gap-8">
                <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-emerald-400/50 shadow-2xl">
                  <img 
                    src={zacData[selectedLane].matchups[selectedMatchup].championIcon} 
                    alt={zacData[selectedLane].matchups[selectedMatchup].championName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-white mb-4">
                    {zacData[selectedLane].matchups[selectedMatchup].championName}
                  </h3>
                  <p className="text-emerald-400 font-medium text-xl mb-4">
                    {lanes.find(l => l.id === selectedLane)?.name}
                  </p>
                  <p className="text-gray-300 text-lg max-w-2xl">
                    {zacData[selectedLane].matchups[selectedMatchup].description || 
                     'Estratégia detalhada para este matchup com Zac.'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Professional Build Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Runas e Spells */}
              <div className="space-y-8">
                {/* Runas */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/20 p-8"
                >
                  <h3 className="text-3xl font-bold text-white mb-6 text-center">
                    <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                      Runas Otimizadas
                    </span>
                  </h3>
                  <RuneDisplay runes={zacData[selectedLane].matchups[selectedMatchup].runes} />
                </motion.div>

                {/* Spells */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/20 p-8"
                >
                  <h3 className="text-3xl font-bold text-white mb-6 text-center">
                    <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                      Habilidades e Ordem
                    </span>
                  </h3>
                  <SpellDisplay 
                    spells={zacData[selectedLane].matchups[selectedMatchup].spells} 
                    skillOrder={zacData[selectedLane].matchups[selectedMatchup].skillOrder} 
                  />
                </motion.div>
              </div>

              {/* Right Column - Itens e Spells de Invocador */}
              <div className="space-y-8">
                {/* Itens */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/20 p-8"
                >
                  <h3 className="text-3xl font-bold text-white mb-6 text-center">
                    <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                      Build Recomendada
                    </span>
                  </h3>
                  <ItemsDisplay items={zacData[selectedLane].matchups[selectedMatchup].items} />
                </motion.div>

                {/* Spells de Invocador */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/20 p-8"
                >
                  <h3 className="text-3xl font-bold text-white mb-6 text-center">
                    <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                      Spells de Invocador
                    </span>
                  </h3>
                  <SummonerSpellsDisplay 
                    summonerSpells={zacData[selectedLane].matchups[selectedMatchup].summonerSpells} 
                  />
                </motion.div>
              </div>
            </div>

            {/* Additional Tips Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-3xl border border-emerald-500/20 p-8"
            >
              <h3 className="text-3xl font-bold text-white mb-6 text-center">
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Dicas de Gameplay
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm">💡</span>
                    </div>
                    <p className="text-gray-300">Use seu E para dodge das habilidades principais do inimigo</p>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm">💡</span>
                    </div>
                    <p className="text-gray-300">Stack Conqueror antes de usar R para máximo dano</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm">💡</span>
                    </div>
                    <p className="text-gray-300">Salve W para momentos críticos de teamfight</p>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm">💡</span>
                    </div>
                    <p className="text-gray-300">Use Q para slow e setup para seu time</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
