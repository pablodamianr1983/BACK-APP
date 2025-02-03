const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.header('Authorization'); // ✅ Buscar el token en Authorization

  if (!authHeader) {
    console.log("⚠️ No se envió el encabezado Authorization");
    return res.status(401).json({ msg: 'No hay token, autorización denegada' });
  }

  const token = authHeader.split(' ')[1]; // ✅ Extraer solo el token después de "Bearer"

  if (!token) {
    console.log("⚠️ Token no encontrado después de Bearer");
    return res.status(401).json({ msg: 'Token inválido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded.id;
    console.log("✅ Token validado correctamente:", decoded);
    next();
  } catch (error) {
    console.log("❌ Error al verificar el token:", error);
    res.status(401).json({ msg: 'Token no válido' });
  }
};
