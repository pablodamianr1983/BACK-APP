const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log('🔹 Solicitud de login recibida:', req.body);
  
  try {
    const admin = await Admin.findOne({ where: { username } });
    
    if (!admin) {
      console.log(`❌ No se encontró el usuario: ${username}`);
      return res.status(400).json({ msg: 'Usuario no encontrado' });
    }
    
    console.log('✅ Usuario encontrado:', admin);
    
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log(`🔑 Comparación de contraseñas para ${username}:`, isMatch);
    
    if (!isMatch) {
      console.log(`❌ Contraseña incorrecta para el usuario: ${username}`);
      return res.status(400).json({ msg: 'Contraseña incorrecta' });
    }
    
    // Generar token JWT con una duración de 2 horas
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    console.log(`🔐 Token generado para ${username}:`, token);
    
    res.json({ token });
  } catch (error) {
    console.error('❌ Error en el proceso de login:', error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

exports.register = async (req, res) => {
  const { username, password, email } = req.body;
  console.log('🔹 Solicitud de registro recibida:', req.body);
  
  try {
    // Verificar si ya existe el usuario o correo electrónico
    const existingUsername = await Admin.findOne({ where: { username } });
    if (existingUsername) {
      console.log(`⚠️ El username "${username}" ya existe`);
      return res.status(400).json({ msg: 'El username ya existe' });
    }
    
    const existingEmail = await Admin.findOne({ where: { email } });
    if (existingEmail) {
      console.log(`⚠️ El email "${email}" ya está registrado`);
      return res.status(400).json({ msg: 'El email ya existe' });
    }
    
    // Hashear la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('🔑 Contraseña hasheada:', hashedPassword);
    
    // Crear el administrador
    const newAdmin = await Admin.create({
      username,
      password: hashedPassword,
      email,
    });

    console.log('✅ Administrador creado:', newAdmin);
    res.status(201).json({ msg: 'Administrador creado exitosamente', admin: newAdmin });
  } catch (error) {
    console.error('❌ Error en el proceso de registro:', error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};
