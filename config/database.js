// config/database.js
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // Asegura que use el puerto de Railway
    dialect: "mysql",
    define: {
      underscored: true, // Usa snake_case en las columnas
      timestamps: true, // Agrega automáticamente `created_at` y `updated_at`
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Evita problemas con certificados SSL en Railway
      },
    },
    logging: false, // Cambia a `console.log` si quieres ver las consultas SQL
  }
);

// ✅ Verificar conexión a la base de datos
sequelize
  .authenticate()
  .then(() => console.log("✅ Conectado a MySQL en Railway"))
  .catch((err) => console.error("❌ Error de conexión a la base de datos:", err));

module.exports = sequelize;
