import { formatTimerTime } from "../../utils/timeUtils";
import { TimeInput } from "./timeInput";
import { useContext } from "react";
import { timerTimeContext, timerCycleContext, timerDispatchContext } from "../../contexts/app/timer/timerContext";
import s from './timerComp.module.scss';
import { Modal } from "../_common/modal";

const TimerTime = () => {
  const { remainingTime } = useContext(timerTimeContext);
  const { cycle } = useContext(timerCycleContext);
  const { dispatchCycle } = useContext(timerDispatchContext);

  const handleTimerClick = () => {
    if (!cycle.isRunning && remainingTime === cycle.dur) {
      dispatchCycle({ type: "TOGGLE_EDIT", payload: true })
    }
  }

  const handleCloseModal = () => {
    dispatchCycle({ type: "TOGGLE_EDIT", payload: false })
  }

  return (
    <div className={s.timerTime} onClick={handleTimerClick}>
      {formatTimerTime(remainingTime)}
      <Modal
        open={cycle.isEditing}
        closeFunc={handleCloseModal}
      >
        <TimeInput />
      </Modal>
    </div>
  )
}

export { TimerTime };