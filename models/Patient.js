// models/Patient.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Patient = sequelize.define('Patient', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
  },
  tipo_sangre: {
    type: DataTypes.STRING,
  },
  diagnosticos: {
    type: DataTypes.TEXT,
  },
  formas_tratamiento: {
    type: DataTypes.TEXT,
  },
  telefono_contacto: {
    type: DataTypes.STRING,
  },
  telefono_emergencia: {
    type: DataTypes.STRING,
  },
  foto_perfil: {
    type: DataTypes.STRING,
  },
  qr_code: {
    type: DataTypes.TEXT, // Se cambia de STRING (por defecto VARCHAR(255)) a TEXT
  },
}, {
  tableName: 'patients',
});

module.exports = Patient;
