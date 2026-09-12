// Configuración de la URL base de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getHeaders = (includeAuth = false) => {
  const headers = {
    'Content-Type': 'application/json'
  };
  if (includeAuth) {
    const token = localStorage.getItem('coach_ghost_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

export const api = {
  // 1. Registro de contacto con retorno de escuelas cercanas
  async registrarContacto(datos) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contacto`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(datos)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al procesar registro');
      }
      return data;
    } catch (err) {
      console.error('Error api.registrarContacto:', err);
      throw err;
    }
  },

  // 2. Recomendador IA de entrenamientos por posición
  async recomendarIA(posicion, metadata = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/ia/recomendar`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ posicion, ...metadata })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener recomendación de IA');
      }
      return data;
    } catch (err) {
      console.error('Error api.recomendarIA:', err);
      throw err;
    }
  },

  // 3. Login de administrador (admin / ghost2024)
  async adminLogin(username, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Credenciales incorrectas');
      }
      if (data.token) {
        localStorage.setItem('coach_ghost_token', data.token);
      }
      return data;
    } catch (err) {
      console.error('Error api.adminLogin:', err);
      throw err;
    }
  },

  // 4. Listar clientes para el panel admin
  async getClientes(filtros = {}) {
    try {
      const query = new URLSearchParams(filtros).toString();
      const url = `${API_BASE_URL}/api/clientes${query ? '?' + query : ''}`;
      const response = await fetch(url, {
        headers: getHeaders(true)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener clientes');
      }
      return data;
    } catch (err) {
      console.error('Error api.getClientes:', err);
      throw err;
    }
  },

  // 5. Cambiar estado de cliente (Activo / Inactivo)
  async cambiarEstadoCliente(id, estado) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/clientes/${id}/estado`, {
        method: 'PATCH',
        headers: getHeaders(true),
        body: JSON.stringify({ estado })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al actualizar estado');
      }
      return data;
    } catch (err) {
      console.error('Error api.cambiarEstadoCliente:', err);
      throw err;
    }
  },

  // 6. Listar escuelas (para catálogo o panel admin)
  async getEscuelas(barrio = '') {
    try {
      const url = `${API_BASE_URL}/api/escuelas${barrio ? '?barrio=' + encodeURIComponent(barrio) : ''}`;
      const response = await fetch(url, {
        headers: getHeaders()
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener escuelas');
      }
      return data;
    } catch (err) {
      console.error('Error api.getEscuelas:', err);
      throw err;
    }
  }
};
