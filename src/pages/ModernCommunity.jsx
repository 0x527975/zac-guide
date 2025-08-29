import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ModernNavbar from '../components/ModernNavbar';
import CreateBuildModal from '../components/CreateBuildModal';
import bgImage from '../assets/bg.jpg';
import { 
  PlusIcon, 
  HeartIcon, 
  TrashIcon, 
  FireIcon,
  StarIcon,
  ClockIcon,
  UserIcon,
  EyeIcon,
  FunnelIcon,
  ChatBubbleLeftIcon,
  XMarkIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { buildsAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function ModernCommunity() {
  const navigate = useNavigate();
  const { user, login, register } = useAuth();
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLane, setSelectedLane] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [likedBuilds, setLikedBuilds] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBuild, setSelectedBuild] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  // Auth form states
  const [authForm, setAuthForm] = useState({
    username: '',
    email: '',
    password: '',
    secretCode: ''
  });

  useEffect(() => {
    fetchBuilds();
  }, []);

  const fetchBuilds = async () => {
    try {
      setLoading(true);
      const response = await buildsAPI.getAll();
      setBuilds(response.data);
      
      if (user) {
        try {
          const likedResponse = await buildsAPI.getLikedBuilds();
          const likedIds = new Set(likedResponse.data.map(build => build._id));
          setLikedBuilds(likedIds);
        } catch (error) {
          console.log('User not logged in, skipping liked builds fetch');
        }
      }
    } catch (error) {
      console.error('Error fetching builds:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (buildId) => {
    if (!user) {
      setShowAuthModal(true);
      setIsLogin(false);
      return;
    }

    try {
      if (likedBuilds.has(buildId)) {
        await buildsAPI.unlikeBuild(buildId);
        setLikedBuilds(prev => {
          const newSet = new Set(prev);
          newSet.delete(buildId);
          return newSet;
        });
      } else {
        await buildsAPI.likeBuild(buildId);
        setLikedBuilds(prev => new Set(prev).add(buildId));
      }
      
      setBuilds(prev => prev.map(build => {
        if (build._id === buildId) {
          return {
            ...build,
            likes: likedBuilds.has(buildId) ? build.likes - 1 : build.likes + 1
          };
        }
        return build;
      }));
    } catch (error) {
      console.error('Error liking/unliking build:', error);
    }
  };

  const handleDelete = async (buildId) => {
    if (!user) return;
    
    if (window.confirm('Tem certeza que deseja deletar esta build? Esta ação não pode ser desfeita.')) {
      try {
        await buildsAPI.delete(buildId);
        setBuilds(prev => prev.filter(build => build._id !== buildId));
        
        // Se a build deletada estava selecionada, fechar o modal
        if (selectedBuild && selectedBuild._id === buildId) {
          setSelectedBuild(null);
        }
        
        alert('Build deletada com sucesso! 🗑️');
      } catch (error) {
        console.error('Error deleting build:', error);
        if (error.response?.status === 403) {
          alert('Você não tem permissão para deletar esta build.');
        } else if (error.response?.status === 404) {
          alert('Build não encontrada.');
        } else {
          alert('Erro ao deletar build. Tente novamente.');
        }
      }
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isLogin) {
        await login(authForm.email, authForm.password);
      } else {
        await register(authForm.username, authForm.email, authForm.password, authForm.secretCode);
      }
      
      setShowAuthModal(false);
      setAuthForm({ username: '', email: '', password: '', secretCode: '' });
      fetchBuilds();
    } catch (error) {
      alert(error.message || 'Erro na autenticação');
    }
  };

  const handleCreateBuild = async (buildData) => {
    if (!user) {
      setShowAuthModal(true);
      setIsLogin(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/builds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(buildData)
      });
      
      if (response.ok) {
        const newBuild = await response.json();
        setBuilds(prev => [newBuild, ...prev]);
        alert('Build criada com sucesso! 🎉');
      } else {
        const error = await response.json();
        alert(`Erro ao criar build: ${error.message}`);
      }
    } catch (error) {
      console.error('Error creating build:', error);
      alert('Erro ao criar build. Tente novamente.');
    }
  };

  const handleAddComment = async (buildId) => {
    if (!newComment.trim()) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/builds/${buildId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ content: newComment })
      });
      
      if (response.ok) {
        const comment = await response.json();
        setBuilds(prev => prev.map(build => {
          if (build._id === buildId) {
            return {
              ...build,
              comments: [...(build.comments || []), comment]
            };
          }
          return build;
        }));
        setNewComment('');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const filteredBuilds = builds.filter(build => {
    const laneMatch = selectedLane === 'all' || build.lane === selectedLane;
    const searchMatch = searchQuery === '' || 
      build.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      build.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      build.matchup.toLowerCase().includes(searchQuery.toLowerCase());
    
    return laneMatch && searchMatch;
  });

  const lanes = [
    { id: 'all', name: 'Todas as Lanes', color: 'from-gray-500 to-gray-600' },
    { id: 'top', name: 'Top', color: 'from-red-500 to-red-600' },
    { id: 'jungle', name: 'Jungle', color: 'from-green-500 to-green-600' },
    { id: 'mid', name: 'Mid', color: 'from-blue-500 to-blue-600' },
    { id: 'support', name: 'Support', color: 'from-purple-500 to-violet-500' },
    { id: 'bottom', name: 'Bottom', color: 'from-yellow-500 to-yellow-600' }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Agora mesmo';
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    if (diffInHours < 48) return 'Ontem';
    return date.toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <ModernNavbar />
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-emerald-400 text-lg font-medium">Carregando comunidade...</p>
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
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/70 to-black/80" />
      </div>
      
      {/* Header */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              ← Voltar
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-semibold rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
            >
              <PlusIcon className="w-5 h-5" />
              Nova Build
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
                Comunidade
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Compartilhe suas builds e descubra estratégias de outros mono Zacs
            </p>
            {!user && (
              <div className="mt-4 p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30 inline-block">
                <p className="text-emerald-400 text-sm">
                  🔐 Faça login para curtir, comentar e criar builds
                </p>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="mt-2 px-4 py-2 bg-emerald-500 text-black rounded-lg hover:bg-emerald-400 transition-all duration-300"
                >
                  Entrar / Cadastrar
                </button>
              </div>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            {[
              { label: 'Total de Builds', value: builds.length, icon: FireIcon, color: 'from-orange-500 to-red-500' },
              { label: 'Builds Curtidas', value: builds.reduce((sum, build) => sum + (build.likes?.length || 0), 0), icon: HeartIcon, color: 'from-pink-500 to-rose-500' },
              { label: 'Comentários', value: builds.reduce((sum, build) => sum + (build.comments?.length || 0), 0), icon: ChatBubbleLeftIcon, color: 'from-blue-500 to-indigo-500' },
              { label: 'Membros', value: '100+', icon: UserIcon, color: 'from-purple-500 to-violet-500' }
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="relative py-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col lg:flex-row items-center gap-6 mb-8"
          >
            {/* Search */}
            <div className="flex-1 w-full lg:w-auto">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar builds, matchups, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/20 focus:border-emerald-500 focus:outline-none placeholder-gray-400"
                />
              </div>
            </div>
            
            {/* Lane Filter */}
            <div className="flex items-center gap-4">
              <FunnelIcon className="w-6 h-6 text-gray-400" />
              <span className="text-gray-300 font-medium">Lane:</span>
              
              <div className="flex flex-wrap gap-2">
                {lanes.map((lane) => (
                  <motion.button
                    key={lane.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedLane(lane.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedLane === lane.id
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black shadow-lg'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    {lane.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Builds Grid */}
      <section className="relative py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {filteredBuilds.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FireIcon className="w-12 h-12 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Nenhuma build encontrada
              </h3>
              <p className="text-gray-300 mb-8">
                {searchQuery ? `Nenhuma build encontrada para "${searchQuery}"` :
                 selectedLane === 'all' 
                  ? 'Seja o primeiro a compartilhar uma build!' 
                  : `Nenhuma build para ${lanes.find(l => l.id === selectedLane)?.name} ainda.`
                }
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateModal(true)}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-semibold rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all duration-300"
              >
                Criar Primeira Build
              </motion.button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBuilds.map((build, index) => (
                <motion.div
                  key={build._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                  onClick={() => setSelectedBuild(build)}
                >
                  {/* Build Header */}
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                          <span className="text-black font-bold text-sm">
                            {build.author?.username?.charAt(0).toUpperCase() || '?'}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{build.title}</h3>
                          <p className="text-sm text-gray-400">por {build.author?.username || 'Usuário'}</p>
                        </div>
                      </div>
                      
                      {user && (user._id === build.author?._id || user.isAdmin) && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(build._id);
                          }}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200 opacity-100 group-hover:bg-red-500/20"
                          title="Deletar build"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </motion.button>
                      )}
                    </div>
                    
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {build.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        {formatDate(build.createdAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <EyeIcon className="w-4 h-4" />
                        {build.views || 0}
                      </div>
                      <div className="flex items-center gap-1">
                        <ChatBubbleLeftIcon className="w-4 h-4" />
                        {build.comments?.length || 0}
                      </div>
                    </div>
                  </div>

                  {/* Build Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        build.lane === 'top' ? 'bg-red-500/20 text-red-400' :
                        build.lane === 'jungle' ? 'bg-green-500/20 text-green-400' :
                        build.lane === 'mid' ? 'bg-blue-500/20 text-blue-400' :
                        build.lane === 'support' ? 'bg-purple-500/20 text-purple-400' :
                        build.lane === 'bottom' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {lanes.find(l => l.id === build.lane)?.name || build.lane}
                      </span>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(build._id);
                        }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                          likedBuilds.has(build._id)
                            ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                            : 'bg-white/10 text-gray-400 hover:bg-white/20 border border-white/20'
                        }`}
                      >
                        {likedBuilds.has(build._id) ? (
                          <HeartIconSolid className="w-4 h-4" />
                        ) : (
                          <HeartIcon className="w-4 h-4" />
                        )}
                        {build.likes?.length || 0}
                      </motion.button>
                    </div>

                    {build.matchup && (
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <h4 className="text-sm font-medium text-white mb-2">Matchup vs</h4>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/20">
                            <img 
                              src={build.matchup.icon || 'https://via.placeholder.com/32x32/374151/FFFFFF?text=?'} 
                              alt={build.matchup.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-sm text-gray-300">{build.matchup.name}</span>
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    {build.tags && build.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {build.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-lg border border-emerald-500/30"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Build Details Modal */}
      <AnimatePresence>
        {selectedBuild && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedBuild(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">{selectedBuild.title}</h2>
                <div className="flex items-center gap-2">
                  {/* Botão de deletar para o autor da build ou admin */}
                  {user && (user._id === selectedBuild.author?._id || user.isAdmin) && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (window.confirm('Tem certeza que deseja deletar esta build? Esta ação não pode ser desfeita.')) {
                          handleDelete(selectedBuild._id);
                        }
                      }}
                      className="p-3 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                      title="Deletar build"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </motion.button>
                  )}
                  
                  {/* Botão de fechar */}
                  <button
                    onClick={() => setSelectedBuild(null)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Build Content */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-xl p-4">
                      <h3 className="text-lg font-semibold text-white mb-2">Descrição</h3>
                      <p className="text-gray-300">{selectedBuild.description}</p>
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-4">
                      <h3 className="text-lg font-semibold text-white mb-2">Informações</h3>
                      <div className="space-y-2 text-sm text-gray-300">
                        <div className="flex justify-between">
                          <span>Lane:</span>
                          <span className="text-white">{lanes.find(l => l.id === selectedBuild.lane)?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Matchup:</span>
                          <span className="text-white">{selectedBuild.matchup}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Dificuldade:</span>
                          <span className="text-white capitalize">{selectedBuild.difficulty}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Visualizações:</span>
                          <span className="text-white">{selectedBuild.views || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-xl p-4">
                      <h3 className="text-lg font-semibold text-white mb-2">Autor</h3>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                          <span className="text-black font-bold text-lg">
                            {selectedBuild.author?.username?.charAt(0).toUpperCase() || '?'}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{selectedBuild.author?.username}</p>
                          <p className="text-gray-400 text-sm">{formatDate(selectedBuild.createdAt)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4">
                      <h3 className="text-lg font-semibold text-white mb-2">Estatísticas</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <HeartIcon className="w-5 h-5 text-pink-400" />
                          <span className="text-white">{selectedBuild.likes?.length || 0} curtidas</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ChatBubbleLeftIcon className="w-5 h-5 text-blue-400" />
                          <span className="text-white">{selectedBuild.comments?.length || 0} comentários</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">
                      Comentários ({selectedBuild.comments?.length || 0})
                    </h3>
                    <button
                      onClick={() => setShowComments(!showComments)}
                      className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
                    >
                      {showComments ? 'Ocultar' : 'Mostrar'}
                    </button>
                  </div>

                  {showComments && (
                    <div className="space-y-4">
                      {/* Add Comment */}
                      {user && (
                        <div className="flex gap-3">
                          <input
                            type="text"
                            placeholder="Adicionar comentário..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="flex-1 px-3 py-2 bg-white/10 rounded-lg border border-white/20 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none"
                          />
                          <button
                            onClick={() => handleAddComment(selectedBuild._id)}
                            className="px-4 py-2 bg-emerald-500 text-black rounded-lg hover:bg-emerald-400 transition-colors duration-200"
                          >
                            Enviar
                          </button>
                        </div>
                      )}

                      {/* Comments List */}
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {selectedBuild.comments && selectedBuild.comments.length > 0 ? (
                          selectedBuild.comments.map((comment, index) => (
                            <div key={comment._id || index} className="bg-white/5 rounded-lg p-3">
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                                    <span className="text-black text-xs font-bold">
                                      {comment.author?.username?.charAt(0).toUpperCase() || '?'}
                                    </span>
                                  </div>
                                  <span className="text-white text-sm font-medium">
                                    {comment.author?.username}
                                  </span>
                                </div>
                                <span className="text-gray-400 text-xs">
                                  {formatDate(comment.createdAt)}
                                </span>
                              </div>
                              <p className="text-gray-300 text-sm mt-2">{comment.content}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-400 text-center py-4">
                            Nenhum comentário ainda. Seja o primeiro!
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            onClick={() => setShowAuthModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                {isLogin ? 'Entrar' : 'Cadastrar'}
              </h2>
              
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {!isLogin && (
                  <input
                    type="text"
                    placeholder="Username"
                    value={authForm.username}
                    onChange={(e) => setAuthForm({...authForm, username: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/20 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none"
                    required
                  />
                )}
                
                <input
                  type="email"
                  placeholder="Email"
                  value={authForm.email}
                  onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/20 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none"
                  required
                />
                
                <input
                  type="password"
                  placeholder="Senha"
                  value={authForm.password}
                  onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/20 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none"
                  required
                />
                
                {!isLogin && (
                  <input
                    type="text"
                    placeholder="Código Secreto (ZAC2024, MONOZAC, etc.)"
                    value={authForm.secretCode}
                    onChange={(e) => setAuthForm({...authForm, secretCode: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/20 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none"
                    required
                  />
                )}
                
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-semibold rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all duration-300"
                >
                  {isLogin ? 'Entrar' : 'Cadastrar'}
                </button>
              </form>
              
              <div className="mt-4 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
                >
                  {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Entre'}
                </button>
              </div>
              
              {!isLogin && (
                <div className="mt-4 p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30">
                  <p className="text-emerald-400 text-sm text-center">
                    🔐 Códigos secretos: ZAC2024, MONOZAC, GOSMA, SLIME, ZACMAIN
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Build Modal */}
      <CreateBuildModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateBuild}
        user={user}
      />

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(16,185,129,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(20,184,166,0.05),transparent_50%)]" />
      </div>
    </div>
  );
}
