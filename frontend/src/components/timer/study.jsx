import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Square } from 'lucide-react';
import { useContext } from 'react';

import './timerDisplay.scss';
import './StudyTasks.scss';

import { InputTime } from './timerInput';
import { TimerCircle } from './timerCircle';
import { TasksList } from '../tasks/TasksList';
import { formatTimerTime } from '../../utils/timeUtils';
import { Notes } from './notes';
import { TimerContext } from '../../contexts/timer/timerContext.js';

const Timer = () => {
  // --- State ---
  const [isEditing, setIsEditing] = useState(false);

  // --- useTimer ---
  const { isRunning, remainingTime, countdownDuration, setCountdownDuration, setIsRunning, setRemainingTime, note, setNote, finishSession } = useContext(TimerContext);

  // --- Effects ---
  useEffect(() => {
    if (isEditing) {
      setIsRunning(false);
    } else if (!isEditing) {
      setRemainingTime(countdownDuration);
    }
  }, [isEditing])


  // --- Functions ---
  // Configure timer
  const toggleTimer = useCallback(() => {
    if (isEditing) {
      setIsEditing(false);
      setIsRunning(true);
    } else {
      setIsRunning((prev) => !prev);
    }
  }, [isEditing])

  return (
    <div className='timer-page'>
      <div className='timer-container'>
        {remainingTime !== countdownDuration && (
          <TimerCircle
            remainingTime={remainingTime}
            countdownDuration={countdownDuration}
          />
        )}


        {/* Timer Display */}
        <div className='timer-display'>
          <div
            className='timer-time'
            onClick={() => { if (!isRunning && remainingTime === countdownDuration) setIsEditing(true) }}
          >
            {!isEditing ?
              formatTimerTime(remainingTime)
              :
              <InputTime
                cdd={countdownDuration}
                setCdd={setCountdownDuration}
                setIsEditing={setIsEditing}
              />
            }
          </div>
          <div className='timer-control'>
            {isRunning ?
              <Pause className='timer-button' onClick={toggleTimer} size={40} /> :
              <Play className='timer-button' onClick={toggleTimer} size={40} />
            }
            <Square className='timer-button' onClick={() => finishSession()} size={40} />
          </div>
        </div>
      </div>
      {/* Small tasks window */}
      <div className='small-tasks'>
        <h3>Today's Focus</h3>
        <TasksList />
      </div>


      {/* Notes */}
      <Notes notes={note} setNotes={setNote} />
    </div>
  )
};


export { Timer };