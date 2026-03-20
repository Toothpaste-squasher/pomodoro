import { pool } from '../../db/db.js';

export const getTasks = async (req, res) => {
  const sql = `SELECT * FROM tasks WHERE user_id = ? ORDER BY id DESC`
  const user_id = req.user.id;
  const [rows] = await pool.query(sql, [user_id])
  return res.status(200).json({ success: true, tasks: rows })
}

export const createTask = async (req, res) => {
  const add_sql = `INSERT INTO tasks (user_id, title, due_date, status, task_group, priority) VALUES (?, ?, ?, ?, ?, ?)`
  const getNewTask_sql = 'SELECT * FROM tasks WHERE id = ?'
  const user_id = req.user.id
  const { title, due_date, status, task_group, priority } = req.body.newTask
  const formatted_due_date = due_date === '' ? null : due_date
  const [result] = await pool.query(add_sql, [user_id, title, formatted_due_date, status, task_group, priority])
  const [newTask] = await pool.query(getNewTask_sql, [result.insertId])

  return res.status(200).json({ success: true, newTask: newTask[0] })
  /*
  tasks.push(newTask);
  res.status(200).json(newTask);
  */
}

export const updateTask = async (req, res) => {
  const sql = `UPDATE tasks SET ?? = ? WHERE user_id = ? AND id = ?;`
  const id = Number(req.params.id);
  const user_id = req.user.id;
  const info = req.params.info;
  const value = req.body.value;

  const allowedColumns = [
    'title',
    'status',
    'task-group',
    'due_date',
    'priority',
    'completed_at'
  ]
  if (!allowedColumns.includes(info)) {
    return res.status(400).json({ success: false, message: "Invalid column name" })
  }
  const [rows] = await pool.query(sql, [info, value, user_id, id])
  return res.status(200).json({ success: true, message: "Successfully updated task info" })
  /*
  const index = tasks.findIndex(task => task.id === id);
  const updatedTaskInfo = req.params.info;
  const updatedTaskValue = req.body.value;
  if (index !== -1) {
    tasks[index][updatedTaskInfo] = updatedTaskValue;
    res.status(200).json({ success: true });
  } else {
    res.status(200).json({ success: false, message: `Cannot match/find the task: ${id}` })
  }*/
}

export const deleteTask = async (req, res) => {
  const sql = 'DELETE FROM tasks WHERE id = ? AND user_id = ?'
  const id = Number(req.params.id);
  const user_id = req.user.id;

  await pool.query(sql, [id, user_id])

  return res.status(200).json({ success: true, message: "Task deleted" })

  /*
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    res.status(200).json({ success: true });
  } else {
    res.status(200).json({ success: false, message: `Cannot match/find the task: ${id}` })
  }
  */
}


