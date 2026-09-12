# ⚽ COACH GHOST - Entrenador Fantasma con IA

> **"Entrena como pro desde tu celular"**  
> *Graba tu jugada, la IA te corrige y compites sin pagar entrenador caro.*

[![React](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Tailwind-00FF88?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-white?style=for-the-badge&logo=node.js&logoColor=black)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-222226?style=for-the-badge&logo=github&logoColor=white)](https://cun-jeda99.github.io/COACH-GHOST-/)

---

## 📋 Información del Proyecto

- **Programa:** Jóvenes Creativos
- **Autores:** Jostin Daza & Angel Cruz
- **Fecha Oficial:** 11 de Septiembre de 2026 (11/09/2026)
- **Repositorio:** [https://github.com/CuN-JEda99/COACH-GHOST-](https://github.com/CuN-JEda99/COACH-GHOST-)
- **Credenciales Admin:** `admin` / `ghost2024`

---

## 🚀 Características Principales

### 1. Landing Page Deportiva Oscura (Inspirada en Nike Training)
- **Paleta Oficial:** Negro `#000000`, Verde Neón `#00FF88`, Zinc `#18181B` y Gris `#A1A1AA`.
- **Navbar:** Logo vectorial SVG con acento neón, enlaces de navegación suave y botón *"Probar Gratis"*.
- **Hero Section:** Mensaje central, badges de métricas en Bogotá (+500 jugadores, 6 localidades conectadas).
- **Cómo Funciona:** Grid de 3 tarjetas interactivas: **Graba** / **Analiza** / **Mejora**.
- **Catálogo de Planes Reales:**
  - *Plan Jugador:* $15.000 COP / mes (1 usuario).
  - *Plan Escuela:* $84.900 COP / mes (**Destacado**, *"Ve el progreso de todos tus alumnos en un solo panel"*).
  - *Plan Familiar:* $109.900 COP / mes (4 o más usuarios, match de escuelas por barrio).
- **Responsive Design:** Optimizado milimétricamente para móviles (640px), tablets (768px) y escritorio (1024px+).

### 2. IA Deportiva - Recomendador Inteligente por Posición
Motor biomecánico que analiza la posición del jugador y devuelve 3 ejercicios tácticos específicos con series, repeticiones, intensidad, material y claves técnicas:
- **Delantero:** 3 ejercicios de definición (primer toque en carrera, 1v1 con recorte, volea de sobrepique).
- **Defensa:** 3 ejercicios de perfilamiento y cierre (retardo en 1v1, anticipación de espaldas, cobertura escalonada).
- **Medio:** 3 ejercicios de visión y distribución (head-check 360°, cambio de orientación, presión tras pérdida).
- **Arquero:** 3 ejercicios de reflejos y posicionamiento (doble remate a quemarropa, achique en cruz, salida aérea en córner).

### 3. Formulario de Contacto Real y Match por Barrio
- 6 campos validados: Nombre, Edad (14-24), Barrio de Bogotá (Suba, Kennedy, Engativá, Chapinero, Bosa, Usaquén), Posición, WhatsApp (10 dígitos) y Plan de interés.
- Al registrar: consume `POST /api/contacto`, almacena en MongoDB y devuelve las escuelas de fútbol activas en su mismo barrio.

### 4. Panel Administrativo Privado (`/admin`)
- Autenticación con JWT (token emitido para `admin` / `ghost2024`).
- Tabla completa de clientes con búsqueda interactiva y filtros por barrio/posición.
- **Lógica de Cruce Cliente-Escuela:** Al hacer clic en un cliente, un panel lateral despliega las escuelas cercanas que coinciden con su barrio.
- Alternancia de estado en tiempo real (Activo / Inactivo).
- Botón **"Exportar a CSV"** para descargar la lista de clientes en formato compatible con Excel.

---

## 🛠️ Estructura del Repositorio

```
COACH-GHOST/
├── backend/
│   ├── src/
│   │   ├── config/db.js           # Conexión MongoDB Atlas + fallback resiliente
│   │   ├── controllers/
│   │   │   ├── authController.js   # Login JWT admin / ghost2024
│   │   │   ├── clienteController.js# Registro, consulta y cambio de estado
│   │   │   ├── escuelaController.js# Consulta de escuelas por barrio
│   │   │   └── iaController.js     # Recomendador deportivo IA
│   │   ├── models/
│   │   │   ├── Cliente.js          # Colección clientes
│   │   │   ├── Escuela.js          # Colección escuelas
│   │   │   └── store.js            # Almacén de alta disponibilidad
│   │   ├── routes/                 # Rutas REST de la API
│   │   ├── seeds/seedData.js       # 6 escuelas de Bogotá + 5 clientes semilla
│   │   └── server.js               # Servidor Express
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/             # Navbar, Hero, HowItWorks, Pricing, IaRecommender, ContactForm, Admin
│   │   ├── services/api.js         # Cliente Axios / Fetch hacia backend
│   │   ├── App.jsx
│   │   ├── index.css               # Estilos Nike Training & Neón #00FF88
│   │   └── main.jsx
│   ├── public/                     # Logo oficial y favicons
│   ├── vite.config.js              # Configuración Vite con base relativa
│   └── package.json
├── docs/                           # Compilación estática para GitHub Pages
├── .github/workflows/deploy.yml    # CI/CD automatizado para GitHub Pages
├── render.yaml                     # Despliegue en Render para el Backend
├── DOCUMENTO_TECNICO.md            # Documento técnico oficial
└── README.md
```

---

## 🚦 Instalación y Ejecución Local

### Prerrequisitos
- Node.js v18+ y npm instalados.

### 1. Iniciar el Backend
```bash
cd backend
npm install
npm start
```
El servidor iniciará en `http://localhost:5000`.

### 2. Iniciar el Frontend
En otra terminal:
```bash
cd frontend
npm install
npm run dev
```
La aplicación abrirá en `http://localhost:3000`.

---

## 🌐 Endpoints REST Principales

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `POST` | `/api/contacto` | Registra cliente y devuelve escuelas del mismo barrio |
| `GET` | `/api/clientes` | Lista todos los clientes registrados |
| `POST` | `/api/admin/login` | Login con credenciales fijas (`admin` / `ghost2024`) |
| `POST` | `/api/ia/recomendar` | Recomendador inteligente por posición deportiva |
| `GET` | `/api/escuelas` | Catálogo de escuelas de Bogotá |
| `PATCH`| `/api/clientes/:id/estado` | Alterna estado Activo / Inactivo |
| `GET` | `/api/health` | Diagnóstico del servidor y conexión a base de datos |

---

## ☁️ Guía de Despliegue

### Frontend en GitHub Pages
El proyecto incluye configuración nativa para desplegarse mediante GitHub Actions (`.github/workflows/deploy.yml`) o a través de la carpeta `docs/`.
1. Ir a **Settings** en tu repositorio de GitHub.
2. Navegar a **Pages**.
3. En **Build and deployment**, seleccionar **GitHub Actions** o la rama `main` con la carpeta `/docs`.

### Backend en Render
1. Crear un **Web Service** en Render conectando el repositorio `https://github.com/CuN-JEda99/COACH-GHOST-`.
2. Especificar:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
3. Configurar variables de entorno: `PORT=5000`, `ADMIN_USER=admin`, `ADMIN_PASS=ghost2024`, `JWT_SECRET=secreto`.

---

© 2026 **COACH GHOST** • Jóvenes Creativos • Jostin Daza & Angel Cruz
