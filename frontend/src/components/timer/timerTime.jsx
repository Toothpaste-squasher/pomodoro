import { formatTimerTime } from "../../utils/timeUtils";
import { TimeInput } from "../_common/timeInput";
import { useContext } from "react";
import { timerTimeContext, timerCycleContext, timerDispatchContext } from "../../contexts/app/timer/timerContext";
import s from './timerComp.module.scss';

const TimerTime = () => {
  const { remainingTime } = useContext(timerTimeContext);
  const { cycle } = useContext(timerCycleContext);
  const { dispatchCycle } = useContext(timerDispatchContext);

  const handleTimerClick = () => {
    if (!cycle.isRunning && remainingTime === cycle.dur) {
      dispatchCycle({ type: "TOGGLE_EDIT", payload: true })
    }
  }
  return (
    <div className={s.timerTime} onClick={handleTimerClick}>
      {!cycle.isEditing ?
        formatTimerTime(remainingTime)
        :
        <TimeInput />
      }
    </div>
  )
}

export { TimerTime };