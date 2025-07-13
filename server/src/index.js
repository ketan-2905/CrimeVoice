import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import createDefaultAdmin from './utils/createAdmin.js';


import authRoutes from './routes/auth.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

// Call admin creation function
createDefaultAdmin();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
