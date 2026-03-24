import { SessionsContext, SessionsDispatchContext } from "./sessionsContext";
import { useLayoutEffect, useReducer, useMemo } from "react";
import useSessionService from "../../../hooks/services/sessionService";

const SessionsProvider = ({ children }) => {
  const [sessions, dispatchSessions] = useReducer(sessionReducer, [])
  const { getSessions, saveSession } = useSessionService()

  function sessionReducer(state, action) {
    switch (action.type) {
      case 'SET':
        return action.payload

      case 'ADD':
        return [...state, action.payload]

      default:
        return state
    }
  }

  const handleGetSessions = async () => {
    try {
      const sessionsFetched = await getSessions();
      dispatchSessions({ type: 'SET', payload: sessionsFetched })
    } catch (err) {
      console.error("Error fetching sessions:", err)
    }
  }

  const handleAddSession = async (sessionData) => {
    try {
      const newSession = await saveSession(sessionData)
      dispatchSessions({ type: 'ADD', payload: newSession })
    } catch (err) {
      console.error("Error saving session:", err)
    }
  }

  const dispatchValue = useMemo(() => ({
    handleGetSessions,
    handleAddSession
  }), [dispatchSessions])

  return (
    <SessionsContext.Provider value={{ sessions }}>
      <SessionsDispatchContext.Provider value={dispatchValue}>
        {children}
      </SessionsDispatchContext.Provider>
    </SessionsContext.Provider>
  )
}

export default SessionsProvider;