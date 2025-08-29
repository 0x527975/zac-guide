import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import TextPressure from "../blocks/TextAnimations/TextPressure/TextPressure";
import { FaGithub, FaTwitch, FaSignInAlt, FaUsers, FaBookOpen } from "react-icons/fa";
import eaeAudio from "../assets/sounds/eae.mp3";
import bgImage from "../assets/bg.jpg";
import AuthModal from "../components/AuthModal";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const audioRef = useRef(new Audio(eaeAudio));
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div
      className="relative w-full h-full bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* overlay escuro pra dar contraste */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      <motion.div
        initial={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 text-center text-white"
      >
        <div className="w-full max-w-4xl h-[200px] flex items-center justify-center mb-12">
          <TextPressure
            text="Mono Zac Guia"
            flex
            alpha={false}
            stroke={false}
            width
            weight
            italic
            textColor="#34d399"
            strokeColor="#000000"
            minFontSize={36}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <motion.button
            whileHover={{ scale: 1.07, boxShadow: "0 0 15px #34d399" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => {
              audioRef.current.play();
              navigate('/guide');
            }}
            className="bg-emerald-500 rounded-full px-8 py-3 text-lg font-semibold shadow-lg
              hover:bg-gradient-to-r hover:from-emerald-400 hover:to-green-600 text-white
              focus:outline-none focus:ring-4 focus:ring-emerald-300/60
              select-none
              transition-all duration-300 ease-in-out
              flex items-center gap-3
            "
          >
            <FaBookOpen size={18} />
            Guia Zac
          </motion.button>

          {user ? (
            <motion.button
              whileHover={{ scale: 1.07, boxShadow: "0 0 15px #38A3A5" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => navigate('/community')}
              className="bg-[#38A3A5] rounded-full px-8 py-3 text-lg font-semibold shadow-lg
                hover:bg-gradient-to-r hover:from-[#57CC99] hover:to-[#38A3A5] text-white
                focus:outline-none focus:ring-4 focus:ring-[#38A3A5]/60
                select-none
                transition-all duration-300 ease-in-out
                flex items-center gap-3
              "
            >
              <FaUsers size={18} />
              Comunidade
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.07, boxShadow: "0 0 15px #38A3A5" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => setShowAuthModal(true)}
              className="bg-[#38A3A5] rounded-full px-8 py-3 text-lg font-semibold shadow-lg
                hover:bg-gradient-to-r hover:from-[#57CC99] hover:to-[#38A3A5] text-white
                focus:outline-none focus:ring-4 focus:ring-[#38A3A5]/60
                select-none
                transition-all duration-300 ease-in-out
                flex items-center gap-3
              "
            >
              <FaSignInAlt size={18} />
              Entrar
            </motion.button>
          )}
        </div>

        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0F1923]/80 backdrop-blur-sm rounded-xl p-4 mb-8 border border-[#38A3A5]/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#38A3A5] rounded-full flex items-center justify-center">
                  <span className="text-[#0F1923] font-bold text-lg">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-[#F0E6D2] font-medium">Bem-vindo, {user.username}!</p>
                  <p className="text-[#A09B8C] text-sm">Faça login para acessar a comunidade</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="text-[#A09B8C] hover:text-[#FF4444] transition-colors text-sm font-medium"
              >
                Sair
              </button>
            </div>
          </motion.div>
        )}

        <div className="flex gap-6 justify-center mb-8">
          <motion.a
            href="https://github.com/Eduardo-Virissimo/zac-guide-data-dragon"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, color: "#34d399" }}
            className="flex items-center gap-2 text-gray-300 hover:text-emerald-400 transition cursor-pointer font-semibold"
          >
            <FaGithub size={24} />
            GitHub
          </motion.a>

          <motion.a
            href="https://www.twitch.tv/0x527975"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, color: "#9146FF" }}
            className="flex items-center gap-2 text-gray-300 hover:text-purple-600 transition cursor-pointer font-semibold"
          >
            <FaTwitch size={24} />
            Twitch
          </motion.a>
        </div>

        <p className="fixed bottom-4 left-4 text-gray-500 text-sm select-none">
          v2.0.0
        </p>
      </motion.div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => setShowAuthModal(false)}
      />
    </div>
  );
}
