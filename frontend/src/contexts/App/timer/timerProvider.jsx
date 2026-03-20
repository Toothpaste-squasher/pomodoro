import { useState, useRef, useEffect, useContext, useCallback } from "react";
import { TimerContext } from "./timerContext";
import { settingsContext } from "../settings/settingsContext";
import useSessionService from "../../../hooks/services/sessionService";

export const TimerProvider = ({ children }) => {
  const { defaultDur } = useContext(settingsContext);
  const { saveSession } = useSessionService();

  // --- States ---
  const [isRunning, setIsRunning] = useState(false);
  const [countdownDuration, setCountdownDuration] = useState(0); // Total goal
  const [remainingTime, setRemainingTime] = useState(countdownDuration); // For countdown
  const [note, setNote] = useState('');
  const [doneTask, setDoneTask] = useState([]);


  // --- Time Refs --- 
  const timerIntervalRef = useRef(null);
  const endTimeRef = useRef(0);

  // --- Effects ---
  useEffect(() => {
    setCountdownDuration(Number(defaultDur));
    setRemainingTime(Number(defaultDur))
  }, [defaultDur])

  const createNewSession = useCallback(() => {
    return {
      session_type: 'productive',
      end_time: Date.now(),
      duration_s: countdownDuration - remainingTime,
    }
  }, [countdownDuration, remainingTime, note, doneTask]);

  const finishSession = useCallback(async () => {
    setIsRunning(false);
    setRemainingTime(Number(defaultDur)); // Use defaultDur to reset
    try {
      await saveSession(createNewSession());
      setNote('');
      setDoneTask([]);
    } catch (err) {
      console.log("Something wrong when saving session")
    }
  }, [defaultDur, createNewSession]);

  // --- Timer Interval ---
  useEffect(() => {
    if (isRunning) {
      endTimeRef.current = Date.now() + remainingTime;
      timerIntervalRef.current = setInterval(() => {
        const t = endTimeRef.current - Date.now();
        if (t >= 0) {
          setRemainingTime(t);
        } else {
          clearInterval(timerIntervalRef.current);
          finishSession();
        }
      }, 200);
    } else {
      clearInterval(timerIntervalRef.current);
    };

    return () => clearInterval(timerIntervalRef.current); // Prevents Zombie timer or double intervals, cleanup the interval
  }, [isRunning, finishSession]);

  return (
    <TimerContext.Provider
      value={{
        isRunning,
        setIsRunning,
        remainingTime,
        setRemainingTime,
        countdownDuration,
        setCountdownDuration,
        note,
        setNote,
        doneTask,
        setDoneTask,
        finishSession
      }}
    >
      {children}
    </TimerContext.Provider>
  )
}