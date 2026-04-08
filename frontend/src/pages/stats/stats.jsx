import { useContext, useEffect, useState } from 'react';
import { SessionHistory } from './history';

export const Stats = () => {
  const [openHistory, setOpenHistory] = useState(false);

  return (
    <>
      <div className='history-button' onClick={() => setOpenHistory(true)}>i</div>
      {openHistory ?
        <div className='modal-bg'>
          <SessionHistory setOpenHistory={setOpenHistory} />
        </div>
        : ''}
    </>
  )
}