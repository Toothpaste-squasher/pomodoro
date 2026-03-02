import { useContext, useState } from "react";
import { EditingTaskContent } from "./taskItem";
import { taskDispatchContext } from "../../contexts/App/task/taskContext";

export const CreateTask = ({ setIsAdding }) => {
  const { handleAddTask } = useContext(taskDispatchContext)
  const [newTask, setNewTask] = useState({
    description: '',
    dueDate: "",
    completed: false,
    tagId: 1,
    urgentId: 2,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewTask(prev => {
      return { ...prev, [name]: value }
    })
  }

  const handleSubmit = () => {
    handleAddTask(newTask)
    setIsAdding(false)
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