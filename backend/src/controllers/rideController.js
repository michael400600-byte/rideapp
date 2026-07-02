const Ride = require('../models/Ride');
exports.requestRide = async (req, res) => { try { const ride = await Ride.create({ ...req.body, passenger: req.user._id }); res.status(201).json({ success: true, data: { ride } }); } catch (e) { res.status(500).json({ message: e.message }); } };
exports.acceptRide = async (req, res) => { try { const ride = await Ride.findByIdAndUpdate(req.params.rideId, { driver: req.user._id, status: 'driver_arriving' }, { new: true }); res.json({ success: true, data: { ride } }); } catch (e) { res.status(500).json({ message: e.message }); } };
exports.startRide = async (req, res) => { const ride = await Ride.findByIdAndUpdate(req.params.rideId, { status: 'in_progress' }, { new: true }); res.json({ success: true, data: { ride } }); };
exports.completeRide = async (req, res) => { const ride = await Ride.findByIdAndUpdate(req.params.rideId, { status: 'completed' }, { new: true }); res.json({ success: true, data: { ride } }); };
exports.cancelRide = async (req, res) => { const ride = await Ride.findByIdAndUpdate(req.params.rideId, { status: 'cancelled' }, { new: true }); res.json({ success: true, data: { ride } }); };
exports.rateRide = async (req, res) => { const ride = await Ride.findByIdAndUpdate(req.params.rideId, { rating: req.body }, { new: true }); res.json({ success: true, data: { ride } }); };
exports.getHistory = async (req, res) => { const rides = await Ride.find({ $or: [{ passenger: req.user._id }, { driver: req.user._id }] }).sort('-createdAt'); res.json({ success: true, data: { rides } }); };
