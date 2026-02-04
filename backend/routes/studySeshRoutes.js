import express from 'express';
const router = express.Router();

import { createStudySesh, getStudySesh } from '../controllers/studySeshController.js';

router.post('/', createStudySesh);
router.get('/', getStudySesh);


export default router;
