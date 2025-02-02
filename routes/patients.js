// routes/patients.js

const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientcontroller');
const authMiddleware = require('../middleware/authMiddleware');

// Endpoints públicos: Se pueden ver los datos de los pacientes sin necesidad de iniciar sesión
router.get('/', patientController.listPatients);
router.get('/:id', patientController.getPatientById);

// Endpoints protegidos: Para crear, actualizar o eliminar un paciente se requiere autenticación
router.post('/', authMiddleware, patientController.createPatient);
router.put('/:id', authMiddleware, patientController.updatePatient);
router.delete('/:id', authMiddleware, patientController.deletePatient);

module.exports = router;
