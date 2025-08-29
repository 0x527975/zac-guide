import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ChampionDraft from "../components/ChampionDraft";
import { getZacData } from "../data/zacData";
import Aurora from "../blocks/Backgrounds/Aurora/Aurora";
import { FaUsers, FaHome } from "react-icons/fa";

export default function ZacGuide() {
  const navigate = useNavigate();
  const [zacData, setZacData] = useState(null);
  const [selectedLane, setSelectedLane] = useState(null);
  const [selectedMatchup, setSelectedMatchup] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getZacData();
      setZacData(data);
    })();
  }, []);

  if (!zacData) {
    return (
      <div className="w-full h-full bg-[#0A1428] flex items-center justify-center text-white">
        <p className="text-xl animate-pulse text-emerald-400">
          Carregando dados do Zac...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Aurora com a nova paleta roxo/verde */}
      <div className="absolute inset-0 -z-10">
        <Aurora
          colorStops={["#301466", "#38A3A5", "#80ED99"]}
          blend={1.6}
          amplitude={3.0}
          speed={0.5}
        />
      </div>

      {/* Botões de navegação */}
      <div className="absolute top-6 left-6 z-20 flex gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="bg-[#0F1923]/90 backdrop-blur-sm text-[#F0E6D2] px-4 py-2 rounded-lg border border-[#38A3A5]/30 hover:border-[#38A3A5]/50 transition-all duration-300 flex items-center gap-2"
        >
          <FaHome size={16} />
          Início
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/community')}
          className="bg-[#38A3A5]/90 backdrop-blur-sm text-[#0F1923] px-4 py-2 rounded-lg border border-[#38A3A5]/30 hover:border-[#38A3A5]/50 transition-all duration-300 flex items-center gap-2 font-medium"
        >
          <FaUsers size={16} />
          Comunidade
        </motion.button>
      </div>

      {/* Conteúdo principal */}
      <ChampionDraft
        zacData={zacData}
        selectedLane={selectedLane}
        setSelectedLane={setSelectedLane}
        selectedMatchup={selectedMatchup}
        setSelectedMatchup={setSelectedMatchup}
      />
    </div>
  );
}
