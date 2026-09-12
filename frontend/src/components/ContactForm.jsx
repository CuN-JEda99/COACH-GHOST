import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle, MapPin, Phone, Building2, Calendar, Loader2 } from 'lucide-react';
import { api } from '../services/api';

export default function ContactForm({ selectedPlan, selectedPosition }) {
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    barrio: 'Suba',
    posicion: 'Delantero',
    whatsapp: '',
    plan: 'Plan Escuela'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successData, setSuccessData] = useState(null);

  useEffect(() => {
    if (selectedPlan) {
      setFormData(prev => ({ ...prev, plan: selectedPlan }));
    }
  }, [selectedPlan]);

  useEffect(() => {
    if (selectedPosition) {
      setFormData(prev => ({ ...prev, posicion: selectedPosition }));
    }
  }, [selectedPosition]);

  const barrios = ['Suba', 'Kennedy', 'Engativá', 'Chapinero', 'Bosa', 'Usaquén'];
  const posiciones = ['Delantero', 'Defensa', 'Medio', 'Arquero'];
  const planes = ['Plan Jugador', 'Plan Escuela', 'Plan Familiar'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessData(null);

    // Client-side validations
    if (formData.nombre.trim().length < 3) {
      setError('El nombre debe tener al menos 3 caracteres.');
      return;
    }

    const edadNum = parseInt(formData.edad, 10);
    if (isNaN(edadNum) || edadNum < 14 || edadNum > 24) {
      setError('La edad debe estar comprendida entre 14 y 24 años.');
      return;
    }

    const cleanPhone = formData.whatsapp.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setError('El número de WhatsApp debe tener exactamente 10 dígitos (ej: 3001234567).');
      return;
    }

    setLoading(true);

    try {
      const response = await api.registrarContacto({
        ...formData,
        edad: edadNum,
        whatsapp: cleanPhone
      });

      setSuccessData(response);
      // Reset form
      setFormData({
        nombre: '',
        edad: '',
        barrio: 'Suba',
        posicion: 'Delantero',
        whatsapp: '',
        plan: 'Plan Escuela'
      });
    } catch (err) {
      setError(err.message || 'Error al procesar el registro con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="py-24 bg-[#000000] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-extrabold tracking-widest text-[#00FF88] mb-3">
            <Send className="w-4 h-4" />
            Únete a la Comunidad
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Regístrate en Coach Ghost
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#A1A1AA]">
            Completa tus datos de deportista para vincularte con escuelas de fútbol en tu barrio de Bogotá y activar tu IA.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Card Form */}
          <div className="bg-[#121214] border border-[#222226] rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-800 text-red-200 text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Nombre & Edad */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    1. Nombre Completo <span className="text-[#00FF88]">*</span>
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ej. Jostin Daza"
                    required
                    className="w-full bg-[#18181B] border border-[#27272a] rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    2. Edad (14-24) <span className="text-[#00FF88]">*</span>
                  </label>
                  <input
                    type="number"
                    name="edad"
                    min="14"
                    max="24"
                    value={formData.edad}
                    onChange={handleChange}
                    placeholder="Ej. 18"
                    required
                    className="w-full bg-[#18181B] border border-[#27272a] rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Barrio & Posición */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    3. Barrio / Localidad (Bogotá) <span className="text-[#00FF88]">*</span>
                  </label>
                  <select
                    name="barrio"
                    value={formData.barrio}
                    onChange={handleChange}
                    className="w-full bg-[#18181B] border border-[#27272a] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] transition-all"
                  >
                    {barrios.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    4. Posición en Cancha <span className="text-[#00FF88]">*</span>
                  </label>
                  <select
                    name="posicion"
                    value={formData.posicion}
                    onChange={handleChange}
                    className="w-full bg-[#18181B] border border-[#27272a] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] transition-all"
                  >
                    {posiciones.map((pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: WhatsApp & Plan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    5. WhatsApp (10 Dígitos) <span className="text-[#00FF88]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="3001234567"
                    maxLength={10}
                    required
                    className="w-full bg-[#18181B] border border-[#27272a] rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] transition-all"
                  />
                  <span className="text-[11px] text-gray-500 mt-1 block">
                    Solo números, exactamente 10 dígitos
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    6. Plan de Interés <span className="text-[#00FF88]">*</span>
                  </label>
                  <select
                    name="plan"
                    value={formData.plan}
                    onChange={handleChange}
                    className="w-full bg-[#18181B] border border-[#27272a] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] transition-all"
                  >
                    {planes.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#00FF88] hover:bg-[#00cc6a] text-black font-extrabold text-base py-4 rounded-xl shadow-neon transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Conectando con base de datos...</span>
                  </>
                ) : (
                  <>
                    <span>Enviar Registro y Buscar Escuelas</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Success Result Modal / Card */}
          {successData && (
            <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-[#09090b] border-2 border-[#00FF88] shadow-neon animate-in fade-in zoom-in duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#00FF88]/20 flex items-center justify-center text-[#00FF88] flex-shrink-0">
                  <CheckCircle className="w-7 h-7 text-[#00FF88]" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white">
                    {successData.message}
                  </h3>
                  <p className="text-sm text-gray-300 mt-1">
                    Jugador: <strong className="text-white">{successData.cliente?.nombre}</strong> • Posición: <span className="text-[#00FF88]">{successData.cliente?.posicion}</span> • Plan: {successData.cliente?.plan}
                  </p>
                </div>
              </div>

              {/* Matched Schools Box */}
              <div className="mt-6 pt-6 border-t border-[#222226]">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#00FF88] flex items-center gap-2 mb-4">
                  <Building2 className="w-4 h-4" />
                  Escuelas Vinculadas en Barrio {successData.cliente?.barrio}:
                </h4>

                {successData.escuelasCercanas && successData.escuelasCercanas.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {successData.escuelasCercanas.map((esc) => (
                      <div key={esc._id} className="p-4 rounded-2xl bg-[#121214] border border-[#27272a]">
                        <h5 className="font-bold text-white text-base">
                          {esc.nombre}
                        </h5>
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#00FF88]" />
                          {esc.direccion}
                        </p>
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#00FF88]" />
                          {esc.horarios}
                        </p>
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-[#00FF88]" />
                          WhatsApp: {esc.telefono}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">
                    No se encontraron escuelas registradas en {successData.cliente?.barrio} en este momento. Nuestro equipo te contactará para asignarte una sede cercana.
                  </p>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
