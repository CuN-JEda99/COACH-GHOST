# DOCUMENTO TÉCNICO OFICIAL - PROYECTO COACH GHOST
### Programa Jóvenes Creativos • Entrega Final de Software

---

## 1. Ficha Técnica del Proyecto

- **Nombre del Proyecto:** COACH GHOST - Entrenador Fantasma con IA
- **Integrantes Oficiales:** 
  - Jostin Daza
  - Angel Cruz
- **Fecha de Entrega:** 11 de Septiembre de 2026 (11/09/2026)
- **Repositorio Oficial:** [https://github.com/CuN-JEda99/COACH-GHOST-](https://github.com/CuN-JEda99/COACH-GHOST-)
- **Despliegue Frontend:** GitHub Pages
- **Despliegue Backend:** Render
- **Base de Datos:** MongoDB Atlas (con fallback resiliente para demostración continua)

---

## 2. Resumen Ejecutivo y Propuesta de Valor

**Coach Ghost** es una plataforma digital Full Stack enfocada en el entrenamiento biomecánico y táctico de fútbol base y juvenil. Diseñada bajo una estética deportiva de alto rendimiento inspirada en Nike Training, resuelve la falta de acceso a preparadores físicos profesionales mediante:

1. **Inteligencia Artificial de Valor Real:** No es un chatbot generalista; es un recomendador experto basado en patrones biomecánicos que evalúa la posición en cancha del deportista (Delantero, Defensa, Medio, Arquero) y genera una terna de drills específicos con series, intensidades, tips profesionales y foco táctico.
2. **Conexión Geográfica Inteligente (Match por Barrio):** Al registrar un nuevo jugador en las localidades clave de Bogotá (*Suba, Kennedy, Engativá, Chapinero, Bosa, Usaquén*), el sistema busca instantáneamente en la base de datos y le vincula las escuelas de fútbol asociadas a su mismo barrio.
3. **Panel Administrativo con Seguridad JWT:** Permite a entrenadores y directores de escuelas visualizar la base de clientes, alternar estados de membresía (Activo/Inactivo), ver en tiempo real el cruce lateral de escuelas por barrio y exportar la data en formato CSV estándar.

---

## 3. Arquitectura del Sistema y Stack Tecnológico

```
                          ┌─────────────────────────────┐
                          │   CLIENTE / NAVEGADOR WEB   │
                          │   (Responsive: 640/768/1024)│
                          └──────────────┬──────────────┘
                                         │
                   ┌─────────────────────┴─────────────────────┐
                   ▼                                           ▼
       ┌────────────────────────┐                 ┌────────────────────────┐
       │     LANDING PAGE       │                 │   PANEL ADMIN (/admin) │
       │  - React 18            │                 │  - Autenticación JWT   │
       │  - Tailwind CSS        │                 │  - Cruce de Escuelas   │
       │  - Lucide Icons        │                 │  - Exportador CSV      │
       └───────────┬────────────┘                 └────────────┬───────────┘
                   │                                           │
                   └─────────────────────┬─────────────────────┘
                                         │ HTTPS / REST JSON
                                         ▼
                          ┌─────────────────────────────┐
                          │      BACKEND REST API       │
                          │   - Node.js v20+ / Express  │
                          │   - JWT Auth Middleware     │
                          │   - Controlador de Cruce    │
                          │   - Motor de IA Deportiva   │
                          └──────────────┬──────────────┘
                                         │
                   ┌─────────────────────┴─────────────────────┐
                   ▼                                           ▼
       ┌────────────────────────┐                 ┌────────────────────────┐
       │   COLECCIÓN CLIENTES   │                 │   COLECCIÓN ESCUELAS   │
       │  - Nombre, Edad (14-24)│                 │  - Nombre, Barrio      │
       │  - Barrio, Posición    │                 │  - Dirección, Horarios │
       │  - WhatsApp (10 dígit) │                 │  - Cupos, Teléfono     │
       │  - Plan, Estado        │                 │                        │
       └────────────────────────┘                 └────────────────────────┘
```

### Componentes de Software:
- **Frontend:** React 18, Vite, Tailwind CSS v3, Lucide React. Diseñado bajo la paleta oficial: Negro `#000000`, Verde Neón `#00FF88`, Zinc `#18181B` y Gris `#A1A1AA`.
- **Backend:** Node.js, Express 4, Mongoose / MongoDB Atlas Driver, JSONWebToken, CORS, Dotenv.
- **Base de Datos:** MongoDB NoSQL con colecciones `clientes` y `escuelas`.
- **Control de Versiones:** Git con más de 15 commits estructurados y descriptivos.

---

## 4. Modelo de Datos (NoSQL)

### 4.1 Colección `clientes`
| Campo | Tipo | Validación | Descripción |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId / String | Obligatorio | Identificador único del registro |
| `nombre` | String | Mínimo 3 caracteres | Nombre y apellido del jugador |
| `edad` | Number | 14 a 24 años | Rango de edad juvenil |
| `barrio` | String | Enum (Suba, Kennedy, Engativá, Chapinero, Bosa, Usaquén) | Localidad de Bogotá |
| `posicion` | String | Enum (Delantero, Defensa, Medio, Arquero) | Rol en el terreno de juego |
| `whatsapp` | String | Exactamente 10 dígitos | Contacto telefónico móvil |
| `plan` | String | Enum (Plan Jugador, Plan Escuela, Plan Familiar) | Nivel de suscripción elegido |
| `estado` | String | 'Activo' \| 'Inactivo' | Estado de la suscripción (default: Activo) |
| `fechaRegistro`| Date | Default: Now | Marca de tiempo de inscripción |

### 4.2 Colección `escuelas`
| Campo | Tipo | Ejemplo |
| :--- | :--- | :--- |
| `nombre` | String | "Academia Gol Suba" |
| `barrio` | String | "Suba" |
| `direccion` | String | "Calle 145 # 92 - 30, Rincón de Suba" |
| `horarios` | String | "Lunes a Viernes 3:00 PM - 7:00 PM \| Sábados 8:00 AM - 1:00 PM" |
| `telefono` | String | "3124567890" |
| `cupos` | Number | 30 |

---

## 5. Especificación de Endpoints REST API

### 5.1 `POST /api/contacto`
- **Descripción:** Registra un nuevo deportista en la base de datos y ejecuta la consulta de cruce de escuelas en su mismo barrio.
- **Request Body:**
```json
{
  "nombre": "Santiago Gómez",
  "edad": 18,
  "barrio": "Suba",
  "posicion": "Delantero",
  "whatsapp": "3109876543",
  "plan": "Plan Jugador"
}
```
- **Response `201 Created`:**
```json
{
  "success": true,
  "message": "¡Registro exitoso! Te hemos vinculado con 1 escuela(s) en Suba.",
  "cliente": {
    "_id": "cli_1789173769455",
    "nombre": "Santiago Gómez",
    "edad": 18,
    "barrio": "Suba",
    "posicion": "Delantero",
    "whatsapp": "3109876543",
    "plan": "Plan Jugador",
    "estado": "Activo",
    "fechaRegistro": "2026-09-12T00:42:49.455Z"
  },
  "escuelasCercanas": [
    {
      "_id": "esc_01",
      "nombre": "Academia Gol Suba",
      "barrio": "Suba",
      "direccion": "Calle 145 # 92 - 30, Rincón de Suba",
      "horarios": "Lunes a Viernes 3:00 PM - 7:00 PM",
      "telefono": "3124567890",
      "cupos": 30
    }
  ]
}
```

### 5.2 `GET /api/clientes`
- **Descripción:** Obtiene la lista completa de clientes registrados, con soporte para filtros por query (`?barrio=Suba&posicion=Delantero&estado=Activo`).
- **Response `200 OK`:**
```json
{
  "success": true,
  "total": 6,
  "clientes": [ ... ]
}
```

### 5.3 `POST /api/admin/login`
- **Descripción:** Valida las credenciales administrativas fijas para la defensa (`admin` / `ghost2024`) y genera el token JWT.
- **Request Body:**
```json
{
  "username": "admin",
  "password": "ghost2024"
}
```
- **Response `200 OK`:**
```json
{
  "success": true,
  "message": "Autenticación exitosa",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "username": "admin",
    "role": "admin"
  }
}
```

### 5.4 `POST /api/ia/recomendar`
- **Descripción:** Motor biomecánico que genera una prescripción táctica de 3 ejercicios de alto nivel de acuerdo a la posición ingresada.
- **Request Body:**
```json
{
  "posicion": "Delantero",
  "edad": 17,
  "nivel": "Competitivo"
}
```
- **Response `200 OK`:**
```json
{
  "success": true,
  "message": "Plan inteligente generado por Coach Ghost IA para Delantero",
  "data": {
    "posicion": "Delantero",
    "enfoque": "Definición, Desmarque y Golpeo de Alta Precisión",
    "ejercicios": [
      {
        "id": "del-1",
        "titulo": "Definición al Primer Toque en Carrera Diagonal",
        "categoria": "Definición",
        "intensidad": "Alta (85% FCM)",
        "repeticiones": "4 series x 8 repeticiones (descanso 45s)",
        "descripcion": "Recepción de pase filtrado en ruptura; perfila el cuerpo a 45° antes de entrar al área...",
        "claveTecnica": "Fijar el pie de apoyo a 15 cm del balón apuntando al poste seleccionado...",
        "material": "4 conos, 1 arco, 6 balones"
      },
      { "id": "del-2", "titulo": "1v1 con Recorte Explosivo y Disparo Rápido", ... },
      { "id": "del-3", "titulo": "Control Orientado y Volea Bajo Presión Simulada", ... }
    ]
  }
}
```

---

## 6. Catálogo de Suscripciones y Precios Reales

1. **Plan Jugador ($15.000 COP / mes):**
   - 1 usuario individual.
   - Acceso móvil al recomendador y tracking de drills.
   - Conexión con escuelas de su barrio.

2. **Plan Escuela ($84.900 COP / mes) - [DESTACADO]:**
   - Panel especializado para directores técnicos y preparadores.
   - *"Ve el progreso de todos tus alumnos en un solo panel"*.
   - Gestión masiva de hasta 30 deportistas con analítica grupal y exportación de reportes.

3. **Plan Familiar ($109.900 COP / mes):**
   - Hasta 5 usuarios simultáneos.
   - Búsqueda geolocalizada en Bogotá por barrio.
   - Asesoría técnica prioritaria vía WhatsApp.

*(Nota de evolución: Se contemplan además planes complementarios FREE / PRO $19.900 / ELITE $39.900 para ampliaciones comerciales del ecosistema).*

---

## 7. Panel Administrativo y Lógica de Cruce

Accesible vía botón en Navbar o mediante la ruta `/admin`.
- **Credenciales:** `admin` / `ghost2024`.
- **Lógica de Cruce Cliente-Escuela:** Al hacer clic en cualquier fila de la tabla de clientes, se activa un panel lateral corredizo (*slide-over*) que realiza la consulta de escuelas cuyo atributo `barrio` sea exactamente igual al del cliente seleccionado.
- **Cambio de Estado:** Botón interactivo en cada fila que conmuta entre `Activo` e `Inactivo` persistiendo en backend vía `PATCH /api/clientes/:id/estado`.
- **Exportación CSV:** Generador en navegador que descarga un archivo `clientes_coach_ghost_YYYY-MM-DD.csv` con cabeceras y codificación UTF-8 con BOM para visualización correcta en Microsoft Excel.

---

## 8. Guía de Despliegue en Producción

### Despliegue Frontend en GitHub Pages
1. Subir el código al repositorio `https://github.com/CuN-JEda99/COACH-GHOST-`.
2. En GitHub: ir a **Settings** -> **Pages**.
3. En **Build and deployment**:
   - Opción A (Recomendada): Source: **GitHub Actions** (usará `.github/workflows/deploy.yml` automáticamente).
   - Opción B: Source: **Deploy from a branch**, Branch: `main` / Folder: `/docs`.

### Despliegue Backend en Render
1. En el panel de Render, hacer clic en **New +** -> **Web Service**.
2. Conectar el repositorio `COACH-GHOST-`.
3. Configurar:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Variables de Entorno:
   - `PORT`: `5000`
   - `ADMIN_USER`: `admin`
   - `ADMIN_PASS`: `ghost2024`
   - `JWT_SECRET`: `tu_clave_secreta_aqui`
   - `MONGODB_URI`: Cadena de conexión de MongoDB Atlas (si se omite, el servidor activa su motor de alta disponibilidad en memoria automáticamente).

---

*Firmado y validado:*  
**Jostin Daza & Angel Cruz**  
Bogotá D.C. — 11 de Septiembre de 2026
