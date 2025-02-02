// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller.js');

router.post('/login', authController.login);

// Nueva ruta para registrar administradores sin necesidad de autenticación
router.post('/register', authController.register);

module.exports = router;
