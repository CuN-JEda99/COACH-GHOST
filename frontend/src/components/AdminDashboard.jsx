import React, { useState, useEffect } from 'react';
import { 
  Users, Building2, Download, Search, RefreshCw, X, MapPin, 
  Phone, Calendar, CheckCircle, Clock, AlertTriangle, ArrowLeft,
  ChevronRight, Filter
} from 'lucide-react';
import { api } from '../services/api';

export default function AdminDashboard({ onExit }) {
  const [activeTab, setActiveTab] = useState('clientes'); // 'clientes' | 'escuelas'
  const [clientes, setClientes] = useState([]);
  const [escuelas, setEscuelas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBarrio, setFilterBarrio] = useState('');
  
  // Selected client for side-panel match
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [sidePanelEscuelas, setSidePanelEscuelas] = useState([]);
  const [sidePanelLoading, setSidePanelLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resClientes, resEscuelas] = await Promise.all([
        api.getClientes(),
        api.getEscuelas()
      ]);
      setClientes(resClientes.clientes || []);
      setEscuelas(resEscuelas.escuelas || []);
    } catch (err) {
      console.error('Error al cargar datos del dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle client selection to trigger the neighborhood match side-panel
  const handleSelectCliente = async (cliente) => {
    setSelectedCliente(cliente);
    setSidePanelLoading(true);
    try {
      const res = await api.getEscuelas(cliente.barrio);
      setSidePanelEscuelas(res.escuelas || []);
    } catch (err) {
      console.error('Error al cargar escuelas para panel lateral:', err);
      // Fallback filter from already loaded escuelas
      setSidePanelEscuelas(escuelas.filter(e => e.barrio === cliente.barrio));
    } finally {
      setSidePanelLoading(false);
    }
  };

  // Toggle client status (Activo / Inactivo)
  const handleToggleEstado = async (cliente, e) => {
    e.stopPropagation();
    const nuevoEstado = cliente.estado === 'Activo' ? 'Inactivo' : 'Activo';
    try {
      await api.cambiarEstadoCliente(cliente._id, nuevoEstado);
      setClientes(prev => prev.map(c => c._id === cliente._id ? { ...c, estado: nuevoEstado } : c));
      if (selectedCliente && selectedCliente._id === cliente._id) {
        setSelectedCliente(prev => ({ ...prev, estado: nuevoEstado }));
      }
    } catch (err) {
      alert('Error al actualizar estado: ' + err.message);
    }
  };

  // Export to CSV functionality
  const exportToCSV = () => {
    if (clientes.length === 0) {
      alert('No hay clientes para exportar');
      return;
    }

    const headers = ['ID', 'Nombre', 'Edad', 'Barrio', 'Posicion', 'WhatsApp', 'Plan', 'Estado', 'FechaRegistro'];
    const rows = clientes.map(c => [
      c._id,
      `"${c.nombre}"`,
      c.edad,
      `"${c.barrio}"`,
      `"${c.posicion}"`,
      `"${c.whatsapp}"`,
      `"${c.plan}"`,
      `"${c.estado}"`,
      `"${new Date(c.fechaRegistro).toLocaleString()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' 
      + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `clientes_coach_ghost_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered clients list
  const filteredClientes = clientes.filter(c => {
    const matchSearch = c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        c.whatsapp.includes(searchTerm) ||
                        c.posicion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchBarrio = filterBarrio ? c.barrio === filterBarrio : true;
    return matchSearch && matchBarrio;
  });

  const barriosList = ['Suba', 'Kennedy', 'Engativá', 'Chapinero', 'Bosa', 'Usaquén'];

  return (
    <div className="min-h-screen bg-[#000000] text-white pt-24 pb-16">
      
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#222226]">
          
          <div className="flex items-center gap-4">
            <button
              onClick={onExit}
              className="p-2.5 rounded-xl bg-[#121214] border border-[#27272a] hover:border-[#00FF88] text-gray-300 hover:text-[#00FF88] transition-all"
              title="Volver a la Landing Page"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                  Panel de Control Ghost
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#00FF88] text-black">
                  Admin v1.0
                </span>
              </div>
              <p className="text-xs text-[#A1A1AA] mt-1">
                Jóvenes Creativos • Jostin Daza & Angel Cruz • 11/09/2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loading}
              className="p-2.5 rounded-xl bg-[#18181B] border border-[#27272a] hover:border-gray-600 text-gray-300 transition-colors"
              title="Recargar datos"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#00FF88]' : ''}`} />
            </button>

            <button
              onClick={exportToCSV}
              className="bg-[#00FF88] hover:bg-[#00cc6a] text-black font-extrabold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-neon transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Exportar a CSV</span>
            </button>

            <button
              onClick={() => {
                localStorage.removeItem('coach_ghost_token');
                onExit();
              }}
              className="bg-[#18181B] hover:bg-red-950/50 hover:text-red-400 text-gray-400 font-bold text-xs px-4 py-2.5 rounded-xl border border-[#27272a] transition-all"
            >
              Cerrar Sesión
            </button>
          </div>

        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="p-5 rounded-2xl bg-[#09090b] border border-[#222226]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-gray-400">Total Clientes</span>
              <Users className="w-4 h-4 text-[#00FF88]" />
            </div>
            <p className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-2">
              {clientes.length}
            </p>
            <p className="text-[11px] text-gray-500 mt-1">Registrados en BD</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#09090b] border border-[#222226]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-gray-400">Clientes Activos</span>
              <CheckCircle className="w-4 h-4 text-[#00FF88]" />
            </div>
            <p className="text-2xl sm:text-3xl font-display font-extrabold text-[#00FF88] mt-2">
              {clientes.filter(c => c.estado === 'Activo').length}
            </p>
            <p className="text-[11px] text-gray-500 mt-1">Con membresía activa</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#09090b] border border-[#222226]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-gray-400">Escuelas en Red</span>
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <p className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-2">
              {escuelas.length}
            </p>
            <p className="text-[11px] text-gray-500 mt-1">6 Localidades Bogotá</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#09090b] border border-[#222226]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-gray-400">Barrio Top</span>
              <MapPin className="w-4 h-4 text-[#00FF88]" />
            </div>
            <p className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-2">
              Suba
            </p>
            <p className="text-[11px] text-[#00FF88] mt-1">Mayor demanda deportiva</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-4 mt-8 border-b border-[#222226]">
          <button
            onClick={() => setActiveTab('clientes')}
            className={`pb-3 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === 'clientes'
                ? 'border-[#00FF88] text-[#00FF88]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Clientes Registrados ({clientes.length})
          </button>
          <button
            onClick={() => setActiveTab('escuelas')}
            className={`pb-3 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === 'escuelas'
                ? 'border-[#00FF88] text-[#00FF88]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Catálogo de Escuelas ({escuelas.length})
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {activeTab === 'clientes' && (
          <div>
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Buscar por nombre, posición..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#121214] border border-[#27272a] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF88]"
                />
                <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={filterBarrio}
                  onChange={(e) => setFilterBarrio(e.target.value)}
                  className="bg-[#121214] border border-[#27272a] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00FF88]"
                >
                  <option value="">Todos los barrios</option>
                  {barriosList.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>

            {/* Clientes Table */}
            <div className="bg-[#09090b] border border-[#222226] rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#222226] bg-[#121214]/60 text-[11px] font-black uppercase tracking-wider text-gray-400">
                      <th className="p-4">Jugador</th>
                      <th className="p-4">Edad</th>
                      <th className="p-4">Barrio</th>
                      <th className="p-4">Posición</th>
                      <th className="p-4">WhatsApp</th>
                      <th className="p-4">Plan</th>
                      <th className="p-4">Estado</th>
                      <th className="p-4 text-center">Cruce Escuelas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#222226] text-sm">
                    {filteredClientes.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="p-8 text-center text-gray-400">
                          No se encontraron clientes registrados con los filtros aplicados.
                        </td>
                      </tr>
                    ) : (
                      filteredClientes.map((cliente) => {
                        const isSelected = selectedCliente?._id === cliente._id;
                        return (
                          <tr
                            key={cliente._id}
                            onClick={() => handleSelectCliente(cliente)}
                            className={`cursor-pointer transition-colors ${
                              isSelected
                                ? 'bg-[#00FF88]/10 border-l-4 border-l-[#00FF88]'
                                : 'hover:bg-[#121214]'
                            }`}
                          >
                            <td className="p-4 font-bold text-white">
                              {cliente.nombre}
                            </td>
                            <td className="p-4 text-gray-300">
                              {cliente.edad} años
                            </td>
                            <td className="p-4">
                              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#18181B] text-gray-200 border border-[#27272a]">
                                <MapPin className="w-3 h-3 text-[#00FF88]" />
                                {cliente.barrio}
                              </span>
                            </td>
                            <td className="p-4 font-semibold text-[#00FF88]">
                              {cliente.posicion}
                            </td>
                            <td className="p-4 text-gray-300 font-mono text-xs">
                              {cliente.whatsapp}
                            </td>
                            <td className="p-4 text-xs font-medium text-gray-300">
                              {cliente.plan}
                            </td>
                            <td className="p-4">
                              <button
                                onClick={(e) => handleToggleEstado(cliente, e)}
                                className={`text-[11px] font-extrabold uppercase px-3 py-1 rounded-full border transition-all ${
                                  cliente.estado === 'Activo'
                                    ? 'bg-[#00FF88]/20 text-[#00FF88] border-[#00FF88]/40 hover:bg-[#00FF88]/30'
                                    : 'bg-red-950/30 text-red-400 border-red-800/40 hover:bg-red-950/50'
                                }`}
                                title="Clic para alternar Activo/Inactivo"
                              >
                                {cliente.estado}
                              </button>
                            </td>
                            <td className="p-4 text-center">
                              <button
                                onClick={() => handleSelectCliente(cliente)}
                                className="inline-flex items-center gap-1 text-xs font-bold text-[#00FF88] hover:text-white bg-[#18181B] hover:bg-[#27272a] px-3 py-1.5 rounded-lg border border-[#27272a] transition-all"
                              >
                                <span>Ver Escuelas</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'escuelas' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {escuelas.map((esc) => (
              <div key={esc._id} className="p-6 rounded-2xl bg-[#09090b] border border-[#222226] hover:border-[#00FF88]/40 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-display font-bold text-lg text-white">
                    {esc.nombre}
                  </h3>
                  <span className="text-xs font-black uppercase text-black bg-[#00FF88] px-2 py-0.5 rounded">
                    {esc.barrio}
                  </span>
                </div>
                <div className="space-y-2 text-xs text-gray-300 mt-4">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#00FF88]" />
                    <span>{esc.direccion}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#00FF88]" />
                    <span>{esc.horarios}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#00FF88]" />
                    <span>{esc.telefono}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Slide-over Side Panel (Panel Lateral de Cruce Cliente-Escuela) */}
      {selectedCliente && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-[#0c0c0e] border-l border-[#222226] shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
          <div>
            {/* Close Button */}
            <div className="flex items-center justify-between pb-4 border-b border-[#222226] mb-6">
              <span className="text-xs font-black uppercase tracking-widest text-[#00FF88]">
                Lógica de Cruce Cliente - Escuela
              </span>
              <button
                onClick={() => setSelectedCliente(null)}
                className="p-1.5 rounded-lg bg-[#18181B] text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selected Client Card */}
            <div className="p-5 rounded-2xl bg-[#121214] border border-[#27272a] mb-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-xl text-white">
                  {selectedCliente.nombre}
                </h3>
                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                  selectedCliente.estado === 'Activo' ? 'bg-[#00FF88]/20 text-[#00FF88]' : 'bg-red-950 text-red-300'
                }`}>
                  {selectedCliente.estado}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 text-xs text-gray-300">
                <div>
                  <span className="text-gray-500 block">Edad:</span>
                  <span className="font-semibold text-white">{selectedCliente.edad} años</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Posición:</span>
                  <span className="font-semibold text-[#00FF88]">{selectedCliente.posicion}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Barrio:</span>
                  <span className="font-semibold text-white flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#00FF88]" />
                    {selectedCliente.barrio}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">Plan:</span>
                  <span className="font-semibold text-white">{selectedCliente.plan}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500 block">WhatsApp:</span>
                  <span className="font-mono text-white">{selectedCliente.whatsapp}</span>
                </div>
              </div>
            </div>

            {/* Matched Schools Section */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-4 flex items-center justify-between">
                <span>Escuelas en {selectedCliente.barrio}</span>
                <span className="text-[#00FF88]">{sidePanelEscuelas.length} encontrada(s)</span>
              </h4>

              {sidePanelLoading ? (
                <div className="py-12 text-center text-gray-400 text-xs">
                  Consultando escuelas en {selectedCliente.barrio}...
                </div>
              ) : sidePanelEscuelas.length === 0 ? (
                <div className="p-6 rounded-2xl bg-[#121214] border border-[#27272a] text-center text-xs text-gray-400">
                  No hay escuelas registradas con el barrio <strong>{selectedCliente.barrio}</strong>.
                </div>
              ) : (
                <div className="space-y-3">
                  {sidePanelEscuelas.map(esc => (
                    <div key={esc._id} className="p-4 rounded-xl bg-[#121214] border border-[#27272a]">
                      <h5 className="font-bold text-white text-sm">
                        {esc.nombre}
                      </h5>
                      <div className="mt-2 space-y-1.5 text-xs text-gray-300">
                        <p className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#00FF88]" />
                          <span>{esc.direccion}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-[#00FF88]" />
                          <span>{esc.horarios}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-[#00FF88]" />
                          <span>{esc.telefono}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-[#222226]">
            <button
              onClick={() => setSelectedCliente(null)}
              className="w-full py-3 rounded-xl bg-[#18181B] hover:bg-[#27272a] text-white font-bold text-xs uppercase tracking-wider"
            >
              Cerrar Panel Lateral
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
