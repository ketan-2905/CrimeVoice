import express from 'express';
import {
  createReport,
  getAllReports,
  getUserReports,
  updateReportStatus,
  deleteReport
} from '../controllers/reports.controller.js';
import authenticate from '../middlewares/auth.middleware.js';
import authorizeAdmin from '../middlewares/admin.middleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllReports);

// Protected routes
router.post('/', createReport);
router.get('/user', authenticate, getUserReports);
router.patch('/:reportId/status', authenticate, authorizeAdmin, updateReportStatus);
router.delete('/:reportId', authenticate, deleteReport);

export default router;