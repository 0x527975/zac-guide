import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { itemData } from '../data/gameData';
import { PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { getItemIconByMapping } from '../data/utils/ddragon';

export default function ItemSelector({ items, onChange }) {
  const [showTooltip, setShowTooltip] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('starting');
  const [itemIcons, setItemIcons] = useState({});

  // Carregar ícones dos itens
  useEffect(() => {
    const loadItemIcons = async () => {
      const icons = {};
      for (const category of Object.values(itemData)) {
        if (Array.isArray(category)) {
          for (const item of category) {
            const iconUrl = await getItemIconByMapping(item.icon);
            if (iconUrl) {
              icons[item.icon] = iconUrl;
            }
          }
        }
      }
      setItemIcons(icons);
    };

    loadItemIcons();
  }, []);

  const addItem = (category) => {
    onChange({
      ...items,
      [category]: [...(items[category] || []), '']
    });
  };

  const removeItem = (category, index) => {
    onChange({
      ...items,
      [category]: items[category].filter((_, i) => i !== index)
    });
  };

  const updateItem = (category, index, itemId) => {
    onChange({
      ...items,
      [category]: items[category].map((item, i) => i === index ? itemId : item)
    });
  };

  const getItemById = (itemId) => {
    for (const category of Object.values(itemData)) {
      if (Array.isArray(category)) {
        const item = category.find(item => item.id === itemId);
        if (item) return item;
      }
    }
    return null;
  };

  const getItemCost = (itemIds) => {
    return itemIds.reduce((total, itemId) => {
      const item = getItemById(itemId);
      return total + (item?.cost || 0);
    }, 0);
  };

  const renderIcon = (iconId, fallback = '📦') => {
    if (itemIcons[iconId]) {
      return (
        <img 
          src={itemIcons[iconId]} 
          alt={iconId}
          className="w-8 h-8 object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
      );
    }
    return fallback;
  };

  const categories = [
    { id: 'starting', name: 'Itens Iniciais', icon: '🎯', color: 'from-green-500 to-emerald-500' },
    { id: 'mythics', name: 'Míticos', icon: '⭐', color: 'from-yellow-500 to-orange-500' },
    { id: 'legendary', name: 'Lendários', icon: '💎', color: 'from-blue-500 to-cyan-500' },
    { id: 'situational', name: 'Situacionais', icon: '🔄', color: 'from-purple-500 to-violet-500' },
    { id: 'boots', name: 'Botas', icon: '👢', color: 'from-gray-500 to-slate-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
              selectedCategory === category.id
                ? `bg-gradient-to-r ${category.color} text-black border-transparent`
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span className="font-medium">{category.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Item Selection */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-white font-medium text-lg">
            {categories.find(c => c.id === selectedCategory)?.name}
          </h4>
          {selectedCategory !== 'boots' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addItem(selectedCategory)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-black rounded-lg hover:bg-emerald-400 transition-all duration-200"
            >
              <PlusIcon className="w-4 h-4" />
              Adicionar
            </motion.button>
          )}
        </div>

        {selectedCategory === 'boots' ? (
          // Boots Selection (Single Item)
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {itemData.boots.map((boot) => (
              <motion.button
                key={boot.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onChange({ ...items, boots: boot.id })}
                onMouseEnter={() => setShowTooltip(boot.id)}
                onMouseLeave={() => setShowTooltip(null)}
                className={`relative p-4 rounded-xl border transition-all duration-200 ${
                  items.boots === boot.id
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black border-transparent'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{renderIcon(boot.icon, '👢')}</div>
                  <div className="text-sm font-medium mb-1">{boot.name}</div>
                  <div className="text-xs opacity-80">{boot.cost} gold</div>
                </div>

                {/* Tooltip */}
                <AnimatePresence>
                  {showTooltip === boot.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 bg-black/90 backdrop-blur-sm rounded-lg border border-white/20 text-white text-sm max-w-xs z-50"
                    >
                      <div className="text-center">
                        <div className="text-lg mb-1">{renderIcon(boot.icon, '👢')}</div>
                        <div className="font-medium mb-1">{boot.name}</div>
                        <div className="text-gray-300 text-xs mb-2">{boot.stats}</div>
                        <div className="text-emerald-400 text-xs">{boot.cost} gold</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>
        ) : (
          // Multiple Items Selection
          <div className="space-y-3">
            {items[selectedCategory]?.map((itemId, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-1">
                  <select
                    value={itemId}
                    onChange={(e) => updateItem(selectedCategory, index, e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 rounded-lg border border-white/20 text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="">Selecione um item...</option>
                    {itemData[selectedCategory]?.map(item => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => removeItem(selectedCategory, index)}
                  className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-400 transition-all duration-200"
                >
                  <TrashIcon className="w-4 h-4" />
                </motion.button>
              </div>
            ))}

            {items[selectedCategory]?.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <div className="text-4xl mb-2">📦</div>
                <p>Nenhum item selecionado</p>
                <p className="text-sm">Clique em "Adicionar" para começar</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Selected Items Preview */}
      <div className="bg-white/5 rounded-xl p-4">
        <h4 className="text-white font-medium mb-3">Itens Selecionados</h4>
        
        <div className="space-y-4">
          {/* Starting Items */}
          {items.starting && items.starting.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🎯</span>
                <span className="text-gray-300 text-sm">Iniciais</span>
                <span className="text-emerald-400 text-sm ml-auto">
                  {getItemCost(items.starting)} gold
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.starting.map((itemId, index) => {
                  const item = getItemById(itemId);
                  return item ? (
                    <div key={index} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
                      <span className="text-lg">{renderIcon(item.icon, '📦')}</span>
                      <span className="text-white text-sm">{item.name}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {/* Mythics */}
          {items.mythics && items.mythics.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">⭐</span>
                <span className="text-gray-300 text-sm">Míticos</span>
                <span className="text-emerald-400 text-sm ml-auto">
                  {getItemCost(items.mythics)} gold
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.mythics.map((itemId, index) => {
                  const item = getItemById(itemId);
                  return item ? (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
                      <span className="text-lg">{renderIcon(item.icon, '⭐')}</span>
                      <span className="text-white text-sm">{item.name}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {/* Legendary Items */}
          {items.legendary && items.legendary.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">💎</span>
                <span className="text-gray-300 text-sm">Lendários</span>
                <span className="text-emerald-400 text-sm ml-auto">
                  {getItemCost(items.legendary)} gold
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.legendary.map((itemId, index) => {
                  const item = getItemById(itemId);
                  return item ? (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30">
                      <span className="text-lg">{renderIcon(item.icon, '💎')}</span>
                      <span className="text-white text-sm">{item.name}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {/* Situational Items */}
          {items.situational && items.situational.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🔄</span>
                <span className="text-gray-300 text-sm">Situacionais</span>
                <span className="text-emerald-400 text-sm ml-auto">
                  {getItemCost(items.situational)} gold
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.situational.map((itemId, index) => {
                  const item = getItemById(itemId);
                  return item ? (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-lg border border-purple-500/30">
                      <span className="text-lg">{renderIcon(item.icon, '🔄')}</span>
                      <span className="text-white text-sm">{item.name}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {/* Boots */}
          {items.boots && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">👢</span>
                <span className="text-gray-300 text-sm">Botas</span>
                <span className="text-emerald-400 text-sm ml-auto">
                  {getItemCost([items.boots])} gold
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(() => {
                  const item = getItemById(items.boots);
                  return item ? (
                    <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-gray-500/20 to-slate-500/20 rounded-lg border border-gray-500/30">
                      <span className="text-lg">{renderIcon(item.icon, '👢')}</span>
                      <span className="text-white text-sm">{item.name}</span>
                    </div>
                  ) : null;
                })()}
              </div>
            </div>
          )}
        </div>

        {/* Total Cost */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-white font-medium">Custo Total:</span>
            <span className="text-emerald-400 font-bold text-lg">
              {getItemCost([
                ...(items.starting || []),
                ...(items.mythics || []),
                ...(items.legendary || []),
                ...(items.situational || []),
                ...(items.boots ? [items.boots] : [])
              ])} gold
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
