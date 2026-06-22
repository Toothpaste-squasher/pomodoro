import { TasksList } from '../tasks/taskList/tasksList';
import s from './timerComp.module.scss';

export const TasksWindow = () => {
  return (
    < div className={s.smallTasks} >
      <h3>Today's Focus</h3>
      <TasksList />
    </div >
  )
}