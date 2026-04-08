import React, { useContext, memo } from "react"
import { timerCycleContext, timerDispatchContext } from "../../contexts/app/timer/timerContext"
import { Pause, Play, Square, Check, X } from "lucide-react"

export const TimerControls = memo(() => {
  const cycle = useContext(timerCycleContext)
  const { dispatchCycle, finishSession } = useContext(timerDispatchContext)

  const handleCancel = () => {
    dispatchCycle({ type: 'TOGGLE_EDIT', payload: false })
  }

  const toggleTimer = () => {
    dispatchCycle({ type: 'TOGGLE_RUN', payload: !cycle.isRunning });
  }

  const TimerReady = () => {
    return (
      <>
        {cycle.isRunning ?
          <Pause className='timer-button' onClick={toggleTimer} size={40} /> :
          <Play className='timer-button' onClick={toggleTimer} size={40} />
        }
        <Square className='timer-button' onClick={() => finishSession()} size={40} />
      </>
    )
  }

  const EditingTimer = () => {
    return (
      <>
        <Check className="timer-button" size={40} />
        <X className="timer-button" size={40} onClick={handleCancel} />
      </>
    )
  }

  return (
    <div className='timer-control'>
      {cycle.isEditing ? <EditingTimer /> : <TimerReady />}
    </div>
  )
})
