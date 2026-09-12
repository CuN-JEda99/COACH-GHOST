import React, { useState, useEffect } from 'react';
import { Zap, Target, Shield, Compass, Sparkles, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

export default function IaRecommender({ onApplyToForm }) {
  const [posicion, setPosicion] = useState('Delantero');
  const [loading, setLoading] = useState(false);
  const [planIA, setPlanIA] = useState(null);
  const [error, setError] = useState(null);

  const posiciones = [
    { id: 'Delantero', label: 'Delantero', icon: Target, focus: '3 Ejercicios de Definición' },
    { id: 'Defensa', label: 'Defensa', icon: Shield, focus: '3 de Perfilamiento y Cierre' },
    { id: 'Medio', label: 'Medio', icon: Compass, focus: '3 de Visión y Distribución' },
    { id: 'Arquero', label: 'Arquero', icon: Sparkles, focus: '3 de Reflejos y Bisectriz' },
  ];

  const fetchRecomendacion = async (pos) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.recomendarIA(pos, { nivel: 'Competitivo', origen: 'Landing Probar Gratis' });
      if (res && res.data) {
        setPlanIA(res.data);
      }
    } catch (err) {
      console.error('Error al solicitar plan IA:', err);
      setError('No se pudo conectar con el motor de IA. Revisa si el backend está activo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecomendacion('Delantero');
  }, []);

  const handleSelectPosicion = (pos) => {
    setPosicion(pos);
    fetchRecomendacion(pos);
  };

  return (
    <section id="ia-trainer" className="py-24 bg-[#09090b] border-t border-[#222226] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF88]/10 text-[#00FF88] text-xs font-bold uppercase tracking-widest mb-3">
            <Zap className="w-4 h-4" />
            Prueba tu Plan Gratis con Inteligencia Artificial
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Recomendador Inteligente por Posición
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#A1A1AA]">
            Algoritmo biomecánico que diseña tus 3 drills tácticos clave según las exigencias de tu rol en la cancha.
          </p>
        </div>

        {/* Position Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
          {posiciones.map((pos) => {
            const Icon = pos.icon;
            const isSelected = posicion === pos.id;
            return (
              <button
                key={pos.id}
                onClick={() => handleSelectPosicion(pos.id)}
                className={`p-5 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
                  isSelected
                    ? 'bg-[#121214] border-[#00FF88] shadow-neon transform -translate-y-1'
                    : 'bg-[#09090b] border-[#222226] hover:border-gray-700 hover:bg-[#121214]'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-[#00FF88] text-black' : 'bg-[#18181B] text-gray-400'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-display font-bold text-base text-white">
                  {pos.label}
                </span>
                <span className="text-[11px] font-semibold text-[#00FF88]">
                  {pos.focus}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Box */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Loader2 className="w-10 h-10 text-[#00FF88] animate-spin mb-4" />
            <p className="text-base text-gray-300 font-semibold">
              Coach Ghost IA está calibrando los 3 drills de {posicion}...
            </p>
          </div>
        ) : error ? (
          <div className="p-6 rounded-2xl bg-red-950/40 border border-red-800 text-center max-w-lg mx-auto text-red-200">
            {error}
          </div>
        ) : planIA ? (
          <div className="max-w-5xl mx-auto">
            {/* Meta bar */}
            <div className="bg-[#121214] border border-[#222226] rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#00FF88]">
                  Enfoque Biomecánico Oficial
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
                  {planIA.enfoque}
                </h3>
                <p className="text-sm text-[#A1A1AA] mt-1 max-w-2xl">
                  {planIA.descripcionIA}
                </p>
              </div>
              <button
                onClick={() => onApplyToForm(posicion)}
                className="bg-[#00FF88] hover:bg-[#00cc6a] text-black font-extrabold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-neon flex items-center gap-2 flex-shrink-0"
              >
                <span>Inscribirme con este plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* 3 Drills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {planIA.ejercicios && planIA.ejercicios.map((drill, index) => (
                <div
                  key={drill.id || index}
                  className="rounded-2xl bg-[#121214] border border-[#222226] hover:border-[#00FF88]/40 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-neon-subtle"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black uppercase text-black bg-[#00FF88] px-2.5 py-0.5 rounded">
                        Drill #{index + 1}
                      </span>
                      <span className="text-[11px] font-semibold text-gray-400 bg-[#18181B] px-2 py-1 rounded">
                        {drill.intensidad}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-lg text-white mb-2 leading-snug">
                      {drill.titulo}
                    </h4>

                    <p className="text-xs font-semibold text-[#00FF88] mb-3">
                      {drill.repeticiones}
                    </p>

                    <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">
                      {drill.descripcion}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#222226] space-y-2">
                    <div className="flex items-start gap-2 text-xs text-gray-300">
                      <span className="text-[#00FF88] font-bold">Tip Pro:</span>
                      <span className="text-gray-400">{drill.claveTecnica}</span>
                    </div>
                    <div className="text-[11px] text-gray-500">
                      <strong>Material:</strong> {drill.material}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

      </div>
    </section>
  );
}
