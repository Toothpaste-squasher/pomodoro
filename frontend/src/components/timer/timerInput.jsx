import React, { useState, useEffect, useRef, useCallback } from 'react';

import { timeToHMS, HMSToTime } from '../../utils/timeUtils';


const InputTime = ({ cdd, setCdd, setIsEditing }) => {
  const { h, m, s } = timeToHMS(cdd);
  console.log(cdd)

  const [HMS, setHMS] = useState([h, m, s]);

  const handleSubmit = () => {
    const [H, M, S] = HMS;
    const newCdd = HMSToTime(H, M, S);
    setCdd(newCdd);
    console.log(newCdd)
    setIsEditing(false);
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
            onKeyDown={(e) => { if (e.key === "Enter") handleSubmit() }}
          />
          {index < 2 && <span>:</span>}
        </React.Fragment>
      ))}
    </div>
  )
};

export { InputTime };