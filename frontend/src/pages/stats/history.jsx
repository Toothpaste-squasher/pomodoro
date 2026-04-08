import { useContext, useEffect, useState } from 'react';
import { SessionsContext, SessionsDispatchContext } from '../../contexts/app/sessions/sessionsContext';

export const SessionHistory = ({ setOpenHistory }) => {
  const { sessions } = useContext(SessionsContext)
  const { handleGetSessions } = useContext(SessionsDispatchContext)
  const [isLoading, setIsloading] = useState(true)

  useEffect(async () => {
    try {
      await handleGetSessions()
      setIsloading(true)
    } catch (err) {
      console.log("Error while fetching sessions: " + err)
    }
  }, [])

  return (
    <div className="session-modal">
      <div className='close-bt' onClick={() => setOpenHistory(false)}>x</div>
      <div className='session-list'>
        {sessions.map((session) => (
          <div key={session.id}>
            <p>{session.session_type}</p>
            <p>{session.end_time}</p>
            <p>{session.duration_s}</p>
          </div>
        ))}
      </div>
    </div>
  )
}