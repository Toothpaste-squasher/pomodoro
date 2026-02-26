import { useReducer } from "react";

import { taskContext } from "./taskContext";
import { taskDispatchContext } from "./taskContext";



const taskProvider = () => {
  const [tasks, dispatchTasks] = useReducer(taskReducer, []);
  const { getTasks, deleteTask, updateTask, createTask } = useTasksService();

  function taskReducer(tasks, action) {
    const { type, content } = action
    switch (type) {
      case "COMPLETE_TASK": {
        if (!content.id) {
          return console.log("taskId not provided")
        };
        return tasks.map((task) => {
          if (task.id === content.id) {
            return { ...task, completed: content.value }
          }
          return task
        })
      }

      case "ADD_TASK": {
        if (!content.newTask) return console.log("invalid content for new task creation")
        return [...tasks, content.newTask];
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
    }
  }

  const handleAddTask = (newTask) => {
    createTask(newTask)
      .then(() => {
        dispatchTasks({ type: "ADD_TASK", content: { newTask } })
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

  const handleCompleteTask = (id) => {
    updateTask(id, value)
      .then(() => {
        dispatchTasks({ type: "COMPLETE_TASK", content: id })
      })
  }
}