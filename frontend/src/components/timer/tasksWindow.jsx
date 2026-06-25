import { TasksList } from '../tasks/taskList/tasksList';
import { FloatWindow } from '../_common/floatWindow';

export const TasksWindow = () => {
  return (
    <FloatWindow title="Tasks">
      <TasksList />
    </FloatWindow>
  )
}