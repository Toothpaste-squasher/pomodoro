import { useReducer, useMemo } from "react";

import { taskContext, taskDispatchContext } from "./taskContext.js";
import { useTasksService } from "../../../hooks/services/tasksService";


export const TaskProvider = ({ children }) => {
  const [tasks, dispatchTasks] = useReducer(taskReducer, []);
  const { getTasks, deleteTask, updateTask, createTask } = useTasksService();

  function taskReducer(tasks, action) {
    const { type, content } = action
    switch (type) {
      case "RETRIEVE_TASKS": {
        return content.tasks;
      }

      case "COMPLETE_TASK": {
        if (!content.id) {
          return console.log("taskId not provided")
        };
        return tasks.map((task) => {
          if (task.id === content.id) {
            return { ...task, status: content.value }
          }
          return task
        })
      }

      case "ADD_TASK": {
        if (!content.newTask) return console.log("invalid content for new task creation")
        return [content.newTask, ...tasks];
      }

      case "ALTER_TASK": {
        const { value, id, name } = content;
        return tasks.map((task) => {
          if (task.id === id) {
            return { ...task, [name]: value }
          }
          return task
        })
      }

      case "DELETE_TASK": {
        const { id } = content;
        return tasks.filter(task => task.id !== id)
      }

      default:
        return tasks;
    }
  }

  const handleRetrieveTasks = async () => {
    getTasks()
      .then((res) => {
        const { tasks } = res.data
        dispatchTasks({ type: "RETRIEVE_TASKS", content: { tasks } })
      })
  }

  const handleAddTask = (newTask) => {
    createTask({ newTask })
      .then((res) => {
        dispatchTasks({ type: "ADD_TASK", content: { newTask: res.data.newTask } })
      })
      .catch(err => console.log(err))
  }

  const handleAlterTask = (id, name, value) => {
    updateTask(id, name, value)
      .then(() => {
        dispatchTasks({
          type: "ALTER_TASK",
          content: {
            id, name, value
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleDeleteTask = (id) => {
    deleteTask(id)
      .then(() => {
        dispatchTasks({ type: "DELETE_TASK", content: { id } })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleCompleteTask = (id, value) => {
    updateTask(id, "status", value)
      .then(() => {
        dispatchTasks({ type: "COMPLETE_TASK", content: { id, value } })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Memoize the state value to prevent unnecessary re-renders
  const stateValue = useMemo(() => tasks, [tasks]);

  // Memoize the dispatch actions to keep references stable
  const dispatchValue = useMemo(
    () => ({
      handleRetrieveTasks,
      handleAddTask,
      handleAlterTask,
      handleCompleteTask,
      handleDeleteTask
    }),
    []
  );

  return (
    <taskContext.Provider value={stateValue}>
      <taskDispatchContext.Provider value={dispatchValue}>
        {children}
      </taskDispatchContext.Provider>
    </taskContext.Provider>
  )
}