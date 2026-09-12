import React from 'react';
import { Shield, MapPin, Mail, Phone, Heart, Award } from 'lucide-react';

export default function Footer({ onOpenAdmin }) {
  return (
    <footer className="bg-[#09090b] border-t border-[#222226] text-white pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#121214] border border-[#00FF88]/40 flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 100 100" fill="none">
                  <path d="M50 15 C30 15 20 30 20 52 C20 72 26 84 30 84 C35 84 38 78 44 78 C50 78 53 84 58 84 C64 84 67 78 72 78 C78 78 81 84 86 84 C90 84 92 72 92 52 C92 30 80 15 50 15 Z" 
                        fill="#121214" stroke="#00FF88" strokeWidth="4"/>
                  <polygon points="36,44 46,48 38,54" fill="#00FF88"/>
                  <polygon points="64,44 54,48 62,54" fill="#00FF88"/>
                </svg>
              </div>
              <span className="font-display font-black text-xl tracking-wider">
                COACH <span className="text-[#00FF88]">GHOST</span>
              </span>
            </div>
            <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-sm">
              Plataforma digital con Inteligencia Artificial que democratiza el entrenamiento de fútbol de alto rendimiento para jóvenes talentos y escuelas de Bogotá.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#00FF88]">
              <Award className="w-4 h-4" />
              <span>Proyecto Oficial • Jóvenes Creativos 2026</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-gray-300 mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A1A1AA]">
              <li>
                <a href="#inicio" className="hover:text-[#00FF88] transition-colors">Inicio</a>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-[#00FF88] transition-colors">Cómo Funciona</a>
              </li>
              <li>
                <a href="#planes" className="hover:text-[#00FF88] transition-colors">Catálogo de Planes</a>
              </li>
              <li>
                <a href="#ia-trainer" className="hover:text-[#00FF88] transition-colors">IA Recomendador</a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-[#00FF88] transition-colors">Contacto & Registro</a>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="hover:text-[#00FF88] transition-colors text-left font-bold text-gray-300">
                  Panel Administrativo (/admin)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Team */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-gray-300 mb-4">
              Equipo de Desarrollo
            </h4>
            <div className="space-y-2 text-sm text-[#A1A1AA]">
              <p className="text-white font-bold">Jostin Daza </p>
              <p className="text-xs">Bogotá D.C., Colombia</p>
              <p className="text-xs">Fecha de Entrega: <strong className="text-white">11/09/2026</strong></p>
              <div className="pt-2">
                <span className="inline-block px-2.5 py-1 rounded bg-[#18181B] text-[11px] text-gray-400 border border-[#27272a]">
                  Stack: React + Node.js + MongoDB
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#222226] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © 2026 COACH GHOST. Todos los derechos reservados. Desarrollado por Jostin Daza.
          </p>
          <div className="flex items-center gap-6">
            <span>Suba • Kennedy • Engativá • Chapinero • Bosa • Usaquén</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
