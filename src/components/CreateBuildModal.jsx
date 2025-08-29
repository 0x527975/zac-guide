import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XMarkIcon,
  PlusIcon,
  TrashIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import RuneSelector from './RuneSelector';
import ItemSelector from './ItemSelector';
import SpellSelector from './SpellSelector';
import { laneData, difficultyData } from '../data/gameData';

export default function CreateBuildModal({ isOpen, onClose, onSubmit, user }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    lane: 'top',
    matchup: '',
    difficulty: 'medium',
    tags: [],
    runes: {
      primary: {
        keystone: '',
        slot1: '',
        slot2: '',
        slot3: ''
      },
      secondary: {
        slot1: '',
        slot2: '',
        slot3: ''
      },
      shards: {
        offense: '',
        flex: '',
        defense: ''
      }
    },
    items: {
      starting: [],
      mythics: [],
      legendary: [],
      situational: [],
      boots: ''
    },
    spells: {
      order: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'E', 'E', 'E', 'R', 'E', 'W'],
      maxOrder: ['Q', 'W', 'E', 'R']
    },
    summonerSpells: {
      primary: '',
      secondary: ''
    }
  });

  const [newTag, setNewTag] = useState('');
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('basic');

  const tabs = [
    { id: 'basic', name: 'Informações Básicas', icon: '📝' },
    { id: 'runes', name: 'Runas', icon: '⚔️' },
    { id: 'items', name: 'Itens', icon: '🛡️' },
    { id: 'spells', name: 'Habilidades', icon: '✨' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleRunesChange = (newRunes) => {
    setFormData(prev => ({
      ...prev,
      runes: newRunes
    }));
  };

  const handleItemsChange = (newItems) => {
    setFormData(prev => ({
      ...prev,
      items: newItems
    }));
  };

  const handleSpellsChange = (newSpells) => {
    setFormData(prev => ({
      ...prev,
      spells: newSpells
    }));
  };

  const handleSummonerSpellsChange = (newSummonerSpells) => {
    setFormData(prev => ({
      ...prev,
      summonerSpells: newSummonerSpells
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Título é obrigatório';
    if (!formData.description.trim()) newErrors.description = 'Descrição é obrigatória';
    if (!formData.matchup.trim()) newErrors.matchup = 'Matchup é obrigatório';
    if (formData.tags.length === 0) newErrors.tags = 'Adicione pelo menos uma tag';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await onSubmit(formData);
      onClose();
      // Reset form
      setFormData({
        title: '',
        description: '',
        lane: 'top',
        matchup: '',
        difficulty: 'medium',
        tags: [],
        runes: {
          primary: { keystone: '', slot1: '', slot2: '', slot3: '' },
          secondary: { slot1: '', slot2: '', slot3: '' },
          shards: { offense: '', flex: '', defense: '' }
        },
        items: { starting: [], mythics: [], legendary: [], situational: [], boots: '' },
        spells: {
          order: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'E', 'E', 'E', 'R', 'E', 'W'],
          maxOrder: ['Q', 'W', 'E', 'R']
        },
        summonerSpells: { primary: '', secondary: '' }
      });
    } catch (error) {
      console.error('Error creating build:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-7xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Criar Nova Build</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black border-transparent'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="font-medium">{tab.name}</span>
              </motion.button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Título da Build *</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/20 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none"
                        placeholder="Ex: Zac Tank vs Yasuo"
                        maxLength={100}
                      />
                      {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Descrição *</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/20 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none"
                        placeholder="Descreva sua estratégia, dicas de gameplay..."
                        rows={4}
                        maxLength={1000}
                      />
                      {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Matchup *</label>
                      <input
                        type="text"
                        value={formData.matchup}
                        onChange={(e) => handleInputChange('matchup', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/20 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none"
                        placeholder="Ex: vs Yasuo, vs Darius"
                        maxLength={50}
                      />
                      {errors.matchup && <p className="text-red-400 text-sm mt-1">{errors.matchup}</p>}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Lane</label>
                      <div className="grid grid-cols-2 gap-2">
                        {laneData.map((lane) => (
                          <button
                            key={lane.id}
                            type="button"
                            onClick={() => handleInputChange('lane', lane.id)}
                            className={`p-3 rounded-xl border transition-all duration-200 ${
                              formData.lane === lane.id
                                ? `bg-gradient-to-r ${lane.color} text-black border-transparent`
                                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                            }`}
                          >
                            <div className="text-center">
                              <div className="text-lg mb-1">{lane.icon}</div>
                              <div className="text-sm font-medium">{lane.name}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Dificuldade</label>
                      <div className="grid grid-cols-3 gap-2">
                        {difficultyData.map((diff) => (
                          <button
                            key={diff.id}
                            type="button"
                            onClick={() => handleInputChange('difficulty', diff.id)}
                            className={`p-3 rounded-xl border transition-all duration-200 ${
                              formData.difficulty === diff.id
                                ? `bg-gradient-to-r ${diff.color} text-black border-transparent`
                                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                            }`}
                          >
                            <div className="text-center">
                              <div className="text-lg mb-1">{diff.icon}</div>
                              <div className="text-sm font-medium">{diff.name}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Tags</label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                          className="flex-1 px-3 py-2 bg-white/10 rounded-lg border border-white/20 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none"
                          placeholder="Adicionar tag..."
                        />
                        <button
                          type="button"
                          onClick={addTag}
                          className="px-4 py-2 bg-emerald-500 text-black rounded-lg hover:bg-emerald-400 transition-colors duration-200"
                        >
                          <PlusIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30"
                          >
                            #{tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="text-emerald-300 hover:text-emerald-200"
                            >
                              <TrashIcon className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      {errors.tags && <p className="text-red-400 text-sm mt-1">{errors.tags}</p>}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Runes Tab */}
            {activeTab === 'runes' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <RuneSelector runes={formData.runes} onChange={handleRunesChange} />
              </motion.div>
            )}

            {/* Items Tab */}
            {activeTab === 'items' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ItemSelector items={formData.items} onChange={handleItemsChange} />
              </motion.div>
            )}

            {/* Spells Tab */}
            {activeTab === 'spells' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SpellSelector 
                  spells={formData.spells} 
                  summonerSpells={formData.summonerSpells}
                  onChange={handleSpellsChange}
                  onSummonerSpellsChange={handleSummonerSpellsChange}
                />
              </motion.div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-8 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-white/10 text-white rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-semibold rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
              >
                <CheckIcon className="w-5 h-5 inline mr-2" />
                Criar Build
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
