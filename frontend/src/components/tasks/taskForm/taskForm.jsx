import { useContext, useState } from "react";
import { EditingTaskContent } from "../taskItem/taskItem";
import { taskDispatchContext } from "../../../contexts/app/task/taskContext";

export const CreateTask = ({ setIsAdding }) => {
  const { handleAddTask } = useContext(taskDispatchContext)
  const [newTask, setNewTask] = useState({
    title: '',
    due_date: "",
    status: "pending",
    task_group: "",
    priority: "middle",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewTask(prev => {
      return { ...prev, [name]: value }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAddTask(newTask);
    setIsAdding(false);
  }

  return (
    <li className="task">
      <EditingTaskContent
        task={newTask}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </li>
  )
}