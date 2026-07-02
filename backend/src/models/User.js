const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({ name: { type: String, required: true }, email: { type: String, required: true, unique: true }, phone: { type: String, required: true }, password: { type: String, required: true, select: false }, role: { type: String, enum: ['passenger', 'driver'], default: 'passenger' }, rating: { average: { type: Number, default: 5 }, count: { type: Number, default: 0 } }, isOnline: { type: Boolean, default: false }, currentLocation: { type: { type: String, default: 'Point' }, coordinates: { type: [Number], default: [0, 0] } }, driverInfo: { carModel: String, carColor: String, carPlate: String }, totalTrips: { type: Number, default: 0 }, totalEarnings: { type: Number, default: 0 } }, { timestamps: true });
userSchema.index({ currentLocation: '2dsphere' });
userSchema.pre('save', async function(next) { if (!this.isModified('password')) return next(); this.password = await bcrypt.hash(this.password, 12); next(); });
userSchema.methods.comparePassword = async function(p) { return bcrypt.compare(p, this.password); };
module.exports = mongoose.model('User', userSchema);
