import tasks from '../data/tasks.js';
import { v4 as uuidv4 } from "uuid"

export const createTask = (req, res) => {
  const userId = req.user.id
  const reqDetails = req.body.newTask
  const newTask = {
    userId,
    id: uuidv4(),
    dateCreated: Date.now(),
    completed: false,
    ...reqDetails
  }
  tasks.push(newTask);
  res.status(200).json(newTask);
}

export const getTasks = (req, res) => {
  res.status(200).json({ success: true, tasks });
}

export const updateTask = (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex(task => task.id === id);
  const updatedTaskInfo = req.params.info;
  const updatedTaskValue = req.body.value;
  if (index !== -1) {
    tasks[index][updatedTaskInfo] = updatedTaskValue;
    res.status(200).json({ success: true });
  } else {
    res.status(200).json({ success: false, message: `Cannot match/find the task: ${id}` })
  }
}

export const deleteTask = (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    res.status(200).json({ success: true });
  } else {
    res.status(200).json({ success: false, message: `Cannot match/find the task: ${id}` })
  }
}


