
import { TasksList } from '../../components/tasks/tasksList';

const Tasks = () => {
  return (
    <div className='tasks-page'>
      <div className='task-container'>
        <h1>Tasks</h1>
        <TasksList />
      </div>
    </div>
  )
};

export { Tasks };