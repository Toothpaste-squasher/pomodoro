import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useContext } from 'react';

import './timerDisplay.scss';
import './StudyTasks.scss';

import { InputTime } from './timerInput.jsx';
import { TimerCircle } from './pgcircle.jsx';
import { TasksList } from '../../components/tasks/tasksList.jsx';
import { formatTimerTime } from '../../utils/timeUtils.jsx';
import { Notes } from '../../components/timer/notes';
import { timerContext, timerDispatchContext } from '../../contexts/app/timer/timerContext.js';
import { TimerControls } from './controls.jsx';

const Timer = () => {
  // --- timerContext ---
  const { remainingTime, cycle } = useContext(timerContext);
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
          <TimerCircle
            remainingTime={remainingTime}
            countdownDuration={cycle.dur}
          />
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
      {/* Small tasks window */}
      <div className='small-tasks'>
        <h3>Today's Focus</h3>
        <TasksList />
      </div>
      {/* Notes */}
      <Notes notes={cycle.note} setNotes={(val) => dispatchCycle({ type: 'SET_NOTE', payload: val })} />
    </div>
  )
};


export { Timer };