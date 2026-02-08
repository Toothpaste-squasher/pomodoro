import express from 'express';
const router = express.Router();

import { authenticateToken } from '../../auth-backend/middleware/authMiddleware.js';

import { getSettings, updateSettings } from '../controllers/settingsController.js';

router.use(authenticateToken);

router.get('/', getSettings)

router.patch('/:id', updateSettings)

export default router;