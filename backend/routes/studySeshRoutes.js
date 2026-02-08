import express from 'express';
const router = express.Router();

import { authenticateToken } from '../../auth-backend/middleware/authMiddleware.js';

import { createStudySesh, getStudySesh } from '../controllers/studySeshController.js';

router.use(authenticateToken);

router.post('/', createStudySesh);
router.get('/', getStudySesh);


export default router;
