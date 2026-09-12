const express = require('express');
const router = express.Router();
const {
  registrarContacto,
  obtenerClientes,
  cambiarEstadoCliente
} = require('../controllers/clienteController');
const { verifyToken } = require('../controllers/authController');

// POST /api/contacto - Registro de cliente y match con escuelas del barrio
router.post('/contacto', registrarContacto);

// GET /api/clientes - Listar clientes registrados (para admin)
router.get('/clientes', obtenerClientes);

// PATCH /api/clientes/:id/estado - Cambiar estado Activo / Inactivo
router.patch('/clientes/:id/estado', cambiarEstadoCliente);

module.exports = router;
