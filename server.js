// server.js

console.log('Iniciando server.js');

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');      // Incluye la ruta de registro y login
const patientRoutes = require('./routes/patients');
require('dotenv').config();

console.log('Configurando Express y Middleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);

// Ruta por defecto para manejar 404
app.use((req, res) => {
  res.status(404).json({ msg: 'Ruta no encontrada' });
});

// Configuración del puerto
const PORT = process.env.PORT || 5000;

console.log('Preparando para conectar a la base de datos y iniciar el servidor');

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida exitosamente.');

    // Sincronizar modelos con la base de datos (usa { force: true } solo en desarrollo para reiniciar tablas)
    await sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
  }
};

startServer();
