import { Trash2, Loader } from 'lucide-react';
import { useEffect, useContext, useState } from 'react';
import { taskContext, taskDispatchContext } from '../../contexts/App/task/taskContext';
import { taskItem } from './taskItem';


const TasksList = () => {
  // `taskContext` provides the array directly, so we don't destructure `{ tasks }`
  const tasks = useContext(taskContext);
  const { handleRetrieveTasks, handleAddTask } = useContext(taskDispatchContext)
  const [loadingTask, setLoadingTask] = useState(true)

  useEffect(() => {
    handleRetrieveTasks()
    setLoadingTask(false)
  }, [])

  return loadingTask ? <Loader /> : (
    <ul className='task-list'>
      <button onClick={() => handleAddTask()}>+</button>
      {console.log(tasks)}
      {(tasks).map((task) => {
        return (
          <div className={task.completed ? 'task completed' : 'task'} key={task.id}>
            <input className='task-checkbox'
              type="checkbox"
              id={task.id}
              checked={task.completed}
              onChange={(e) => handleChange(task.id, "completed", e.target.checked)}
            />
            <div className='task-content'>
              <label className='task-label' htmlFor={task.id}>{task.description}</label>
              <div className='task-info'>
                <select
                  name="priority"
                  id="priority"
                  value={task.urgentId}
                  onChange={(e) => handleChange(task.id, "urgentId", e.target.value)}
                >
                  <option value="1">High</option>
                  <option value="2">Medium</option>
                  <option value="3">Low</option>
                </select>
                <input
                  type="date"
                  value={task.dueDate}
                  onChange={(e) => handleChange(task.id, "dueDate", e.target.value)}
                />
              </div>
            </div>
            <button className='task-delete' onClick={() => handleDelete(task.id)}><Trash2 /></button>
          </div>
        )
      })}

    </ul>
  )
}


export { TasksList }