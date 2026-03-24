import { useContext, useEffect } from 'react';
import { SessionsContext, SessionsDispatchContext } from '../../contexts/app/sessions/sessionsContext';

export const Stats = () => {
  const { sessions } = useContext(SessionsContext)
  const { handleGetSessions } = useContext(SessionsDispatchContext)

  useEffect(() => {
    handleGetSessions()
  }, [])

  useEffect(() => {
    console.log(sessions)
  }, [sessions])

  return (
    <>
      {sessions.map((session) => (
        <div key={session.id}>
          <p>{session.session_type}</p>
          <p>{session.end_time}</p>
          <p>{session.duration_s}</p>
        </div>
      ))}
    </>
  )
}