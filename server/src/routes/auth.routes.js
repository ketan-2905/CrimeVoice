// src/routes/auth.routes.js
import express from 'express';
import {
  registerUser,
  loginUser,
  promoteToAdmin,
  verify,
  logoutUser,
} from '../controllers/auth.controller.js';
import authenticate from '../middlewares/auth.middleware.js';
import authorizeAdmin from '../middlewares/admin.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/promote/:userId', authenticate, authorizeAdmin, promoteToAdmin);
router.get('/verify', verify);
router.post('/logout', logoutUser);


export default router;
