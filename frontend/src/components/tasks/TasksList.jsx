import { Trash2 } from 'lucide-react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const API = axios.create({ baseURL: "http://localhost:5001/api" });

const TasksList = () => {
  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    getTasks();
  }, [])

  function getTasks() {
    API.get("/tasks")
      .then((res) => {
        setTasks(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleDelete = (taskId) => {
    API.delete(`/tasks/${taskId}`)
      .then((res) => {
        getTasks();
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleChange = ((taskId, info, value) => {
    // Update local state
    const updatedTasksList = tasks.map((task) => {
      if (task.id === taskId) {
        if (info === "dueDate") {
          value = convertDate(value);
        }
        return {
          ...task,
          [info]: value
        }
      }
      return task;
    })
    setTasks(updatedTasksList);
    // Update server
    API.put(`/tasks/${taskId}/${info}`, { value: info === "dueDate" ? convertDate(value) : value })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  })

  const convertDate = (date) => {
    return new Date(date).toISOString().split("T")[0];
  }

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
                  value={task.dueDate ? convertDate(task.dueDate) : ""}
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