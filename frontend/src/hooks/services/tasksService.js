import { useContext } from "react";
import { authContext } from "../../contexts/auth/authContext";


export const useTasksService = () => {
  const { mainAPI } = useContext(authContext);

  const getTasks = () => {
    mainAPI.get("/tasks")
      .catch((err) => {
        console.error(err)
      })
  }

  const deleteTask = (taskId) => {
    mainAPI.delete(`/tasks/${taskId}`)
      .catch((err) => {
        console.error(err)
      })
  }

  const updateTask = (taskId, info, value) => {
    mainAPI.put(`/tasks/${taskId}/${info}`, { value: value })
      .catch((err) => {
        console.error(err)
      })
  }

  const createTask = (newTask) => {
    mainAPI.post("/tasks", newTask)
      .catch((err) => {
        console.error(err)
      })
  }

  return {
    getTasks,
    deleteTask,
    updateTask,
    createTask
  }
}
