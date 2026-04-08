import React, { useState, useContext } from 'react';

import { timeToHMS, HMSToTime } from '../../utils/timeUtils';
import { timerContext, timerDispatchContext } from '../../contexts/app/timer/timerContext';


const InputTime = ({ }) => {
  const { cycle } = useContext(timerContext)
  const { setRemainingTime, dispatchCycle } = useContext(timerDispatchContext)
  const { h, m, s } = timeToHMS(cycle.dur);

  const [HMS, setHMS] = useState([h, m, s]);

  const handleSubmit = (e) => {
    if (e.key !== "Enter") return;
    const [H, M, S] = HMS;
    const newDur = HMSToTime(H, M, S);
    dispatchCycle({ type: 'SET_DUR', payload: newDur });
    setRemainingTime(newDur)
    console.log(newDur)
    dispatchCycle({ type: 'TOGGLE_EDIT', payload: false });
  }

  const handleChange = (v, index) => {
    let value = v
    /* corrections */
    if (index === 0 && value > 99) {    // H > 99
      value = 99
    } else if (index !== 0 && value > 59) {    // M||S > 59
      value = 59
    }
    /* update HMS */
    setHMS((prev) => {
      const newHMS = prev.map((object, i) => {
        if (i === index) {
          return value;
        } else {
          return object;
        }
      })
      console.log(newHMS)
      return newHMS;
    })
  }


  return (
    <div className='timer-input-container'>
      {HMS.map((c, index) => (
        <React.Fragment key={index}>
          <input
            value={c.toString().padStart(2, '0')}
            onChange={e => handleChange(Number(e.target.value), index)}
            className='timer-input'
            onFocus={e => e.target.select()}
            onKeyDown={handleSubmit}
          />
          {index < 2 && <span>:</span>}
        </React.Fragment>
      ))}
    </div>
  )
};

export { InputTime };