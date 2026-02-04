import express from 'express';
const router = express.Router();

import { getSettings, updateSettings } from '../controllers/settingsController.js';

router.get('/', getSettings)

router.patch('/:id', updateSettings)

export default router;