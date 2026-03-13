import { useContext, useState } from "react"
import { Trash2 } from "lucide-react"
import { taskDispatchContext } from "../../contexts/app/task/taskContext"


const TaskContent = ({ task, setIsEditing }) => {
  return (
    <div className='task-content'>
      <label className='task-label' onClick={() => setIsEditing(true)}>{task.title}</label>
      <div className='task-info'>
        <span>{task.urgentId == 1 ? "High" : task.urgentId == 3 ? "Low" : "Middle"}</span>
        <span>{task.due_date}</span>
      </div>
    </div>
  )
}

export const EditingTaskContent = ({ task, handleSubmit, handleChange }) => {
  return (
    <form className='task-content' onSubmit={handleSubmit}>
      <input
        className='task-label-input'
        name="title"
        value={task.title}
        onChange={handleChange}
        autoFocus
      />
      <div className='task-info'>
        <select
          name="urgentId"
          value={task.urgentId}
          onChange={handleChange}
        >
          <option value="1">High</option>
          <option value="2">Medium</option>
          <option value="3">Low</option>
        </select>
        <input
          type="date"
          name="due_date"
          value={task.due_date || ""}
          onChange={handleChange}
        />
      </div>
    </form>
  )
}

export const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false)

  const { handleCompleteTask, handleDeleteTask, handleAlterTask } = useContext(taskDispatchContext)

  const handleChange = (e) => {
    handleAlterTask(task.id, e.target.name, e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  }

  return (
    <li className={task.status === 'completed' ? 'task completed' : 'task'}>
      <input className='task-checkbox'
        type="checkbox"
        name="status"
        checked={task.status === 'completed'}
        onChange={(e) => handleCompleteTask(task.id, e.target.checked ? 'completed' : 'pending')}
      />

      {isEditing ?
        <EditingTaskContent
          task={task}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
        :
        <TaskContent task={task} setIsEditing={setIsEditing} />
      }

      {!isEditing ? <button className='task-delete' onClick={() => handleDeleteTask(task.id)}><Trash2 /></button> : ""}
    </li>
  )
}