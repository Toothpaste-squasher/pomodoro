import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTasksService } from '../../hooks/services/tasksService';


const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const { getTasks, deleteTask, updateTask, createTask } = useTasksService();

  useEffect(() => {
    grabTasks();
  }, [])

  function grabTasks() {
    getTasks().then((res) => {
      setTasks(res.data)
    })
  }

  const handleDelete = (taskId) => {
    deleteTask(taskId)
      .then((res) => {
        setTasks(res.data.tasks)
      })
  }

  const handleChange = ((taskId, info, value) => {
    // Update local task state
    const updatedTasksList = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          [info]: value
        }
      }
      return task;
    })
    setTasks(updatedTasksList);
    // Update server
    updateTask(taskId, info, value)
  })

  return (
    <div className='task-list'>
      {tasks.map((task) => {
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

    </div>
  )
}


export { TasksList }