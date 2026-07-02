const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = async (req, res, next) => { try { const token = req.header('Authorization')?.replace('Bearer ', ''); if (!token) return res.status(401).json({ message: 'Token requerido' }); const decoded = jwt.verify(token, process.env.JWT_SECRET); req.user = await User.findById(decoded.userId); next(); } catch (e) { res.status(401).json({ message: 'Token invalido' }); } };
const requireRole = (...roles) => (req, res, next) => { if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'No autorizado' }); next(); };
module.exports = { auth, requireRole };
