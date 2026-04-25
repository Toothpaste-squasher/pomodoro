import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useContext } from 'react';



import { InputTime } from '../../components/timer/timerInput.jsx';
import { TimerCircle } from '../../components/timer/pgcircle.jsx';
import { formatTimerTime } from '../../utils/timeUtils.jsx';
import { Notes } from '../../components/timer/notes';
import { TasksWindow } from '../../components/timer/tasksWindow.jsx'

import { timerTimeContext, timerCycleContext, timerDispatchContext } from '../../contexts/app/timer/timerContext.js';
import { TimerControls } from '../../components/timer/controls.jsx';

const Timer = () => {
  // --- timerContext ---
  const remainingTime = useContext(timerTimeContext);
  const cycle = useContext(timerCycleContext);
  const { setRemainingTime, dispatchCycle, finsihSession } = useContext(timerDispatchContext)


  const handleTimerClick = () => {
    if (!cycle.isRunning && remainingTime === cycle.dur) {
      dispatchCycle({ type: "TOGGLE_EDIT", payload: true })
    }
  }

  return (
    <div className='timer-page'>
      <div className='timer-container'>
        {/* Timer Circle */}
        {remainingTime !== cycle.dur && (
          <TimerCircle />
        )}
        {/* Timer Display */}
        <div className='timer-display'>
          <div className='timer-time' onClick={handleTimerClick}>
            {!cycle.isEditing ?
              formatTimerTime(remainingTime)
              :
              <InputTime />
            }
          </div>
          <TimerControls />
        </div>
      </div>
      <TasksWindow />
      {/* Notes */}
      <Notes notes={cycle.note} setNotes={(val) => dispatchCycle({ type: 'SET_NOTE', payload: val })} />
    </div>
  )
};


export { Timer };