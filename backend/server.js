import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/auth.js';
import notificationRoutes from './routes/notificationRoutes.js';

dotenv.config();

const app = express();

/* =========================
   MIDDLEWARE (MUST BE FIRST)
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   ROUTES
========================= */
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationRoutes);

/* =========================
   DATABASE CONNECTION
========================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected 🚀'))
  .catch(err => console.log('MongoDB Error:', err));

/* =========================
   SERVER START
========================= */
// app.listen(5000, '0.0.0.0', () => {
//   console.log('Server running on port 5000 🚀');
// });

//For backend deployment on Render, we need to use the PORT from environment variables
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
