// routes/patients.js

const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientcontroller');
const authMiddleware = require('../middleware/authMiddleware');

// ✅ Rutas públicas (cualquier usuario puede acceder sin autenticación)
router.get('/', patientController.listPatients); // Listar pacientes
router.get('/:id', patientController.getPatientById); // Ver un paciente por ID

// 🔒 Rutas protegidas (requieren autenticación)
router.post('/', authMiddleware, patientController.createPatient); // Crear paciente
router.put('/:id', authMiddleware, patientController.updatePatient); // Actualizar paciente
router.delete('/:id', authMiddleware, patientController.deletePatient); // Eliminar paciente

module.exports = router;
