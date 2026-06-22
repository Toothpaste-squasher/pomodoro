import React, { useContext, memo } from "react"
import { timerCycleContext, timerDispatchContext } from "../../contexts/app/timer/timerContext"
import { Pause, Play, Square, Check, X } from "lucide-react"
import s from './timerComp.module.scss'

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
      <div className={s.timerControl}>
        {
          cycle.isRunning ?
            <Pause className={s.timerButton} onClick={toggleTimer} size={40} /> :
            <Play className={s.timerButton} onClick={toggleTimer} size={40} />
        }
        < Square className={s.timerButton} onClick={() => finishSession()} size={40} />
      </div>
    )
  }

  const EditingTimer = () => {
    return (
      <>
        <Check className={s.timerButton} size={40} />
        <X className={s.timerButton} size={40} onClick={handleCancel} />
      </>
    )
  }

  return (
    <div className={s.timerControl}>
      {cycle.isEditing ? <EditingTimer /> : <TimerReady />}
    </div>
  )
})
