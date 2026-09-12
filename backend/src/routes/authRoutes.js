const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

// POST /api/admin/login - Autenticación JWT de administrador
router.post('/login', login);

module.exports = router;
