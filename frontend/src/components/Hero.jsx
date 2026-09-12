import React from 'react';
import { Play, Zap, ArrowRight, ShieldCheck, Activity, Award } from 'lucide-react';

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-radial-gradient pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Neon Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121214] border border-[#00FF88]/30 mb-8 shadow-neon-subtle animate-pulse">
            <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#00FF88]">
              IA Deportiva de Alto Rendimiento • Bogotá
            </span>
          </div>

          {/* Main Title (Exact text) */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-tight uppercase mb-6">
            Entrena como pro <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-[#00FF88] neon-text-glow">
              desde tu celular
            </span>
          </h1>

          {/* Sub-hero (Exact text) */}
          <p className="text-lg sm:text-xl text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
            Graba tu jugada, la IA te corrige y compites sin pagar entrenador caro
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => scrollTo('contacto')}
              className="w-full sm:w-auto bg-[#00FF88] hover:bg-[#00cc6a] text-black font-extrabold text-base px-8 py-4 rounded-xl shadow-neon transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              <span>Comenzar Ahora Gratis</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => scrollTo('planes')}
              className="w-full sm:w-auto bg-[#121214] hover:bg-[#18181B] text-white font-bold text-base px-8 py-4 rounded-xl border border-[#27272a] hover:border-[#00FF88]/50 transition-all duration-300 flex items-center justify-center gap-2.5"
            >
              <span>Ver Planes de Suscripción</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-16 pt-12 border-t border-[#222226] w-full max-w-4xl">
            <div className="p-4 rounded-xl bg-[#09090b]/80 border border-[#222226]">
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#00FF88]">
                +500
              </div>
              <div className="text-xs text-[#A1A1AA] font-semibold mt-1">
                Jugadores en Bogotá
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#09090b]/80 border border-[#222226]">
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                6 Barrios
              </div>
              <div className="text-xs text-[#A1A1AA] font-semibold mt-1">
                Red de Escuelas Conectadas
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#09090b]/80 border border-[#222226]">
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#00FF88]">
                3 Drills
              </div>
              <div className="text-xs text-[#A1A1AA] font-semibold mt-1">
                Personalizados por Posición
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#09090b]/80 border border-[#222226]">
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                100%
              </div>
              <div className="text-xs text-[#A1A1AA] font-semibold mt-1">
                Digital & Móvil
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
