import express from 'express';
const router = express.Router();

import { authenticateToken } from '../middleware/authMiddleware.js';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/tasksController.js';


router.use(authenticateToken);

router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id/:info', updateTask);
router.delete('/:id', deleteTask);

export default router;
