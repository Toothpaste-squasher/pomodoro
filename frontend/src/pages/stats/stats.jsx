import { useContext, useEffect, useState, useRef } from 'react';
import { SessionHistory } from '../../components/stats/history';
import { useDrag } from '../../hooks/useDrag';

export const Stats = () => {
  const [openHistory, setOpenHistory] = useState(false);
  const elementRef = useRef(null);
  const { position } = useDrag(elementRef)



  return (
    <>
      <div
        ref={elementRef}
        style={{
          width: '100px',
          height: '100px',
          color: 'white',
          backgroundColor: 'red',
          position: 'fixed',
          top: position.y,
          left: position.x,
        }}
      >
        drag me
      </div>



      <button className='history-button' onClick={() => setOpenHistory(true)}>i</button>
      {openHistory ?
        <div className='modal-bg'>
          <SessionHistory setOpenHistory={setOpenHistory} />
        </div>
        : ''}
    </>
  )
}