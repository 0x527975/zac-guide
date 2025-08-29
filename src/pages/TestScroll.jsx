import React from 'react';
import ModernNavbar from '../components/ModernNavbar';
import bgImage from '../assets/bg.jpg';

export default function TestScroll() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <ModernNavbar />
      
      {/* Background Image */}
      <div className="fixed inset-0 pointer-events-none">
        <img 
          src={bgImage}
          alt="Zac Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/70 to-black/80" />
      </div>
      
      {/* Content with lots of sections to test scroll */}
      <div className="relative pt-32">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-6xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Teste de Scroll
            </span>
          </h1>
          
          {/* Section 1 */}
          <section className="mb-20 p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6">Seção 1 - Teste</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Esta é uma seção de teste para verificar se o scroll está funcionando corretamente. 
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua.
            </p>
          </section>
          
          {/* Section 2 */}
          <section className="mb-20 p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6">Seção 2 - Mais Conteúdo</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Segunda seção para testar o scroll. Ut enim ad minim veniam, quis nostrud 
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
            </p>
          </section>
          
          {/* Section 3 */}
          <section className="mb-20 p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6">Seção 3 - Scroll Funcionando?</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Terceira seção. Excepteur sint occaecat cupidatat non proident, sunt in 
              culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis 
              unde omnis iste natus error sit voluptatem accusantium doloremque.
            </p>
          </section>
          
          {/* Section 4 */}
          <section className="mb-20 p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6">Seção 4 - Quase Lá</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Quarta seção. At vero eos et accusamus et iusto odio dignissimos ducimus 
              qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.
            </p>
          </section>
          
          {/* Section 5 */}
          <section className="mb-20 p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6">Seção 5 - Última</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Última seção para garantir que o scroll funcione. Et harum quidem rerum 
              facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis 
              est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.
            </p>
          </section>
          
          {/* Final Section */}
          <section className="mb-20 p-8 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-3xl border border-emerald-500/30">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">🎉 Scroll Funcionando!</h2>
            <p className="text-gray-300 text-lg leading-relaxed text-center">
              Se você conseguiu chegar até aqui, o scroll está funcionando perfeitamente! 
              O problema foi resolvido removendo o overflow-hidden do App.jsx.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
