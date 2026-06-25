import { useContext } from "react";
import { timerTimeContext, timerCycleContext } from "../../contexts/app/timer/timerContext";
import s from './pgcircle.module.scss'

const TimerCircle = () => {
  const { remainingTime } = useContext(timerTimeContext)
  const { cycle } = useContext(timerCycleContext)
  const { dur } = cycle
  const progressPercent = Math.max(0, 1 - remainingTime / dur);

  return (
    <svg className={s.timerCircle} viewBox="0 0 400 400">
      <defs>
        {/* Pulse animation for the progress head */}
        <filter id="headGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.66 0 0 0 0 0.33 0 0 0 0 0.97 0 0 0 1 0" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background Track (Glassy) */}
      <circle className={s.backgroundTrack} />

      {/* Progress Arc (Neon) */}
      {(cycle.isRunning || remainingTime < dur) && (
        <circle
          className={s.progressArc}
          style={{
            '--progress-percent': progressPercent,
          }}
        />
      )}
    </svg>
  );
};

export { TimerCircle };