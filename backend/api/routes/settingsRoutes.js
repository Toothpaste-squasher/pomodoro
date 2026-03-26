import express from 'express';
const router = express.Router();

import { authenticateToken } from '../middleware/authMiddleware.js';

import { getSettings, updateSettings } from '../controllers/settingsController.js';

router.use(authenticateToken);

router.get('/', getSettings);

router.patch('/', updateSettings);

export default router;