import { pool } from '../../db/db.js';
import { tasksAC } from '../data/allowedColumns.js';

export const getTasks = async (req, res) => {
  const sql = `SELECT * FROM tasks WHERE user_id = ? ORDER BY id DESC`
  const user_id = req.user.id;
  const [rows] = await pool.execute(sql, [user_id])
  return res.status(200).json({ success: true, data: rows })
}

export const createTask = async (req, res) => {
  const add_sql = `INSERT INTO tasks (user_id, title, due_date, status, task_group, priority) VALUES (?, ?, ?, ?, ?, ?)`
  const getNewTask_sql = 'SELECT * FROM tasks WHERE id = ?'
  const user_id = req.user.id
  const { title, due_date, status, task_group, priority } = req.body.newTask
  const formatted_due_date = due_date === '' ? null : due_date
  const [result] = await pool.execute(add_sql, [user_id, title, formatted_due_date, status, task_group, priority])
  const [newTask] = await pool.execute(getNewTask_sql, [result.insertId])

  return res.status(200).json({ success: true, data: newTask[0] })
}

export const updateTask = async (req, res) => {
  const id = Number(req.params.id);
  const user_id = req.user.id;
  const info = req.params.info;
  const value = req.body.value;

  if (!tasksAC.includes(info)) {
    return res.status(400).json({ success: false, message: "Invalid column name" })
  }
  const sql = `UPDATE tasks SET \`${info}\` = ? WHERE user_id = ? AND id = ?;`
  await pool.execute(sql, [value, user_id, id])
  return res.status(200).json({ success: true, message: "Successfully updated task info" })
}

export const deleteTask = async (req, res) => {
  const sql = 'DELETE FROM tasks WHERE id = ? AND user_id = ?'
  const id = Number(req.params.id);
  const user_id = req.user.id;

  await pool.execute(sql, [id, user_id])

  return res.status(200).json({ success: true, message: "Task deleted" })
}


