import React, { useState } from 'react';
import { Shield, Menu, X, Zap, UserCheck } from 'lucide-react';

export default function Navbar({ onOpenAdmin }) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#000000]/90 backdrop-blur-md border-b border-[#222226]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#121214] border border-[#00FF88]/40 flex items-center justify-center group-hover:border-[#00FF88] transition-all duration-300 shadow-neon-subtle">
              <svg className="w-7 h-7" viewBox="0 0 100 100" fill="none">
                <path d="M50 15 C30 15 20 30 20 52 C20 72 26 84 30 84 C35 84 38 78 44 78 C50 78 53 84 58 84 C64 84 67 78 72 78 C78 78 81 84 86 84 C90 84 92 72 92 52 C92 30 80 15 50 15 Z" 
                      fill="#121214" stroke="#00FF88" strokeWidth="4"/>
                <polygon points="36,44 46,48 38,54" fill="#00FF88"/>
                <polygon points="64,44 54,48 62,54" fill="#00FF88"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl tracking-wider text-white">
                COACH <span className="text-[#00FF88] neon-text-glow">GHOST</span>
              </span>
              <span className="text-[10px] tracking-widest text-[#A1A1AA] uppercase font-semibold">
                AI Athletic Trainer
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('inicio')} className="text-sm font-medium text-gray-300 hover:text-[#00FF88] transition-colors">
              Inicio
            </button>
            <button onClick={() => scrollToSection('como-funciona')} className="text-sm font-medium text-gray-300 hover:text-[#00FF88] transition-colors">
              Cómo Funciona
            </button>
            <button onClick={() => scrollToSection('planes')} className="text-sm font-medium text-gray-300 hover:text-[#00FF88] transition-colors">
              Planes
            </button>
            <button onClick={() => scrollToSection('ia-trainer')} className="text-sm font-medium text-gray-300 hover:text-[#00FF88] transition-colors flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#00FF88]" />
              IA Trainer
            </button>
            <button onClick={() => scrollToSection('contacto')} className="text-sm font-medium text-gray-300 hover:text-[#00FF88] transition-colors">
              Contacto
            </button>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onOpenAdmin}
              className="text-xs font-semibold text-[#A1A1AA] hover:text-white px-3 py-2 rounded-lg border border-transparent hover:border-[#27272a] transition-all flex items-center gap-1.5"
              title="Acceso Administrativo"
            >
              <UserCheck className="w-4 h-4 text-[#00FF88]" />
              Admin
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="bg-[#00FF88] hover:bg-[#00cc6a] text-black font-extrabold text-sm px-5 py-2.5 rounded-lg shadow-neon transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Probar Gratis
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={onOpenAdmin}
              className="p-2 text-[#A1A1AA] hover:text-[#00FF88]"
              title="Admin"
            >
              <UserCheck className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-[#18181B] text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6 text-[#00FF88]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#09090b] border-b border-[#222226] px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => scrollToSection('inicio')}
            className="block w-full text-left py-2 text-base font-medium text-gray-200 hover:text-[#00FF88]"
          >
            Inicio
          </button>
          <button
            onClick={() => scrollToSection('como-funciona')}
            className="block w-full text-left py-2 text-base font-medium text-gray-200 hover:text-[#00FF88]"
          >
            Cómo Funciona
          </button>
          <button
            onClick={() => scrollToSection('planes')}
            className="block w-full text-left py-2 text-base font-medium text-gray-200 hover:text-[#00FF88]"
          >
            Planes
          </button>
          <button
            onClick={() => scrollToSection('ia-trainer')}
            className="block w-full text-left py-2 text-base font-medium text-gray-200 hover:text-[#00FF88] flex items-center gap-2"
          >
            <Zap className="w-4 h-4 text-[#00FF88]" />
            IA Trainer
          </button>
          <button
            onClick={() => scrollToSection('contacto')}
            className="block w-full text-left py-2 text-base font-medium text-gray-200 hover:text-[#00FF88]"
          >
            Contacto
          </button>
          
          <div className="pt-2 border-t border-[#222226] flex flex-col gap-2">
            <button
              onClick={() => scrollToSection('contacto')}
              className="w-full bg-[#00FF88] text-black font-extrabold py-3 rounded-lg text-center"
            >
              Probar Gratis
            </button>
            <button
              onClick={() => { setIsOpen(false); onOpenAdmin(); }}
              className="w-full bg-[#18181B] text-[#A1A1AA] hover:text-white font-semibold py-2.5 rounded-lg text-center border border-[#27272a]"
            >
              Panel Admin (/admin)
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
