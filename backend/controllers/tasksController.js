import tasks from '../data/tasks.js';

export const createTask = (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.json(tasks);
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
    res.status(200).json({ success: true, message: `Success, date saved: ${updatedTaskValue}` });
  } else {
    res.status(200).json({ success: false, message: `Cannot match/find the task: ${id}` })
  }
}

export const deleteTask = (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    res.status(200).json({ success: true, message: "Success", tasks: tasks });
  } else {
    res.status(200).json({ success: false, message: `Cannot match/find the task: ${id}` })
  }
}


