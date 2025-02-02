const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, 
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Permite conexiones SSL sin validación
      },
    },
    pool: {
      max: 10, // Número máximo de conexiones abiertas simultáneamente
      min: 0,
      acquire: 60000, // Esperar hasta 60s antes de fallar una conexión
      idle: 20000, // Tiempo que esperará antes de cerrar conexiones inactivas
    },
    logging: false, // Cambia a `console.log` para depurar queries
  }
);

// ✅ Verificar conexión
sequelize
  .authenticate()
  .then(() => console.log("✅ Conectado a MySQL en Railway"))
  .catch((err) => console.error("❌ Error de conexión a la base de datos:", err));

module.exports = sequelize;
