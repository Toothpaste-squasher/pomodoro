import { Loader } from 'lucide-react';
import React, { useEffect, useContext, useState, memo } from 'react';
import { taskContext, taskDispatchContext } from '../../contexts/app/task/taskContext';
import { TaskItem } from './taskItem';
import { CreateTask } from './createTaskItem';


const TasksList = memo(() => {
  // `taskContext` provides the array directly, so we don't destructure `{ tasks }`
  const tasks = useContext(taskContext);
  const { handleRetrieveTasks } = useContext(taskDispatchContext)
  const [loadingTask, setLoadingTask] = useState(true)
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    handleRetrieveTasks()
    setLoadingTask(false)
  }, [])

  return loadingTask ? <Loader /> : (
    <ul className='task-list'>
      <button
        className='add-task-button'
        onClick={() => { setIsAdding(true) }}
      >+</button>
      {isAdding ? <CreateTask setIsAdding={setIsAdding} /> : ""}
      {tasks.map((task, index) => {
        return (
          <TaskItem task={task} key={index} />
        )
      })}

    </ul>
  )
})


export { TasksList }