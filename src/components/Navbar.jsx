// src/components/Navbar.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const navItems = [
    { label: "Início", path: "/" },
    { label: "Guia", path: "/guide" },
    { label: "Comunidade", path: "/community" }
  ];

  return (
    <nav className="mx-auto mt-4 flex gap-4 px-4 py-2 bg-[#0F1923]/80 backdrop-blur-sm rounded-xl border border-[#38A3A5]/40 shadow-md w-max">
      {navItems.map((item) => (
        <motion.button
          key={item.label}
          onClick={() => navigate(item.path)}
          whileHover={{ scale: 1.2 }}
          className="px-3 py-1 text-[#C8AA6E] font-semibold text-sm transition-colors duration-200 hover:text-[#80ED99]"
        >
          {item.label}
        </motion.button>
      ))}
    </nav>
  );
}
