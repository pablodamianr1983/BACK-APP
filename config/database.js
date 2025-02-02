// config/database.js

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  define: {
    underscored: true, // Utiliza snake_case para nombres de columnas
    timestamps: true,  // Habilita timestamps (created_at y updated_at)
  },
  logging: console.log, // Puedes cambiar a false para desactivar logs SQL
});

module.exports = sequelize;
