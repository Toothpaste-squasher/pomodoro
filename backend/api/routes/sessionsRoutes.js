import express from 'express';
const router = express.Router();

import { authenticateToken } from '../middleware/authMiddleware.js';

import { createSesh, getStudySesh } from '../controllers/sessionscontroller.js';

router.use(authenticateToken);

router.post('/', createSesh);
router.get('/', getStudySesh);


export default router;
