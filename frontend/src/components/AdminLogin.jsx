import React, { useState } from 'react';
import { Lock, User, ShieldAlert, ArrowLeft, Loader2 } from 'lucide-react';
import { api } from '../services/api';

export default function AdminLogin({ onLoginSuccess, onCancel }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('ghost2024');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.adminLogin(username, password);
      if (res && res.success) {
        onLoginSuccess(res.user);
      }
    } catch (err) {
      setError(err.message || 'Credenciales no autorizadas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-md bg-[#121214] border border-[#222226] rounded-3xl p-8 shadow-2xl relative">
        
        {/* Back button */}
        <button
          onClick={onCancel}
          className="absolute top-6 left-6 text-gray-400 hover:text-white p-2 rounded-xl hover:bg-[#18181B] transition-colors"
          title="Regresar"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center mt-6 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#00FF88]/10 border border-[#00FF88]/30 flex items-center justify-center mx-auto mb-4 text-[#00FF88]">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-display font-black text-white uppercase tracking-wider">
            Panel Administrativo
          </h2>
          <p className="text-xs text-[#A1A1AA] mt-1 font-medium">
            Acceso exclusivo para docentes y evaluadores del proyecto
          </p>
          <div className="mt-3 inline-block px-3 py-1 rounded-full bg-[#18181B] border border-[#27272a] text-[11px] text-[#00FF88]">
            Credenciales: <strong className="text-white">admin / ghost2024</strong>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-800 text-red-200 text-xs flex items-center gap-2.5">
            <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Usuario
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-[#18181B] border border-[#27272a] rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF88] text-sm"
              />
              <User className="w-5 h-5 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#18181B] border border-[#27272a] rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF88] text-sm"
              />
              <Lock className="w-5 h-5 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00FF88] hover:bg-[#00cc6a] text-black font-extrabold text-sm py-4 rounded-xl shadow-neon transition-all duration-300 flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <span>Ingresar al Sistema</span>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
