const express = require('express');
const router = express.Router();
const { recomendarEntrenamiento } = require('../controllers/iaController');

// POST /api/ia/recomendar - Recomendador Inteligente por posición
router.post('/recomendar', recomendarEntrenamiento);

module.exports = router;
