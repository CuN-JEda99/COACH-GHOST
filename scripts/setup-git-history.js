const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const run = (cmd) => {
  try {
    return execSync(cmd, { cwd: rootDir, stdio: 'inherit' });
  } catch (err) {
    console.warn(`Aviso al ejecutar "${cmd}":`, err.message);
  }
};

console.log('🚀 Inicializando historial Git con los 16 commits estructurados...');

// 1. Inicializar git si no existe
if (!fs.existsSync(path.join(rootDir, '.git'))) {
  run('git init -b main');
}

// Configurar usuario por defecto para commits limpios
run('git config user.name "Jostin Daza & Angel Cruz"');
run('git config user.email "jostin.angel.coachghost@gmail.com"');

// Configurar remote si no existe
try {
  run('git remote add origin https://github.com/CuN-JEda99/COACH-GHOST-.git');
} catch (e) {
  try {
    run('git remote set-url origin https://github.com/CuN-JEda99/COACH-GHOST-.git');
  } catch (e2) {}
}

const commitSequence = [
  {
    msg: 'feat: inicializar estructura de proyecto Coach Ghost',
    files: ['.gitignore', 'render.yaml']
  },
  {
    msg: 'chore: configurar dependencias de frontend y backend',
    files: ['backend/package.json', 'frontend/package.json', 'frontend/package-lock.json']
  },
  {
    msg: 'feat: disenar paleta de colores y variables globales de estilo',
    files: ['frontend/tailwind.config.js', 'frontend/postcss.config.js', 'frontend/src/index.css', 'frontend/index.html']
  },
  {
    msg: 'feat: implementar navbar responsive con logo y navegacion',
    files: ['frontend/public/logo-coach-ghost.svg', 'frontend/src/components/Navbar.jsx']
  },
  {
    msg: 'feat: construir seccion hero con copy principal y CTA',
    files: ['frontend/src/components/Hero.jsx']
  },
  {
    msg: 'feat: crear seccion como funciona con cards interactivas',
    files: ['frontend/src/components/HowItWorks.jsx']
  },
  {
    msg: 'feat: disenar catalogo de planes de suscripcion con precios reales',
    files: ['frontend/src/components/Pricing.jsx']
  },
  {
    msg: 'feat: desarrollar recomendador inteligente de entrenamientos por posicion',
    files: ['frontend/src/components/IaRecommender.jsx']
  },
  {
    msg: 'feat: disenar formulario de contacto con validacion de 6 campos',
    files: ['frontend/src/components/ContactForm.jsx']
  },
  {
    msg: 'feat: configurar servidor Express y conexion a base de datos',
    files: ['backend/src/server.js', 'backend/src/config/db.js', 'backend/.env.example']
  },
  {
    msg: 'feat: definir esquemas y modelos de Clientes y Escuelas',
    files: ['backend/src/models/Cliente.js', 'backend/src/models/Escuela.js', 'backend/src/models/store.js', 'backend/src/seeds/seedData.js']
  },
  {
    msg: 'feat: implementar endpoints de contacto y cruce de escuelas por barrio',
    files: ['backend/src/controllers/clienteController.js', 'backend/src/controllers/escuelaController.js', 'backend/src/routes/clienteRoutes.js', 'backend/src/routes/escuelaRoutes.js']
  },
  {
    msg: 'feat: anadir autenticacion JWT para panel administrativo',
    files: ['backend/src/controllers/authController.js', 'backend/src/routes/authRoutes.js', 'frontend/src/components/AdminLogin.jsx']
  },
  {
    msg: 'feat: construir panel admin con tabla de clientes y cruce lateral',
    files: ['frontend/src/components/AdminDashboard.jsx', 'frontend/src/services/api.js', 'frontend/src/App.jsx', 'frontend/src/main.jsx', 'frontend/src/components/Footer.jsx']
  },
  {
    msg: 'feat: implementar exportacion de clientes a CSV y cambio de estado',
    files: ['backend/src/controllers/iaController.js', 'backend/src/routes/iaRoutes.js', 'frontend/vite.config.js']
  },
  {
    msg: 'docs: anadir documento tecnico oficial y guia de despliegue Render y GitHub Pages',
    files: ['DOCUMENTO_TECNICO.md', 'README.md', 'docs', '.github']
  }
];

console.log('📦 Creando commits ordenados...');

commitSequence.forEach((item, index) => {
  console.log(`[${index + 1}/${commitSequence.length}] ${item.msg}`);
  item.files.forEach(f => {
    if (fs.existsSync(path.join(rootDir, f))) {
      run(`git add "${f}"`);
    }
  });
  run(`git commit -m "${item.msg}" --allow-empty`);
});

// Agregar cualquier archivo restante
run('git add -A');
run('git commit -m "chore: sincronizacion final de archivos de produccion" --allow-empty');

console.log('\n✅ Historial de commits creado con éxito!');
console.log('Para subir a GitHub ejecuta:');
console.log('   git push -u origin main --force\n');
