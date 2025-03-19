import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Import routes
import authRoutes from './users/auth.routes';
import orderRoutes from './orders/order.routes';
import diContainer from './di.container';
import inviteRoutes from './invitation/invite.routes';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/fooderp';
mongoose
    .connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', authRoutes(diContainer.getController("authController")));
app.use('/api/orders', orderRoutes(diContainer.getController("orderController")));
app.use('api/invite', inviteRoutes(diContainer.getController("inviteController")));

// Root Route
app.get('/', (req, res) => {
    res.send('🍽️ Welcome to Food & Beverage ERP API!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
