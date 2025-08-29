import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { runeData } from '../data/gameData';
import { getRuneIconByMapping, getShardIconByMapping } from '../data/utils/ddragon';

export default function RuneSelector({ runes, onChange }) {
  const [selectedTree, setSelectedTree] = useState('Precision');
  const [showTooltip, setShowTooltip] = useState(null);
  const [runeIcons, setRuneIcons] = useState({});
  const [shardIcons, setShardIcons] = useState({});

  // Carregar ícones das runas
  useEffect(() => {
    const loadRuneIcons = async () => {
      const icons = {};
      for (const tree of Object.values(runeData.keystones)) {
        for (const keystone of tree.keystones) {
          const iconUrl = await getRuneIconByMapping(keystone.icon);
          if (iconUrl) {
            icons[keystone.icon] = iconUrl;
          }
        }
      }
      setRuneIcons(icons);
    };

    const loadShardIcons = async () => {
      const icons = {};
      for (const shard of runeData.shards) {
        const iconUrl = await getShardIconByMapping(shard.icon);
        if (iconUrl) {
          icons[shard.icon] = iconUrl;
        }
      }
      setShardIcons(icons);
    };

    loadRuneIcons();
    loadShardIcons();
  }, []);

  const handleKeystoneChange = (keystone) => {
    onChange({
      ...runes,
      primary: {
        ...runes.primary,
        keystone: keystone.id
      }
    });
  };

  const handleSlotChange = (tree, slot, value) => {
    onChange({
      ...runes,
      [tree]: {
        ...runes[tree],
        [slot]: value.id
      }
    });
  };

  const handleShardChange = (shard, value) => {
    onChange({
      ...runes,
      shards: {
        ...runes.shards,
        [shard]: value.id
      }
    });
  };

  const getSelectedKeystone = () => {
    if (!runes.primary.keystone) return null;
    for (const tree of Object.values(runeData.keystones)) {
      const keystone = tree.keystones.find(k => k.id === runes.primary.keystone);
      if (keystone) return { ...keystone, tree: tree.name };
    }
    return null;
  };

  const getSelectedSlot = (tree, slot) => {
    const slotId = runes[tree]?.[slot];
    if (!slotId) return null;
    return runeData.slots[tree]?.find(s => s.id === slotId);
  };

  const getSelectedShard = (shard) => {
    const shardId = runes.shards?.[shard];
    if (!shardId) return null;
    return runeData.shards.find(s => s.id === shardId);
  };

  const renderIcon = (iconId, fallback = '⚔️') => {
    if (runeIcons[iconId]) {
      return (
        <img 
          src={runeIcons[iconId]} 
          alt={iconId}
          className="w-6 h-6 object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
      );
    }
    return fallback;
  };

  const renderShardIcon = (iconId, fallback = '⚔️') => {
    if (shardIcons[iconId]) {
      return (
        <img 
          src={shardIcons[iconId]} 
          alt={iconId}
          className="w-6 h-6 object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
      );
    }
    return fallback;
  };

  return (
    <div className="space-y-6">
      {/* Primary Tree Selection */}
      <div>
        <h4 className="text-white font-medium mb-3">Árvore Primária</h4>
        <div className="grid grid-cols-5 gap-3">
          {Object.entries(runeData.keystones).map(([treeName, tree]) => (
            <motion.button
              key={treeName}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTree(treeName)}
              className={`p-3 rounded-xl border transition-all duration-200 ${
                selectedTree === treeName
                  ? `bg-gradient-to-r ${tree.color} text-black border-transparent`
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">{renderIcon(tree.icon, '⚔️')}</div>
                <div className="text-xs font-medium">{tree.name}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Keystone Selection */}
      <div>
        <h4 className="text-white font-medium mb-3">Keystone</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {runeData.keystones[selectedTree]?.keystones.map((keystone) => (
            <motion.button
              key={keystone.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleKeystoneChange(keystone)}
              onMouseEnter={() => setShowTooltip(keystone.id)}
              onMouseLeave={() => setShowTooltip(null)}
              className={`relative p-4 rounded-xl border transition-all duration-200 ${
                runes.primary.keystone === keystone.id
                  ? `bg-gradient-to-r ${runeData.keystones[selectedTree].color} text-black border-transparent`
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{renderIcon(keystone.icon, '⚔️')}</div>
                <div className="text-sm font-medium">{keystone.name}</div>
              </div>
              
              {/* Tooltip */}
              <AnimatePresence>
                {showTooltip === keystone.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 bg-black/90 backdrop-blur-sm rounded-lg border border-white/20 text-white text-sm max-w-xs z-50"
                  >
                    <div className="text-center">
                      <div className="text-lg mb-1">{renderIcon(keystone.icon, '⚔️')}</div>
                      <div className="font-medium mb-1">{keystone.name}</div>
                      <div className="text-gray-300 text-xs">{keystone.description}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Primary Tree Slots */}
      <div>
        <h4 className="text-white font-medium mb-3">Slots Primários</h4>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((slot) => (
            <div key={slot}>
              <label className="block text-gray-300 text-sm mb-2">Slot {slot}</label>
              <select
                value={runes.primary[`slot${slot}`] || ''}
                onChange={(e) => {
                  const selected = runeData.slots[selectedTree]?.find(s => s.id === e.target.value);
                  if (selected) handleSlotChange('primary', `slot${slot}`, selected);
                }}
                className="w-full px-3 py-2 bg-white/10 rounded-lg border border-white/20 text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="">Selecione...</option>
                {runeData.slots[selectedTree]?.map(rune => (
                  <option key={rune.id} value={rune.id}>{rune.name}</option>
                ))}
              </select>
              {getSelectedSlot('primary', `slot${slot}`) && (
                <div className="mt-2 p-2 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-lg">{renderIcon(getSelectedSlot('primary', `slot${slot}`).icon, '⚔️')}</span>
                    <span className="text-gray-300">{getSelectedSlot('primary', `slot${slot}`).name}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Secondary Tree Selection */}
      <div>
        <h4 className="text-white font-medium mb-3">Árvore Secundária</h4>
        <div className="grid grid-cols-5 gap-3">
          {Object.entries(runeData.keystones).map(([treeName, tree]) => (
            <motion.button
              key={treeName}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onChange({
                  ...runes,
                  secondary: {
                    slot1: '',
                    slot2: '',
                    slot3: ''
                  }
                });
                setSelectedTree(treeName);
              }}
              className={`p-3 rounded-xl border transition-all duration-200 ${
                runes.secondary.slot1 && runeData.slots[treeName]?.find(s => s.id === runes.secondary.slot1)
                  ? `bg-gradient-to-r ${tree.color} text-black border-transparent`
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">{renderIcon(tree.icon, '⚔️')}</div>
                <div className="text-xs font-medium">{tree.name}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Secondary Tree Slots */}
      <div>
        <h4 className="text-white font-medium mb-3">Slots Secundários</h4>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((slot) => (
            <div key={slot}>
              <label className="block text-gray-300 text-sm mb-2">Slot {slot}</label>
              <select
                value={runes.secondary[`slot${slot}`] || ''}
                onChange={(e) => {
                  const selected = runeData.slots[selectedTree]?.find(s => s.id === e.target.value);
                  if (selected) handleSlotChange('secondary', `slot${slot}`, selected);
                }}
                className="w-full px-3 py-2 bg-white/10 rounded-lg border border-white/20 text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="">Selecione...</option>
                {runeData.slots[selectedTree]?.map(rune => (
                  <option key={rune.id} value={rune.id}>{rune.name}</option>
                ))}
              </select>
              {getSelectedSlot('secondary', `slot${slot}`) && (
                <div className="mt-2 p-2 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-lg">{renderIcon(getSelectedSlot('secondary', `slot${slot}`).icon, '⚔️')}</span>
                    <span className="text-gray-300">{getSelectedSlot('secondary', `slot${slot}`).name}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Shards */}
      <div>
        <h4 className="text-white font-medium mb-3">Shards</h4>
        <div className="grid grid-cols-3 gap-3">
          {['offense', 'flex', 'defense'].map((shard, index) => (
            <div key={shard}>
              <label className="block text-gray-300 text-sm mb-2">
                {index === 0 ? 'Ofensivo' : index === 1 ? 'Flexível' : 'Defensivo'}
              </label>
              <select
                value={runes.shards?.[shard] || ''}
                onChange={(e) => {
                  const selected = runeData.shards.find(s => s.id === e.target.value);
                  if (selected) handleShardChange(shard, selected);
                }}
                className="w-full px-3 py-2 bg-white/10 rounded-lg border border-white/20 text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="">Selecione...</option>
                {runeData.shards.map(shardOption => (
                  <option key={shardOption.id} value={shardOption.id}>{shardOption.name}</option>
                ))}
              </select>
              {getSelectedShard(shard) && (
                <div className="mt-2 p-2 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-lg">{renderShardIcon(getSelectedShard(shard).icon, '⚔️')}</span>
                    <span className="text-gray-300">{getSelectedShard(shard).name}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Rune Summary */}
      <div className="bg-white/5 rounded-xl p-4">
        <h4 className="text-white font-medium mb-3">Resumo das Runas</h4>
        <div className="space-y-3">
          {getSelectedKeystone() && (
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg border border-emerald-500/30">
              <div className={`w-12 h-12 bg-gradient-to-r ${getSelectedKeystone().tree === 'Precision' ? 'from-yellow-500 to-orange-500' : 
                getSelectedKeystone().tree === 'Domination' ? 'from-red-500 to-pink-500' :
                getSelectedKeystone().tree === 'Sorcery' ? 'from-blue-500 to-cyan-500' :
                getSelectedKeystone().tree === 'Resolve' ? 'from-green-500 to-emerald-500' :
                'from-purple-500 to-violet-500'} rounded-lg flex items-center justify-center text-2xl`}>
                {renderIcon(getSelectedKeystone().icon, '⚔️')}
              </div>
              <div>
                <div className="text-white font-medium">{getSelectedKeystone().name}</div>
                <div className="text-gray-300 text-sm">{getSelectedKeystone().tree}</div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="text-gray-300 text-sm mb-2">Primária</div>
              <div className="space-y-1">
                {[1, 2, 3].map(slot => {
                  const selected = getSelectedSlot('primary', `slot${slot}`);
                  return selected ? (
                    <div key={slot} className="flex items-center gap-2 text-sm">
                      <span>{renderIcon(selected.icon, '⚔️')}</span>
                      <span className="text-white">{selected.name}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
            
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="text-gray-300 text-sm mb-2">Secundária</div>
              <div className="space-y-1">
                {[1, 2, 3].map(slot => {
                  const selected = getSelectedSlot('secondary', `slot${slot}`);
                  return selected ? (
                    <div key={slot} className="flex items-center gap-2 text-sm">
                      <span>{renderIcon(selected.icon, '⚔️')}</span>
                      <span className="text-white">{selected.name}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

