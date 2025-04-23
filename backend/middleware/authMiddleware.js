const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No hay token, permiso no válido' });
  }

  try {
    const decoded = jwt.verify(token, 'secretKey');
    req.user = decoded.userId; // Decodificar el id del usuario y agregarlo a la request
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token no válido' });
  }
};

module.exports = authMiddleware;
