const jwt = require('jsonwebtoken');
const User = require('../models/User');
const genToken = (id) => jwt.sign({ userId: id }, process.env.JWT_SECRET, { expiresIn: '7d' });
exports.register = async (req, res) => { try { const { name, email, phone, password, role } = req.body; const user = await User.create({ name, email, phone, password, role }); res.status(201).json({ success: true, data: { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token: genToken(user._id) } }); } catch (e) { res.status(400).json({ message: e.message }); } };
exports.login = async (req, res) => { try { const { email, password } = req.body; const user = await User.findOne({ email }).select('+password'); if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: 'Credenciales invalidas' }); res.json({ success: true, data: { user: { id: user._id, name: user.name, email: user.email, role: user.role, rating: user.rating }, token: genToken(user._id) } }); } catch (e) { res.status(500).json({ message: e.message }); } };
exports.getProfile = async (req, res) => { res.json({ success: true, data: { user: req.user } }); };
