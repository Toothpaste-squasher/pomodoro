import express from 'express';
const router = express.Router();

import { refreshToken } from '../controllers/tokenController.js';


router.get('/refresh', refreshToken)


export default router
