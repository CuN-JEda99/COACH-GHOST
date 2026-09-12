import React from 'react';
import { Check, Star, Zap, Shield, Users, Trophy } from 'lucide-react';

export default function Pricing({ onSelectPlan }) {
  const plans = [
    {
      id: 'Plan Jugador',
      name: 'Plan Jugador',
      price: '$15.000',
      period: 'COP / mes',
      target: '1 Usuario Individual',
      description: 'Diseñado para futbolistas que quieren potenciar su técnica y recibir corrección biomecánica diaria.',
      featured: false,
      benefits: [
        'Acceso completo a la IA Coach Ghost móvil',
        '3 ejercicios personalizados diarios por posición',
        'Métricas de velocidad y precisión de remate',
        'Historial de evolución y estadísticas',
        'Búsqueda de escuelas oficiales en Bogotá'
      ],
      badge: 'Individual'
    },
    {
      id: 'Plan Escuela',
      name: 'Plan Escuela',
      price: '$84.900',
      period: 'COP / mes',
      target: 'Panel Para Entrenadores',
      description: 'Ve el progreso de todos tus alumnos en un solo panel con analítica táctica de alto rendimiento.',
      featured: true, // El del medio destacado
      benefits: [
        'Ve el progreso de todos tus alumnos en un solo panel',
        'Gestión de hasta 30 alumnos simultáneos',
        'Panel administrativo de rendimiento grupal',
        'Asignación masiva de drills por posición',
        'Exportación de reportes de progreso a CSV/PDF',
        'Prioridad en el directorio de escuelas por barrio'
      ],
      badge: 'MÁS RECOMENDADO'
    },
    {
      id: 'Plan Familiar',
      name: 'Plan Familiar',
      price: '$109.900',
      period: 'COP / mes',
      target: '4 o más Usuarios',
      description: 'Ideal para familias con varios deportistas o grupos de amigos que entrenan juntos en su localidad.',
      featured: false,
      benefits: [
        'Hasta 5 perfiles individuales independientes',
        'Búsqueda y match de escuelas cercanas por barrio',
        'Comparativa de rendimiento entre familiares',
        'Recomendador IA ilimitado para cualquier posición',
        'Soporte prioritario por WhatsApp 24/7'
      ],
      badge: 'Multiusuario'
    }
  ];

  return (
    <section id="planes" className="py-24 bg-[#000000] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-extrabold tracking-widest text-[#00FF88] mb-3">
            <Trophy className="w-4 h-4" />
            Catálogo Oficial de Suscripciones
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Invierte en tu Rendimiento
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#A1A1AA]">
            Precios reales en pesos colombianos (COP). Sin cláusulas de permanencia, cancela cuando quieras.
          </p>
        </div>

        {/* Pricing Cards Grid - 3 cards, middle highlighted */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.featured
                    ? 'bg-[#121214] border-2 border-[#00FF88] shadow-neon lg:-translate-y-4 z-10'
                    : 'bg-[#09090b] border border-[#222226] hover:border-gray-700'
                }`}
              >
                {/* Featured Badge */}
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00FF88] text-black text-xs font-black uppercase tracking-widest py-1.5 px-4 rounded-full shadow-md flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-black" />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-display font-bold text-white">
                        {plan.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#00FF88] uppercase tracking-wider mt-1">
                        {plan.target}
                      </p>
                    </div>
                    {!plan.featured && (
                      <span className="text-xs font-semibold text-gray-400 bg-[#18181B] px-2.5 py-1 rounded-md border border-[#27272a]">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-[#A1A1AA] mb-6 min-h-[40px]">
                    {plan.description}
                  </p>

                  {/* Price Block */}
                  <div className="mb-8 pb-6 border-b border-[#222226]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-display font-black text-white">
                        {plan.price}
                      </span>
                      <span className="text-sm text-[#A1A1AA] font-semibold">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Benefits List */}
                  <div className="space-y-3 mb-8">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Beneficios incluidos:
                    </p>
                    {plan.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#00FF88]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-[#00FF88]" />
                        </div>
                        <span className={`text-sm ${plan.featured && i === 0 ? 'text-[#00FF88] font-bold' : 'text-gray-300'}`}>
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onSelectPlan(plan.id)}
                  className={`w-full py-4 rounded-xl font-extrabold text-sm uppercase tracking-wider transition-all duration-300 ${
                    plan.featured
                      ? 'bg-[#00FF88] hover:bg-[#00cc6a] text-black shadow-neon hover:shadow-neon-lg transform hover:-translate-y-0.5'
                      : 'bg-[#18181B] hover:bg-[#222226] text-white border border-[#27272a] hover:border-[#00FF88]/40'
                  }`}
                >
                  Elegir Plan
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
