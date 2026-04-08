import { useState, useRef, useEffect, useContext, useCallback, useReducer, useMemo } from "react";
import { timerCycleContext, timerTimeContext, timerDispatchContext } from "./timerContext";
import { SettingsContext } from "../settings/settingsContext";
import { SessionsDispatchContext } from "../sessions/sessionsContext";

const TimerProvider = ({ children }) => {
  const { settings } = useContext(SettingsContext);
  const { focus_dur } = settings;
  const { handleAddSession } = useContext(SessionsDispatchContext);

  // --- States --- 
  const initialCycleState = {
    dur: Number(focus_dur),
    isRunning: false,
    isEditing: false,
    note: '',
    type: 'productive',
  }
  const [cycle, dispatchCycle] = useReducer(cycleReducer, initialCycleState);
  const [remainingTime, setRemainingTime] = useState(cycle.dur); // For countdown
  function cycleReducer(state, action) {
    switch (action.type) {
      case 'SET_DUR':
        return { ...state, dur: Number(action.payload) }
      case 'SET_NOTE':
        return { ...state, note: action.payload }
      case 'TOGGLE_EDIT':
        return { ...state, isEditing: action.payload }
      case 'TOGGLE_RUN':
        return { ...state, isRunning: action.payload }
      case 'RESET':
        return { ...initialCycleState, dur: state.dur };
      default:
        return state;
    }
  }

  const finishSession = async () => {
    const createNewSession = () => {
      return {
        session_type: 'productive',
        end_time: Date.now(),
        duration_s: cycle.dur - remainingTime,
        notes: cycle.note,
      }
    };
    dispatchCycle({ type: "TOGGLE_RUN", payload: false });
    setRemainingTime(Number(cycle.dur)); // Use defaultDur to reset
    try {
      await handleAddSession(createNewSession());
      dispatchCycle({ type: "RESET" });
    } catch (err) {
      console.log(err)
    }
  };


  // --- Time Refs --- 
  const timerIntervalRef = useRef(null);
  const endTimeRef = useRef(0);

  // --- Effects ---
  useEffect(() => {
    dispatchCycle({ type: "SET_DUR", payload: focus_dur });
    setRemainingTime(Number(focus_dur))
  }, [focus_dur])

  // --- Timer Interval ---
  useEffect(() => {
    if (cycle.isRunning) {
      endTimeRef.current = Date.now() + remainingTime;
      timerIntervalRef.current = setInterval(() => {
        const t = endTimeRef.current - Date.now();
        if (t >= 0) {
          setRemainingTime(t);
        } else {
          clearInterval(timerIntervalRef.current);
          finishSession();
        }
      }, 100);
    } else {
      clearInterval(timerIntervalRef.current);
    };
    return () => clearInterval(timerIntervalRef.current); // Prevents Zombie timer or double intervals, cleanup the interval
  }, [cycle, finishSession]);


  const dispatchValue = useMemo(
    () => ({
      setRemainingTime,
      finishSession,
      dispatchCycle
    }), [setRemainingTime, finishSession, dispatchCycle]
  )

  return (
    <timerTimeContext.Provider value={remainingTime}>
      <timerCycleContext.Provider value={cycle}>
        <timerDispatchContext.Provider value={dispatchValue}>
          {children}
        </timerDispatchContext.Provider >
      </timerCycleContext.Provider>
    </timerTimeContext.Provider >
  )
}

export default TimerProvider;
