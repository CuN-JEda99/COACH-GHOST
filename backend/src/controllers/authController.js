const jwt = require('jsonwebtoken');

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'ghost2024';
const JWT_SECRET = process.env.JWT_SECRET || 'coach_ghost_super_secret_jwt_key_2026';

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Por favor ingresa usuario y contraseña'
      });
    }

    if (username !== ADMIN_USER || password !== ADMIN_PASS) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas. Acceso denegado.'
      });
    }

    const token = jwt.sign(
      { username: ADMIN_USER, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.status(200).json({
      success: true,
      message: 'Autenticación exitosa',
      token,
      user: {
        username: ADMIN_USER,
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor en autenticación'
    });
  }
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token de acceso no proporcionado. Inicia sesión.'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: 'Token inválido o expirado. Vuelve a iniciar sesión.'
    });
  }
};

module.exports = { login, verifyToken };
