import { useContext } from "react";
import { TimerContext } from "../../contexts/timer/timerContext";

export const useTimer = () => {
  return useContext(TimerContext);
}