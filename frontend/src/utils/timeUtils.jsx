
export const timeToHMS = (time) => {
  // Set time components
  const h = Math.floor(time / 3600000);
  const m = Math.floor((time % 3600000) / 60000);
  const s = Math.floor((time % 60000) / 1000);
  return { h, m, s }
}

export const formatTimerTime = (time) => {
  const { EH, EM, ES } = timeToHMSDisplay(time);
  return (
    <div>
      {EH}:{EM}:{ES}
    </div>
  )
}

export const timeToHMSDisplay = (time) => {
  const { h, m, s } = timeToHMS(time);
  return {
    EH: h.toString().padStart(2, '0'),
    EM: m.toString().padStart(2, '0'),
    ES: s.toString().padStart(2, '0')
  };
}

export const HMSToTime = (h, m, s) => {
  return h * 3600000 + m * 60000 + s * 1000;
}