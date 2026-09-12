const express = require('express');
const router = express.Router();
const { obtenerEscuelas, obtenerEscuelaPorId } = require('../controllers/escuelaController');

// GET /api/escuelas - Lista de escuelas (soporta filtro ?barrio=Suba)
router.get('/', obtenerEscuelas);

// GET /api/escuelas/:id - Detalle de escuela
router.get('/:id', obtenerEscuelaPorId);

module.exports = router;
