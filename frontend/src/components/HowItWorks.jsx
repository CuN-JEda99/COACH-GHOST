import React from 'react';
import { Video, Cpu, TrendingUp, Smartphone, CheckCircle, Zap } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Graba',
      subtitle: 'Captura tu jugada desde cualquier ángulo',
      description: 'Ubica tu celular al borde de la cancha y graba tus repeticiones: tiros al arco, perfilamientos defensivos o cambios de orientación.',
      icon: Video,
      tag: 'Cámara Móvil',
      highlight: 'Soporte 60fps & Slow-Mo'
    },
    {
      number: '02',
      title: 'Analiza',
      subtitle: 'Visión artificial & biomecánica deportiva',
      description: 'El modelo de IA procesa la trayectoria del balón, ángulo del pie de apoyo, rotación de cadera y tiempo de armado de la jugada.',
      icon: Cpu,
      tag: 'IA Biomecánica',
      highlight: 'Precisión en milisegundos'
    },
    {
      number: '03',
      title: 'Mejora',
      subtitle: 'Plan de corrección & match con escuelas',
      description: 'Recibe 3 ejercicios correctivos inmediatos para tu posición y conéctate con escuelas deportivas oficiales de tu mismo barrio en Bogotá.',
      icon: TrendingUp,
      tag: 'Evolución Pro',
      highlight: 'Match Geográfico Bogotá'
    }
  ];

  return (
    <section id="como-funciona" className="py-24 bg-[#09090b] border-y border-[#222226] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-extrabold tracking-widest text-[#00FF88] mb-3">
            <Zap className="w-4 h-4" />
            Metodología Coach Ghost
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            ¿Cómo Funciona?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#A1A1AA]">
            3 pasos sencillos para transformar tu juego individual con la precisión de un cuerpo técnico profesional.
          </p>
        </div>

        {/* 3 Cards Grid - Responsive (1 col mobile, 3 col desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl bg-[#121214] p-8 border border-[#222226] hover:border-[#00FF88]/60 transition-all duration-300 hover:shadow-neon flex flex-col justify-between"
              >
                {/* Step Top Badge */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-display font-black text-4xl text-[#27272a] group-hover:text-[#00FF88]/80 transition-colors">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-[#18181B] border border-[#27272a] flex items-center justify-center text-[#00FF88] group-hover:bg-[#00FF88] group-hover:text-black transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#00FF88] bg-[#00FF88]/10 px-2.5 py-1 rounded-md mb-3">
                    {step.tag}
                  </span>

                  <h3 className="text-2xl font-display font-bold text-white mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm font-semibold text-gray-300 mb-3">
                    {step.subtitle}
                  </p>

                  <p className="text-sm text-[#A1A1AA] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Footer Highlight */}
                <div className="mt-8 pt-4 border-t border-[#222226] flex items-center gap-2 text-xs font-semibold text-gray-400">
                  <CheckCircle className="w-4 h-4 text-[#00FF88]" />
                  <span>{step.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
