import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HeartIcon, 
  TrashIcon, 
  PlusIcon,
  UserIcon,
  CalendarIcon,
  FireIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { buildsAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import CreateBuildModal from '../components/CreateBuildModal';

export default function Community() {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterLane, setFilterLane] = useState('all');
  const { user } = useAuth();

  useEffect(() => {
    fetchBuilds();
  }, []);

  const fetchBuilds = async () => {
    try {
      setLoading(true);
      const response = await buildsAPI.getAll();
      setBuilds(response.data);
    } catch (error) {
      console.error('Erro ao carregar builds:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (buildId) => {
    try {
      const response = await buildsAPI.like(buildId);
      setBuilds(builds.map(build => 
        build._id === buildId ? response.data : build
      ));
    } catch (error) {
      console.error('Erro ao curtir build:', error);
    }
  };

  const handleDelete = async (buildId) => {
    if (window.confirm('Tem certeza que deseja deletar esta build?')) {
      try {
        await buildsAPI.delete(buildId);
        setBuilds(builds.filter(build => build._id !== buildId));
      } catch (error) {
        console.error('Erro ao deletar build:', error);
      }
    }
  };

  const filteredBuilds = builds.filter(build => 
    filterLane === 'all' || build.lane === filterLane
  );

  const lanes = ['all', 'top', 'jungle', 'mid', 'support'];

  if (loading) {
    return (
      <div className="w-full h-full bg-[#0A1428] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#38A3A5] mx-auto mb-4"></div>
          <p className="text-[#F0E6D2] text-lg">Carregando comunidade...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#0A1428] overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0F1923] to-[#1E2328] border-b border-[#38A3A5]/30 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#F0E6D2] mb-2">
                Comunidade Zac
              </h1>
              <p className="text-[#A09B8C] text-lg">
                Compartilhe suas builds e estratégias com outros mono Zacs
              </p>
            </div>
            
            {user && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-[#38A3A5] to-[#80ED99] text-[#0F1923] font-bold px-6 py-3 rounded-lg hover:from-[#57CC99] hover:to-[#80ED99] transition-all duration-300 flex items-center gap-2"
              >
                <PlusIcon className="w-5 h-5" />
                Nova Build
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {lanes.map(lane => (
            <button
              key={lane}
              onClick={() => setFilterLane(lane)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                filterLane === lane
                  ? 'bg-[#38A3A5] text-[#0F1923]'
                  : 'bg-[#1E2328] text-[#A09B8C] hover:bg-[#2A2F35] hover:text-[#F0E6D2]'
              }`}
            >
              {lane === 'all' ? 'Todas' : lane.charAt(0).toUpperCase() + lane.slice(1)}
            </button>
          ))}
        </div>

        {/* Builds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredBuilds.map((build, index) => (
              <motion.div
                key={build._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#0F1923] to-[#1E2328] rounded-xl border border-[#38A3A5]/30 p-6 hover:border-[#38A3A5]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#38A3A5]/20"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#F0E6D2] mb-2">
                      {build.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-[#A09B8C]">
                      <div className="flex items-center gap-1">
                        <UserIcon className="w-4 h-4" />
                        {build.author.username}
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        {new Date(build.createdAt).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>
                  
                  {/* Lane Badge */}
                  <span className="px-3 py-1 bg-[#38A3A5]/20 text-[#38A3A5] text-xs font-medium rounded-full border border-[#38A3A5]/30">
                    {build.lane}
                  </span>
                </div>

                {/* Description */}
                {build.description && (
                  <p className="text-[#A09B8C] mb-4 text-sm leading-relaxed">
                    {build.description}
                  </p>
                )}

                {/* Matchup */}
                <div className="mb-4">
                  <span className="text-xs text-[#6B7280] uppercase tracking-wide">
                    Matchup contra:
                  </span>
                  <p className="text-[#F0E6D2] font-medium">
                    {build.matchup}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLike(build._id)}
                      className="flex items-center gap-2 text-[#A09B8C] hover:text-[#FF4444] transition-colors"
                    >
                      {build.likes.includes(user?._id) ? (
                        <HeartIconSolid className="w-5 h-5 text-[#FF4444]" />
                      ) : (
                        <HeartIcon className="w-5 h-5" />
                      )}
                      <span className="text-sm">{build.likes.length}</span>
                    </button>
                  </div>

                  {/* Delete button for admin or author */}
                  {(user?.isAdmin || user?._id === build.author._id) && (
                    <button
                      onClick={() => handleDelete(build._id)}
                      className="text-[#A09B8C] hover:text-[#FF4444] transition-colors p-2 hover:bg-[#FF4444]/10 rounded-lg"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredBuilds.length === 0 && (
          <div className="text-center py-12">
            <FireIcon className="w-16 h-16 text-[#A09B8C] mx-auto mb-4" />
            <h3 className="text-xl font-medium text-[#F0E6D2] mb-2">
              Nenhuma build encontrada
            </h3>
            <p className="text-[#A09B8C]">
              {filterLane === 'all' 
                ? 'Seja o primeiro a compartilhar uma build!' 
                : `Nenhuma build para ${filterLane} ainda.`
              }
            </p>
          </div>
        )}
      </div>

      {/* Create Build Modal */}
      <CreateBuildModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={() => {
          setShowCreateModal(false);
          fetchBuilds();
        }}
      />
    </div>
  );
}
