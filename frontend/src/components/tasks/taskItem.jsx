import { useContext, useState } from "react"


export const taskItem = ({ task }) => {
  const { handleAlterTask, handleCompleteTask, handleDeleteTask } = useContext(taskDispatchContext)
  return (
    <li className={task.completed ? 'task completed' : 'task'} key={task.id}>
      <input className='task-checkbox'
        type="checkbox"
        id={task.id}
        checked={task.completed}
        onChange={(e) => handleCompleteTask(task.id, e.target.checked)}
      />
      <div className='task-content'>
        <label className='task-label' htmlFor={task.id}>{task.description}</label>
        <div className='task-info'>
          <select
            name="priority"
            id="priority"
            value={task.urgentId}
            onChange={(e) => handleAlterTask(task.id, "urgentId", e.target.value)}
          >
            <option value="1">High</option>
            <option value="2">Medium</option>
            <option value="3">Low</option>
          </select>
          <input
            type="date"
            value={task.dueDate}
            onChange={(e) => handleAlterTask(task.id, "dueDate", e.target.value)}
          />
        </div>
      </div>
      <button className='task-delete' onClick={() => handleDeleteTask(task.id)}><Trash2 /></button>
    </li>
  )
}