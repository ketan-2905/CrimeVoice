import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import createDefaultAdmin from './utils/createAdmin.js';

import authRoutes from './routes/auth.routes.js';
import reportRoutes from './routes/reports.routes.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // 👈 frontend origin
  credentials: true               // 👈 allow cookies or auth headers
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);

// Call admin creation function
createDefaultAdmin();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
