import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { authAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function AuthModal({ isOpen, onClose, onSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const response = await authAPI.login({
          email: formData.email,
          password: formData.password
        });
        login(response.data.user, response.data.token);
        onSuccess();
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('As senhas não coincidem');
          setLoading(false);
          return;
        }
        const response = await authAPI.register({
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
        login(response.data.user, response.data.token);
        onSuccess();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao autenticar');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setError('');
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-gradient-to-br from-[#0F1923] to-[#1E2328] rounded-2xl p-8 w-full max-w-md border border-[#38A3A5]/30 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#F0E6D2]">
              {isLogin ? 'Entrar' : 'Registrar'}
            </h2>
            <button
              onClick={onClose}
              className="text-[#A09B8C] hover:text-[#F0E6D2] transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-[#C8AA6E] mb-2">
                  Nome de usuário
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-[#1E2328] border border-[#4B5563] rounded-lg text-[#F0E6D2] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#38A3A5] focus:border-[#38A3A5] transition-all"
                  placeholder="Digite seu nome de usuário"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[#C8AA6E] mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-[#1E2328] border border-[#4B5563] rounded-lg text-[#F0E6D2] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#38A3A5] focus:border-[#38A3A5] transition-all"
                placeholder="Digite seu email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#C8AA6E] mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 pr-12 bg-[#1E2328] border border-[#4B5563] rounded-lg text-[#F0E6D2] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#38A3A5] focus:border-[#38A3A5] transition-all"
                  placeholder="Digite sua senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] hover:text-[#F0E6D2] transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-[#C8AA6E] mb-2">
                  Confirmar senha
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-[#1E2328] border border-[#4B5563] rounded-lg text-[#F0E6D2] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#38A3A5] focus:border-[#38A3A5] transition-all"
                  placeholder="Confirme sua senha"
                />
              </div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#38A3A5] to-[#80ED99] text-[#0F1923] font-bold py-3 px-6 rounded-lg hover:from-[#57CC99] hover:to-[#80ED99] transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Carregando...' : (isLogin ? 'Entrar' : 'Registrar')}
            </button>
          </form>

          {/* Toggle mode */}
          <div className="mt-6 text-center">
            <button
              onClick={toggleMode}
              className="text-[#A09B8C] hover:text-[#38A3A5] transition-colors text-sm"
            >
              {isLogin 
                ? 'Não tem uma conta? Registre-se' 
                : 'Já tem uma conta? Entre aqui'
              }
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
