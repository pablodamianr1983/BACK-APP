const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Admin = sequelize.define(
  "Admin",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
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
    tableName: "admins",
    timestamps: true, // 🔹 Sequelize generará automáticamente `createdAt` y `updatedAt`
    freezeTableName: true, // 🔹 Evita que Sequelize pluralice el nombre de la tabla
  }
);

module.exports = Admin;

