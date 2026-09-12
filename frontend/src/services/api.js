// Configuración inteligente de la URL base de la API
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('coach_ghost_api_url');
    if (saved && saved.trim()) return saved.trim().replace(/\/$/, '');
  }
  if (import.meta.env && import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, '');
  }
  // En HTTPS (GitHub Pages), evitar Mixed Content si no hay backend HTTPS explícito
  if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
    return '';
  }
  return 'http://localhost:5000';
};

const getHeaders = (includeAuth = false) => {
  const headers = { 'Content-Type': 'application/json' };
  if (includeAuth && typeof window !== 'undefined') {
    const token = localStorage.getItem('coach_ghost_token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// ============================================================================
// MOTOR DE ALTA DISPONIBILIDAD (FALLBACK LOCAL EN CLIENTE)
// Garantiza que la aplicación funcione al 100% en GitHub Pages incluso si el
// backend de Render está en suspensión (cold start) o sin conexión local.
// ============================================================================
const ESCUELAS_DATA = [
  {
    _id: 'esc_suba_01',
    nombre: 'Academia Gol Suba',
    barrio: 'Suba',
    direccion: 'Calle 145 # 92 - 30, Rincón de Suba',
    horarios: 'Lunes a Viernes 3:00 PM - 7:00 PM | Sábados 8:00 AM - 1:00 PM',
    telefono: '3124567890',
    cupos: 30
  },
  {
    _id: 'esc_kennedy_01',
    nombre: 'Futuras Estrellas Kennedy',
    barrio: 'Kennedy',
    direccion: 'Av. Primero de Mayo # 71D - 20, Canchas Timiza',
    horarios: 'Martes, Jueves y Sábados 7:00 AM - 12:00 PM',
    telefono: '3157891234',
    cupos: 25
  },
  {
    _id: 'esc_engativa_01',
    nombre: 'Titanes El Salitre Engativá',
    barrio: 'Engativá',
    direccion: 'Calle 64 # 111A - 15, Parque Álamos Norte',
    horarios: 'Lunes, Miércoles y Viernes 4:00 PM - 8:00 PM',
    telefono: '3209876543',
    cupos: 20
  },
  {
    _id: 'esc_chapinero_01',
    nombre: 'Club Semillero Chapinero',
    barrio: 'Chapinero',
    direccion: 'Carrera 7 # 58 - 42, Polideportivo Chapinero',
    horarios: 'Martes y Jueves 5:00 PM - 8:30 PM | Sábados 9:00 AM - 2:00 PM',
    telefono: '3183456789',
    cupos: 20
  },
  {
    _id: 'esc_bosa_01',
    nombre: 'Huracanes Bosa FC',
    barrio: 'Bosa',
    direccion: 'Carrera 80J # 65 Sur - 12, Cancha Bosa Centro',
    horarios: 'Miércoles y Viernes 3:30 PM - 7:00 PM | Domingos 8:00 AM - 1:00 PM',
    telefono: '3112233445',
    cupos: 28
  },
  {
    _id: 'esc_usaquen_01',
    nombre: 'Usaquén Elite Soccer',
    barrio: 'Usaquén',
    direccion: 'Calle 165 # 8G - 40, Canchas San Cristóbal Norte',
    horarios: 'Lunes a Jueves 4:00 PM - 7:30 PM | Sábados 8:00 AM - 12:00 PM',
    telefono: '3198765432',
    cupos: 22
  }
];

const CLIENTES_INICIALES = [
  {
    _id: 'cli_01_suba',
    nombre: 'Santiago Gómez Rodríguez',
    edad: 17,
    barrio: 'Suba',
    posicion: 'Delantero',
    whatsapp: '3109876543',
    plan: 'Plan Jugador',
    estado: 'Activo',
    fechaRegistro: new Date(Date.now() - 3600000 * 24 * 3).toISOString()
  },
  {
    _id: 'cli_02_kennedy',
    nombre: 'Mateo Hernández Ruiz',
    edad: 19,
    barrio: 'Kennedy',
    posicion: 'Medio',
    whatsapp: '3201234567',
    plan: 'Plan Escuela',
    estado: 'Activo',
    fechaRegistro: new Date(Date.now() - 3600000 * 24 * 2).toISOString()
  },
  {
    _id: 'cli_03_engativa',
    nombre: 'Nicolás Peña Silva',
    edad: 16,
    barrio: 'Engativá',
    posicion: 'Defensa',
    whatsapp: '3156789012',
    plan: 'Plan Familiar',
    estado: 'Activo',
    fechaRegistro: new Date(Date.now() - 3600000 * 24 * 1).toISOString()
  },
  {
    _id: 'cli_04_chapinero',
    nombre: 'David Leonardo Castro',
    edad: 21,
    barrio: 'Chapinero',
    posicion: 'Arquero',
    whatsapp: '3187654321',
    plan: 'Plan Jugador',
    estado: 'Activo',
    fechaRegistro: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    _id: 'cli_05_suba',
    nombre: 'Sebastián Mora Morales',
    edad: 18,
    barrio: 'Suba',
    posicion: 'Delantero',
    whatsapp: '3143210987',
    plan: 'Plan Escuela',
    estado: 'Inactivo',
    fechaRegistro: new Date(Date.now() - 3600000 * 4).toISOString()
  }
];

const IA_CATALOGO = {
  Delantero: {
    enfoque: 'Definición, Desmarque y Golpeo de Alta Precisión',
    descripcionIA: 'Plan biomecánico enfocado en optimizar el tiempo de reacción en el área rival, orientación corporal ante el arquero y finalización al primer toque.',
    ejercicios: [
      {
        id: 'del-1',
        titulo: 'Definición al Primer Toque en Carrera Diagonal',
        categoria: 'Definición',
        intensidad: 'Alta (85% FCM)',
        repeticiones: '4 series x 8 repeticiones (descanso 45s)',
        descripcion: 'Recepción de pase filtrado en ruptura; perfila el cuerpo a 45° antes de entrar al área y define al poste lejano usando el empeine interior sin controlar el balón.',
        claveTecnica: 'Fijar el pie de apoyo a 15 cm del balón apuntando hacia el poste seleccionado; no desacelerar la carrera previa.',
        material: '4 conos, 1 arco con arquero/conos en esquinas, 6 balones'
      },
      {
        id: 'del-2',
        titulo: '1v1 con Recorte Explosivo y Disparo Rápido',
        categoria: 'Definición en Espacio Reducido',
        intensidad: 'Máxima (Sprint corto)',
        repeticiones: '5 series x 6 duelos (descanso 60s)',
        descripcion: 'Enfrenta al maniquí/defensa a velocidad media, amaga con el hombro derecho y realiza un recorte interior seco con la zurda para sacar el tiro antes de que el arquero achique el ángulo.',
        claveTecnica: 'Bajar el centro de gravedad en el cambio de dirección; armado del tiro ultra-corto para evitar bloqueos defensivos.',
        material: 'Maniquí o estaca defensiva, 8 balones'
      },
      {
        id: 'del-3',
        titulo: 'Control Orientado y Volea Bajo Presión Simulada',
        categoria: 'Finalización Aérea',
        intensidad: 'Media-Alta',
        repeticiones: '4 series x 10 balones aéreos',
        descripcion: 'Balón cruzado desde la banda a media altura. Amortigua con el pecho orientado hacia la portería y conecta volea cruzada de sobrepique antes del segundo bote.',
        claveTecnica: 'Bloqueo del tobillo al impacto; inclinar el tronco hacia adelante para evitar que el disparo se eleve por encima del travesaño.',
        material: 'Centro desde banda o lanzador automático, balones'
      }
    ]
  },
  Defensa: {
    enfoque: 'Perfilamiento, Cierre y Retardo Táctico',
    descripcionIA: 'Algoritmo defensivo orientado a la postura biomecánica de anticipación, timing de barrida limpia y corte de líneas de pase progresivas.',
    ejercicios: [
      {
        id: 'def-1',
        titulo: 'Cierre Diagonal y Retardo en 1v1',
        categoria: 'Perfilamiento y Cierre',
        intensidad: 'Media-Alta',
        repeticiones: '5 series x 5 repeticiones por perfil (izq/der)',
        descripcion: 'Acompaña el sprint del atacante perfilado a 45° hacia la línea de banda, forzándolo a utilizar su pierna menos hábil sin tirarse al piso antes de tiempo.',
        claveTecnica: 'Nunca quedar frontal al atacante; mantener rodillas semiflexionadas y brazos abiertos para equilibrio y anticipación.',
        material: 'Pasillo delimitado con conos de 20x10 metros'
      },
      {
        id: 'def-2',
        titulo: 'Anticipación de Espaldas y Despeje Orientado',
        categoria: 'Interceptación Aérea y Terrestre',
        intensidad: 'Alta (Fuerza explosiva)',
        repeticiones: '4 series x 6 saltos con impacto',
        descripcion: 'Colocado por detrás del delantero imaginario; lee la trayectoria del pase raso o aéreo, mete el cuerpo con la cadera por delante y despeja hacia las bandas.',
        claveTecnica: 'Contacto legal de hombro para ganar la posición; despeje con la superficie del empeine hacia zona de seguridad (laterales).',
        material: 'Balones aéreos servidos desde 30 metros, estacas'
      },
      {
        id: 'def-3',
        titulo: 'Cobertura Escalonada y Corte de Línea de Pase',
        categoria: 'Táctica Individual de Cierre',
        intensidad: 'Media',
        repeticiones: '4 series x 8 transiciones rápidas',
        descripcion: 'Desplazamiento lateral rápido entre dos conos; al escuchar la señal sonora, realiza un sprint reactivo de 5 metros para bloquear el remate o centro.',
        claveTecnica: 'Puntas de los pies activas, reacción visual-auditiva instantánea sin cruzar los pies durante el desplazamiento lateral.',
        material: '4 conos en rombo, cronómetro reactivo'
      }
    ]
  },
  Medio: {
    enfoque: 'Visión Periférica, Control Orientado y Distribución',
    descripcionIA: 'Modelo táctico para mediocampistas enfocado en escaneo visual previo (head-check), desahogo bajo presión intensa y pases filtrados progresivos.',
    ejercicios: [
      {
        id: 'med-1',
        titulo: 'Giro Periférico con Doble Escaneo Visual (Head-Check)',
        categoria: 'Visión y Distribución',
        intensidad: 'Alta (Cognitivo + Motor)',
        repeticiones: '4 series x 10 pases con cambio de frente',
        descripcion: 'Antes de recibir el balón del central, gira la cabeza 2 veces hacia los lados; recibe con la pierna más alejada y filtra a un compañero en movimiento.',
        claveTecnica: 'Información previa: mirar 360° antes del contacto para ejecutar la entrega en máximo dos toques.',
        material: 'Conos numerados o con colores para estímulo visual'
      },
      {
        id: 'med-2',
        titulo: 'Cambio de Orientación con Control Orientado',
        categoria: 'Transición y Amplitud',
        intensidad: 'Media-Alta',
        repeticiones: '5 series x 6 lanzamientos largos precisos',
        descripcion: 'Controla balón que viene del lateral izquierdo y en un solo toque orienta la trayectoria hacia el carril opuesto para meter un pase largo de 35 metros.',
        claveTecnica: 'Golpeo con empeine exterior para dar curva de seguridad al balón lejos del alcance de la zaga rival.',
        material: '2 receptores en bandas opuestas, balones'
      },
      {
        id: 'med-3',
        titulo: 'Presión Tras Pérdida y Pase de Seguridad',
        categoria: 'Intensidad Táctica',
        intensidad: 'Máxima en intervalos de 6 segundos',
        repeticiones: '6 series x 3 repeticiones (descanso 90s)',
        descripcion: 'Pierde deliberadamente la posesión en 3/4 de cancha; asfixia al portador en los primeros 4 segundos y entrega de inmediato al volante de marca libre.',
        claveTecnica: 'Cerrar el ángulo de pase más peligroso mientras se acorta la distancia física con el rival.',
        material: 'Cuadrado de 15x15m, 4 jugadores o estacas'
      }
    ]
  },
  Arquero: {
    enfoque: 'Reflejos, Posicionamiento y Seguridad Aérea',
    descripcionIA: 'Sistema de reflejos y biomecánica bajo los tres palos: reducción de bisectriz en mano a mano, blocaje seguro y respuesta pliométrica en corto.',
    ejercicios: [
      {
        id: 'arq-1',
        titulo: 'Reacción a Doble Remate a Quemarropa',
        categoria: 'Reflejos Puros',
        intensidad: 'Máxima reactividad',
        repeticiones: '5 series x 6 secuencias de 2 disparos',
        descripcion: 'El entrenador dispara desde 7 metros a un poste; el arquero ataja o desvía y debe incorporarse en menos de 1 segundo para atajar el contra-remate.',
        claveTecnica: 'Empuje pliométrico con la pierna del suelo; manos en forma de "W" o "Copa" para retener o desviar fuera de zona de peligro.',
        material: 'Arco reglamentario, 12 balones, tablero de rebote'
      },
      {
        id: 'arq-2',
        titulo: 'Achique y Cruz en Mano a Mano',
        categoria: 'Posicionamiento y Bisectriz',
        intensidad: 'Alta (Fuerza excéntrica)',
        repeticiones: '4 series x 6 salidas frente a delantero',
        descripcion: 'Delantero entra en diagonal; el arquero avanza reduciendo el ángulo geométrico y adopta la postura de cruz cubriendo el piso y la media altura.',
        claveTecnica: 'No caerse antes del contacto del delantero; aguantar erguido hasta el último instante para provocar el error en la definición.',
        material: 'Balones, conos de guía de bisectriz'
      },
      {
        id: 'arq-3',
        titulo: 'Salida Aérea con Bloqueo en Balón Dividido',
        categoria: 'Seguridad en Pelota Quieta',
        intensidad: 'Media-Alta (Salto vertical)',
        repeticiones: '4 series x 8 centros laterales',
        descripcion: 'Centro con efecto cerrado desde el tiro de esquina. El arquero calcula el vértice parabólico, ataca el balón en el punto más alto con rodilla arriba como escudo protector.',
        claveTecnica: 'Voz de mando fuerte ("¡MÍA!"), contacto con dos manos en el punto más alto del salto antes de tocar el suelo.',
        material: 'Centrador desde el córner, muñeco de choque'
      }
    ]
  }
};

const getLocalClientes = () => {
  try {
    const raw = localStorage.getItem('coach_ghost_local_clientes');
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return CLIENTES_INICIALES;
};

const saveLocalClientes = (clientes) => {
  try {
    localStorage.setItem('coach_ghost_local_clientes', JSON.stringify(clientes));
  } catch (e) {}
};

// ============================================================================
// SERVICIO API PRINCIPAL
// ============================================================================
export const api = {
  getBaseUrl,

  // 1. Registro de contacto con retorno de escuelas cercanas
  async registrarContacto(datos) {
    const baseUrl = getBaseUrl();
    if (baseUrl) {
      try {
        const response = await fetch(`${baseUrl}/api/contacto`, {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify(datos)
        });
        const data = await response.json();
        if (response.ok) return data;
      } catch (err) {
        console.warn('Backend no disponible, ejecutando motor local Coach Ghost:', err.message);
      }
    }

    // Fallback local garantizado
    const nuevo = {
      _id: 'cli_' + Date.now(),
      ...datos,
      estado: 'Activo',
      fechaRegistro: new Date().toISOString()
    };
    const lista = getLocalClientes();
    lista.unshift(nuevo);
    saveLocalClientes(lista);

    const escuelasCercanas = ESCUELAS_DATA.filter(e => e.barrio === datos.barrio);

    return {
      success: true,
      message: `¡Registro exitoso! Te hemos vinculado con ${escuelasCercanas.length} escuela(s) en ${datos.barrio}.`,
      cliente: nuevo,
      escuelasCercanas
    };
  },

  // 2. Recomendador IA de entrenamientos por posición
  async recomendarIA(posicion, metadata = {}) {
    const baseUrl = getBaseUrl();
    if (baseUrl) {
      try {
        const response = await fetch(`${baseUrl}/api/ia/recomendar`, {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify({ posicion, ...metadata })
        });
        const data = await response.json();
        if (response.ok) return data;
      } catch (err) {
        console.warn('Backend IA no disponible, ejecutando motor local Coach Ghost:', err.message);
      }
    }

    // Fallback local garantizado
    const cat = IA_CATALOGO[posicion] || IA_CATALOGO['Delantero'];
    return {
      success: true,
      message: `Plan inteligente generado por Coach Ghost IA para ${posicion}`,
      data: {
        id: 'ia_rec_' + Date.now(),
        posicion,
        enfoque: cat.enfoque,
        descripcionIA: cat.descripcionIA,
        ejercicios: cat.ejercicios,
        timestamp: new Date().toISOString()
      }
    };
  },

  // 3. Login de administrador (admin / ghost2024)
  async adminLogin(username, password) {
    const baseUrl = getBaseUrl();
    if (baseUrl) {
      try {
        const response = await fetch(`${baseUrl}/api/admin/login`, {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (response.ok) {
          if (data.token) localStorage.setItem('coach_ghost_token', data.token);
          return data;
        }
      } catch (err) {
        console.warn('Backend Auth no disponible, ejecutando validación local:', err.message);
      }
    }

    // Fallback local garantizado
    if (username === 'admin' && password === 'ghost2024') {
      const mockToken = 'coach_ghost_jwt_admin_token_' + Date.now();
      localStorage.setItem('coach_ghost_token', mockToken);
      return {
        success: true,
        message: 'Autenticación exitosa',
        token: mockToken,
        user: { username: 'admin', role: 'admin' }
      };
    } else {
      throw new Error('Credenciales inválidas. Acceso denegado.');
    }
  },

  // 4. Listar clientes para el panel admin
  async getClientes(filtros = {}) {
    const baseUrl = getBaseUrl();
    if (baseUrl) {
      try {
        const query = new URLSearchParams(filtros).toString();
        const url = `${baseUrl}/api/clientes${query ? '?' + query : ''}`;
        const response = await fetch(url, { headers: getHeaders(true) });
        const data = await response.json();
        if (response.ok) return data;
      } catch (err) {
        console.warn('Backend clientes no disponible, usando almacén local:', err.message);
      }
    }

    // Fallback local garantizado
    let lista = getLocalClientes();
    if (filtros.barrio) lista = lista.filter(c => c.barrio === filtros.barrio);
    if (filtros.posicion) lista = lista.filter(c => c.posicion === filtros.posicion);
    if (filtros.estado) lista = lista.filter(c => c.estado === filtros.estado);

    return {
      success: true,
      total: lista.length,
      clientes: lista
    };
  },

  // 5. Cambiar estado de cliente (Activo / Inactivo)
  async cambiarEstadoCliente(id, estado) {
    const baseUrl = getBaseUrl();
    if (baseUrl) {
      try {
        const response = await fetch(`${baseUrl}/api/clientes/${id}/estado`, {
          method: 'PATCH',
          headers: getHeaders(true),
          body: JSON.stringify({ estado })
        });
        const data = await response.json();
        if (response.ok) return data;
      } catch (err) {}
    }

    // Fallback local garantizado
    const lista = getLocalClientes();
    const idx = lista.findIndex(c => c._id === id);
    if (idx !== -1) {
      lista[idx].estado = estado;
      saveLocalClientes(lista);
      return { success: true, cliente: lista[idx] };
    }
    throw new Error('Cliente no encontrado');
  },

  // 6. Listar escuelas (para catálogo o panel admin)
  async getEscuelas(barrio = '') {
    const baseUrl = getBaseUrl();
    if (baseUrl) {
      try {
        const url = `${baseUrl}/api/escuelas${barrio ? '?barrio=' + encodeURIComponent(barrio) : ''}`;
        const response = await fetch(url, { headers: getHeaders() });
        const data = await response.json();
        if (response.ok) return data;
      } catch (err) {}
    }

    // Fallback local garantizado
    const escuelas = barrio ? ESCUELAS_DATA.filter(e => e.barrio === barrio) : ESCUELAS_DATA;
    return {
      success: true,
      total: escuelas.length,
      escuelas
    };
  }
};
