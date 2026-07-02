require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/database');
const { initSocket } = require('./config/socket');
const authRoutes = require('./routes/auth');
const rideRoutes = require('./routes/rides');

const app = express();
const server = http.createServer(app);
initSocket(server);

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/rides', rideRoutes);
app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'RideApp API running' }));

const PORT = process.env.PORT || 3000;
const start = async () => { await connectDB(); server.listen(PORT, () => console.log(`🚗 RideApp Backend running on port ${PORT}`)); };
start();
