// models/Patient.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Patient = sequelize.define(
  "Patient",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
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
      allowNull: true,
    },
    tipo_sangre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    diagnosticos: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    formas_tratamiento: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    telefono_contacto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telefono_emergencia: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    foto_perfil: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    qr_code: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // 🔹 SOLUCIÓN: Usa la fecha actual por defecto
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // 🔹 SOLUCIÓN: Usa la fecha actual por defecto
      onUpdate: DataTypes.NOW, // 🔹 Asegura que se actualice automáticamente
    },
  },
  {
    tableName: "patients",
    timestamps: true, // 🔹 Sequelize generará automáticamente `createdAt` y `updatedAt`
    freezeTableName: true, // 🔹 Evita que Sequelize pluralice el nombre de la tabla
  }
);

module.exports = Patient;

