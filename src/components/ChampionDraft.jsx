import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import LaneSelector from "../components/LaneSelector";
import { getZacData } from "../data/zacData";
import { motion } from "framer-motion";
import MatchupPanel from "../components/MatchupPanel";
import Navbar from "../components/Navbar";

export default function Campeoes() {
    const navigate = useNavigate();
    const [zacData, setZacData] = useState(null);
    const [lanes, setLanes] = useState([]);
    const [selectedLane, setSelectedLane] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedChampion, setSelectedChampion] = useState(null);
    const [counter, setCounter] = useState(30);
    const [showAside, setShowAside] = useState(false);

    useEffect(() => {
        getZacData(true).then((data) => {
            setZacData(data);
            const availableLanes = Object.entries(data)
                .filter(([lane, laneData]) => laneData.matchups && Object.keys(laneData.matchups).length > 0)
                .map(([lane]) => lane);
            setLanes(availableLanes);
            setSelectedLane(availableLanes[0] || null);
        });
    }, []);

    useEffect(() => {
        if (counter === 0) {
            const resetTimeout = setTimeout(() => setCounter(30), 3000);
            return () => clearTimeout(resetTimeout);
        }
        const timer = setTimeout(() => setCounter((c) => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [counter]);

    const champions = useMemo(() => {
        if (!zacData || !selectedLane) return [];
        return Object.entries(zacData[selectedLane].matchups).map(([id, val]) => ({
            id,
            displayName: val.championName,
            iconUrl: val.championIcon,
        }));
    }, [zacData, selectedLane]);

    const filteredChampions = useMemo(() => {
        const search = searchTerm.toLowerCase();
        return champions.filter(({ displayName, id }) =>
            displayName.toLowerCase().includes(search) || id.toLowerCase().includes(search)
        );
    }, [champions, searchTerm]);

    const matchupData = useMemo(() => {
        if (!selectedChampion || !selectedLane || !zacData) return null;
        return zacData[selectedLane].matchups[selectedChampion] || null;
    }, [selectedChampion, selectedLane, zacData]);

    useEffect(() => {
        setSelectedChampion(null);
        setSearchTerm("");
    }, [selectedLane]);

    return (
        <div className="h-screen w-full flex flex-col lg:flex-row bg-gradient-to-b text-[#C8AA6E] overflow-y-auto lg:overflow-y-hidden relative">
            {/* Botão mobile para abrir painel */}
            <button
                onClick={() => setShowAside(true)}
                className="lg:hidden m-4 p-2 bg-[#38A3A5] text-[#0A1428] font-bold rounded shadow self-start"
            >
                Abrir Painel
            </button>
            

            {/* Conteúdo principal */}
            <div className="flex-1 p-4 md:p-6 flex flex-col gap-6 overflow-y-auto" style={{ maxHeight: "100vh" }}>
                <Navbar></Navbar>

                <h1 className="text-center text-2xl sm:text-3xl text-[#F0E6D2] uppercase tracking-widest font-bold">
                    SELECIONE O SEU CAMPEÃO!
                </h1>

                {/* Contador estilo LoL */}
                <div className="flex flex-col items-center my-4">
                    <div className="relative">
                        <span className={`text-5xl sm:text-6xl font-extrabold tracking-wider ${counter <= 5 ? "text-red-500 animate-pulse" : "text-[#80ED99]"}`}>
                            {counter}
                        </span>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-40 sm:w-48 h-1 bg-[#333] mt-2 rounded">
                            <div className="h-full bg-gradient-to-r from-[#38A3A5] via-[#57CC99] to-[#80ED99] transition-all duration-1000" style={{ width: `${(counter / 30) * 100}%` }} />
                        </div>
                    </div>
                </div>

                {/* Grid de seleção */}
                <div className="flex flex-col md:flex-row gap-4 sm:gap-6 w-full bg-[#091428cc] rounded-lg p-4">
                    {/* Sua Equipe */}
                    <div className="w-full md:w-56 p-3 bg-[#0F1923] rounded-xl border border-[#38A3A5]/50 overflow-y-auto max-h-[240px] md:max-h-none">
                        <h3 className="text-[#F0E6D2] text-sm uppercase text-center border-b border-[#38A3A5]/30 pb-2 mb-4">
                            Sua Equipe
                        </h3>
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center mb-4 gap-3">
                                <div className={`w-12 h-12 rounded-full border-2 ${i===0 ? 'border-[#80ED99] shadow-[0_0_10px_#80ED99]' : 'border-[#38A3A5]'} bg-black flex items-center justify-center overflow-hidden`}>
                                    {i === 0 && <img src="https://ddragon.leagueoflegends.com/cdn/15.9.1/img/champion/Zac.png" alt="Zac" className="object-cover" />}
                                </div>
                                <p className="text-sm text-[#F0E6D2]">{i === 0 ? "Você" : `Aliado ${i}`}</p>
                            </div>
                        ))}
                    </div>

                    {/* Seleção de campeões */}
                    <div className="flex-1 flex flex-col items-center min-w-0">
                        <div className="flex flex-wrap justify-between items-center w-full gap-4 mb-5">
                            <div className="flex flex-wrap gap-2 flex-1 min-w-[150px]">
                                <LaneSelector lanes={lanes} selectedLane={selectedLane} onSelectLane={(lane) => setSelectedLane(lane === selectedLane ? null : lane)} />
                            </div>
                            <div className="relative w-full max-w-[220px]">
                                <input
                                    type="text"
                                    placeholder="Buscar"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2.5 bg-[#1E2328] border border-[#4B5563] rounded-lg text-[#F0E6D2] placeholder-[#6B7280] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#38A3A5] focus:border-[#38A3A5] transition duration-200 shadow-sm"
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-4 p-2 sm:p-4 bg-[#1C1C1C] border border-[#17313A] rounded max-h-[60vh] overflow-y-auto w-full">
                            {filteredChampions.length === 0 ? (
                                <p className="col-span-full text-center text-[#A09B8C] text-lg max-w-[400px] mx-auto">
                                    Nenhum campeão disponível.
                                </p>
                            ) : (
                                filteredChampions.map((champ) => (
                                    <motion.button
                                        key={champ.id}
                                        onClick={() => setSelectedChampion(champ.id)}
                                        whileHover={{ scale: 1.1, boxShadow: "0 0 12px #38A3A5" }}
                                        className={`transition duration-300 p-2 rounded-lg border flex flex-col items-center ${selectedChampion === champ.id ? "border-[#80ED99] shadow-[0_0_15px_#80ED99]" : "border-[#333]"}`}
                                    >
                                        <div className="w-16 h-16 rounded-full overflow-hidden border border-[#38A3A5] bg-black flex items-center justify-center">
                                            <img src={champ.iconUrl} alt={champ.displayName} className="object-cover w-full h-full" />
                                        </div>
                                        <span className="mt-2 text-xs text-center text-[#F0E6D2] font-medium">{champ.displayName}</span>
                                    </motion.button>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Inimigos */}
                    <div className="w-full md:w-56 p-3 bg-[#0F1923] rounded-xl border border-[#FF4444]/50 overflow-y-auto max-h-[240px] md:max-h-none">
                        <h3 className="text-[#F0E6D2] text-sm uppercase text-center border-b border-[#FF4444]/30 pb-2 mb-4">
                            Inimigos
                        </h3>
                        {[...Array(5)].map((_, i) => {
                            const isFirst = i === 0 && matchupData;
                            return (
                                <div key={i} className="flex items-center mb-4 gap-3">
                                    <div className={`w-12 h-12 rounded-full border-2 ${isFirst ? "border-[#FF4444] shadow-[0_0_10px_#FF4444]" : "border-[#C33]"} bg-black flex items-center justify-center overflow-hidden`}>
                                        {isFirst && <img src={matchupData.championIcon} alt={matchupData.championName} className="object-cover" />}
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm text-[#F0E6D2]">{isFirst ? matchupData.championName : `Inimigo ${i + 1}`}</p>
                                        {i === 0 && !matchupData && <span className="text-xs text-[#A09B8C] mt-1">Escolhendo...</span>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Painel mobile */}
            {showAside && (
                <div className="fixed inset-0 bg-black/90 z-50 flex justify-end" onClick={() => setShowAside(false)}>
                    <motion.aside
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full h-full p-6 overflow-y-auto relative flex flex-col"
                    >
                        <button onClick={() => setShowAside(false)} className="absolute top-4 right-4 text-[#C8AA6E] font-bold text-3xl leading-none select-none" aria-label="Fechar painel">
                            &times;
                        </button>
                        {matchupData ? (
                            <MatchupPanel matchupData={matchupData} />
                        ) : (
                            <p className="text-gray-400 text-center mt-10">Selecione um campeão inimigo para ver as runas e builds.</p>
                        )}
                    </motion.aside>
                </div>
            )}

            {/* Painel lateral desktop */}
            <motion.aside
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="hidden lg:block w-[550px] bg-[#0F1923] border-l border-[#5C3D99] p-4 sm:p-6 overflow-y-auto h-screen relative"
            >
                {matchupData ? (
                    <MatchupPanel matchupData={matchupData} />
                ) : (
                    <p className="text-gray-400 text-center mt-10">Selecione um campeão inimigo para ver as runas e builds.</p>
                )}
            </motion.aside>
        </div>
    );
}
