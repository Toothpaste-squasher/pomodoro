import { useContext } from 'react';
import s from './timerPage.module.scss';

import { TimerCircle } from '../../components/timer/pgcircle.jsx';
import { Notes } from '../../components/timer/notes.jsx';
import { TasksWindow } from '../../components/timer/tasksWindow.jsx'
import { TimerTime } from '../../components/timer/timerTime.jsx';

import { timerTimeContext, timerCycleContext } from '../../contexts/app/timer/timerContext.js';
import { TimerControls } from '../../components/timer/controls.jsx';

const Timer = () => {
  // --- timerContext ---
  const { remainingTime } = useContext(timerTimeContext);
  const { cycle } = useContext(timerCycleContext);

  return (
    <>
      <div className={s.timerContainer}>
        {/* Timer Circle */}
        <TimerCircle />
        {/* Timer Display */}
        <TimerTime />
        <TimerControls />
      </div>
      <TasksWindow />
      {/* Notes */}
      <Notes notes={cycle.note} setNotes={(val) => dispatchCycle({ type: 'SET_NOTE', payload: val })} />
    </>
  )
};


export { Timer };