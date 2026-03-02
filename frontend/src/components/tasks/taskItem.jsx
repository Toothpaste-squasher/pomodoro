import { useContext, useState } from "react"
import { Trash2 } from "lucide-react"
import { taskDispatchContext } from "../../contexts/App/task/taskContext"


const TaskContent = ({ task, setIsEditing }) => {
  return (
    <div className='task-content'>
      <label className='task-label' onClick={() => setIsEditing(true)}>{task.description}</label>
      <div className='task-info'>
        <span>{task.urgentId == 1 ? "High" : task.urgentId == 2 ? "Medium" : "Low"}</span>
        <span>{task.dueDate}</span>
      </div>
    </div>
  )
}

export const EditingTaskContent = ({ task, handleSubmit, handleChange }) => {
  return (
    <form className='task-content' onSubmit={handleSubmit}>
      <input
        className='task-label-input'
        name="description"
        value={task.description}
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
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
        />
      </div>
    </form>
  )
}

export const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false)

  const { handleCompleteTask, handleDeleteTask, handleAlterTask } = useContext(taskDispatchContext)
  return (
    <li className={task.completed ? 'task completed' : 'task'}>
      <input className='task-checkbox'
        type="checkbox"
        name="completion"
        checked={task.completed}
        onChange={(e) => handleCompleteTask(task.id, e.target.checked)}
      />

      {isEditing ?
        <EditingTaskContent
          task={task}
          handleSubmit={() => setIsEditing(false)}
          handleChange={(e) => {
            handleAlterTask(task.id, e.target.name, e.target.value)
          }}
        />
        :
        <TaskContent task={task} setIsEditing={setIsEditing} />
      }

      {!isEditing ? <button className='task-delete' onClick={() => handleDeleteTask(task.id)}><Trash2 /></button> : ""}
    </li>
  )
}