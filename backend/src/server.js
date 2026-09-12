require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB, getStatus } = require('./config/db');
const { seedDatabase } = require('./seeds/seedData');

const clienteRoutes = require('./routes/clienteRoutes');
const escuelaRoutes = require('./routes/escuelaRoutes');
const authRoutes = require('./routes/authRoutes');
const iaRoutes = require('./routes/iaRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares globales
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger básico para peticiones
app.use((req, res, next) => {
  const now = new Date().toISOString().split('T')[1].slice(0, 8);
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  next();
});

// Rutas de la API
app.use('/api', clienteRoutes);          // /api/contacto, /api/clientes
app.use('/api/escuelas', escuelaRoutes);  // /api/escuelas
app.use('/api/admin', authRoutes);        // /api/admin/login
app.use('/api/ia', iaRoutes);            // /api/ia/recomendar

// Ruta de diagnóstico / Healthcheck
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    project: 'COACH GHOST - Entrenador Fantasma con IA',
    team: 'Jostin Daza',
    date: '11/09/2026',
    db: getStatus(),
    timestamp: new Date()
  });
});

// Ruta raíz de bienvenida
app.get('/', (req, res) => {
  res.send(`
    <div style="font-family: system-ui, sans-serif; background: #000; color: #fff; min-height: 100vh; padding: 40px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
      <h1 style="color: #00FF88; font-size: 2.5rem; margin-bottom: 10px;">⚡ COACH GHOST API</h1>
      <p style="color: #A1A1AA; font-size: 1.2rem; max-width: 600px; text-align: center;">Servidor Backend en línea para el proyecto Jóvenes Creativos (Jostin Daza - 11/09/2026)</p>
      <div style="background: #18181B; border: 1px solid #27272a; padding: 20px 30px; border-radius: 12px; margin-top: 25px;">
        <p style="margin: 6px 0;"><strong>POST</strong> /api/contacto - Registro de cliente con match de escuelas</p>
        <p style="margin: 6px 0;"><strong>GET</strong> /api/clientes - Consulta de clientes para panel admin</p>
        <p style="margin: 6px 0;"><strong>POST</strong> /api/admin/login - Login con JWT (admin / ghost2024)</p>
        <p style="margin: 6px 0;"><strong>POST</strong> /api/ia/recomendar - Recomendador inteligente por posición</p>
        <p style="margin: 6px 0;"><strong>GET</strong> /api/escuelas - Catálogo de escuelas deportivas en Bogotá</p>
        <p style="margin: 6px 0;"><strong>GET</strong> /api/health - Estado del sistema</p>
      </div>
    </div>
  `);
});

// Manejo de rutas inexistentes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta ${req.originalUrl} no encontrada en Coach Ghost API`
  });
});

// Inicialización del servidor
const startServer = async () => {
  await connectDB();
  await seedDatabase();

  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 COACH GHOST BACKEND ACTIVO`);
    console.log(`📍 Puerto: http://localhost:${PORT}`);
    console.log(`👥 Creadores: Jostin Daza`);
    console.log(`📅 Fecha: 11/09/2026`);
    console.log(`======================================================\n`);
  });
};

startServer();

module.exports = app;
