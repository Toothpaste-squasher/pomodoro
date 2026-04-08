import { useContext, useEffect, useState } from 'react';
import { SessionHistory } from '../../components/stats/history';

export const Stats = () => {
  const [openHistory, setOpenHistory] = useState(false);

  return (
    <>
      <button className='history-button' onClick={() => setOpenHistory(true)}>i</button>
      {openHistory ?
        <div className='modal-bg'>
          <SessionHistory setOpenHistory={setOpenHistory} />
        </div>
        : ''}
    </>
  )
}