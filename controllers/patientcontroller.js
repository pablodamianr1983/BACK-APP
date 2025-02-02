// controllers/patientcontroller.js

const Patient = require('../models/Patient');
const QRCode = require('qrcode');
const { Op } = require('sequelize');

/**
 * Crea un paciente y genera el QR Code basado en la URL del perfil.
 * Se requiere que la variable de entorno BASE_URL esté definida.
 */
exports.createPatient = async (req, res) => {
  const {
    nombre,
    apellido,
    fecha_nacimiento,
    tipo_sangre,
    diagnosticos,
    formas_tratamiento,
    telefono_contacto,
    telefono_emergencia,
    foto_perfil,
  } = req.body;

  // Log de los datos recibidos
  console.log('Datos recibidos para crear paciente:', req.body);

  try {
    // Crear el paciente sin el QR Code inicialmente
    const paciente = await Patient.create({
      nombre,
      apellido,
      fecha_nacimiento,
      tipo_sangre,
      diagnosticos,
      formas_tratamiento,
      telefono_contacto,
      telefono_emergencia,
      foto_perfil,
    });
    console.log('Paciente creado (sin QR):', paciente);

    // Verificar que BASE_URL esté definida
    if (!process.env.BASE_URL) {
      throw new Error('La variable de entorno BASE_URL no está definida');
    }

    // Generar la URL única del perfil y el QR Code correspondiente
    const profileUrl = `${process.env.BASE_URL}/patient/${paciente.id}`;
    console.log('Profile URL generada:', profileUrl);

    const qrCodeDataURL = await QRCode.toDataURL(profileUrl);
    console.log('QR Code generado:', qrCodeDataURL);

    // Asignar la URL del QR Code al paciente y guardarlo en la base de datos
    paciente.qr_code = qrCodeDataURL;
    await paciente.save();
    console.log('Paciente actualizado con QR Code:', paciente);

    res.status(201).json(paciente);
  } catch (error) {
    console.error('Error en createPatient:', error);
    res.status(500).json({ msg: 'Error al crear el paciente', error: error.message });
  }
};

/**
 * Obtiene un paciente por su ID.
 */
exports.getPatientById = async (req, res) => {
  const { id } = req.params;
  try {
    const paciente = await Patient.findByPk(id);
    if (!paciente) {
      return res.status(404).json({ msg: 'Paciente no encontrado' });
    }
    res.json(paciente);
  } catch (error) {
    console.error('Error en getPatientById:', error);
    res.status(500).json({ msg: 'Error del servidor', error: error.message });
  }
};

/**
 * Lista todos los pacientes.
 */
exports.listPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (error) {
    console.error('Error en listPatients:', error);
    res.status(500).json({ msg: 'Error al obtener la lista de pacientes', error: error.message });
  }
};

/**
 * Actualiza un paciente existente y regenera su QR Code.
 * Se regenera la URL del perfil basada en el ID del paciente y la variable BASE_URL.
 */
exports.updatePatient = async (req, res) => {
  const { id } = req.params;
  try {
    let paciente = await Patient.findByPk(id);
    if (!paciente) {
      return res.status(404).json({ msg: 'Paciente no encontrado' });
    }

    // Actualizar campos recibidos (si se envían, sino se mantienen los actuales)
    const {
      nombre,
      apellido,
      fecha_nacimiento,
      tipo_sangre,
      diagnosticos,
      formas_tratamiento,
      telefono_contacto,
      telefono_emergencia,
      foto_perfil,
    } = req.body;

    paciente.nombre = nombre || paciente.nombre;
    paciente.apellido = apellido || paciente.apellido;
    paciente.fecha_nacimiento = fecha_nacimiento || paciente.fecha_nacimiento;
    paciente.tipo_sangre = tipo_sangre || paciente.tipo_sangre;
    paciente.diagnosticos = diagnosticos || paciente.diagnosticos;
    paciente.formas_tratamiento = formas_tratamiento || paciente.formas_tratamiento;
    paciente.telefono_contacto = telefono_contacto || paciente.telefono_contacto;
    paciente.telefono_emergencia = telefono_emergencia || paciente.telefono_emergencia;
    paciente.foto_perfil = foto_perfil || paciente.foto_perfil;

    // Verificar que BASE_URL esté definida
    if (!process.env.BASE_URL) {
      throw new Error('La variable de entorno BASE_URL no está definida');
    }

    // Regenerar la URL única del perfil y el QR Code
    const profileUrl = `${process.env.BASE_URL}/patient/${paciente.id}`;
    const qrCodeDataURL = await QRCode.toDataURL(profileUrl);
    paciente.qr_code = qrCodeDataURL;

    await paciente.save();
    res.json(paciente);
  } catch (error) {
    console.error('Error en updatePatient:', error);
    res.status(500).json({ msg: 'Error al actualizar el paciente', error: error.message });
  }
};

/**
 * Elimina un paciente por su ID.
 */
exports.deletePatient = async (req, res) => {
  const { id } = req.params;
  try {
    const paciente = await Patient.findByPk(id);
    if (!paciente) {
      return res.status(404).json({ msg: 'Paciente no encontrado' });
    }
    await paciente.destroy();
    res.json({ msg: 'Paciente eliminado exitosamente' });
  } catch (error) {
    console.error('Error en deletePatient:', error);
    res.status(500).json({ msg: 'Error al eliminar el paciente', error: error.message });
  }
};
