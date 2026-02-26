import { useContext } from "react";
import { authContext } from "../../contexts/auth/authContext";


export const useTasksService = () => {
  const { mainAPI } = useContext(authContext);

  const getTasks = () => {
    return mainAPI.get("/tasks")
  }

  const deleteTask = (taskId) => {
    return mainAPI.delete(`/tasks/${taskId}`)
  }

  const updateTask = (taskId, name, value) => {
    return mainAPI.put(`/tasks/${taskId}/${name}`, { value: value })
  }

  const createTask = (newTask) => {
    return mainAPI.post("/tasks", newTask)
  }

  return {
    getTasks,
    deleteTask,
    updateTask,
    createTask
  }
}
