import './studyTasks.scss'

import { TasksList } from '../../components/tasks/tasksList';

export const TasksWindow = () => {

  return (
    < div className='small-tasks' >
      <h3>Today's Focus</h3>
      <TasksList />
    </div >
  )
}