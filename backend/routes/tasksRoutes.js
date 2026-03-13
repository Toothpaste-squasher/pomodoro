import express from 'express';
const router = express.Router();

import { authenticateToken } from '../../auth-backend/middleware/authMiddleware.js';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/tasksController.js';
import { a_wrap } from '../utils/asyncHandler.js'

router.use(authenticateToken);

router.post('/', a_wrap(createTask));
router.get('/', a_wrap(getTasks));
router.put('/:id/:info', a_wrap(updateTask));
router.delete('/:id', a_wrap(deleteTask));

export default router;
