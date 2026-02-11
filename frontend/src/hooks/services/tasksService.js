import { useContext } from "react";
import { authContext } from "../../contexts/auth/authContext";


const useTasksService = () => {
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

  return {
    getTasks,
    deleteTask
  }
}
