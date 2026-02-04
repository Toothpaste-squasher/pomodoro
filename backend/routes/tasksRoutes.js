import express from 'express';
const router = express.Router();

import { createTask, getTasks, updateTask, deleteTask } from '../controllers/tasksController.js';

router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id/:info', updateTask);
router.delete('/:id', deleteTask);

export default router;
