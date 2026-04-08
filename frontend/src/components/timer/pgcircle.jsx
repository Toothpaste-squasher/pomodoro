import { useContext } from "react";
import { timerTimeContext, timerCycleContext } from "../../contexts/app/timer/timerContext";


// --- Constants ---
const SVG_SIZE = 300;
const CIRCLE_CENTRE = SVG_SIZE / 2;
const STROKE_WIDTH = 12; // Slightly thicker for neon look
const CIRCLE_RADIUS = SVG_SIZE / 2 - STROKE_WIDTH / 2 - 10;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;
const VISIBLE_PERCENT = 0.75; // 270 degrees
const MAX_STROKE = CIRCUMFERENCE * VISIBLE_PERCENT;

const TimerCircle = () => {
  const remainingTime = useContext(timerTimeContext)
  const { dur } = useContext(timerCycleContext)

  const progress = Math.max(0, MAX_STROKE * (1 - remainingTime / dur));

  return (
    <svg className="timer-circle" viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}>
      <defs>
        {/* Main vibrant gradient */}
        <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>

        {/* Outer neon glow filter */}
        <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Pulse animation for the progress head */}
        <filter id="headGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.66 0 0 0 0 0.33 0 0 0 0 0.97 0 0 0 1 0" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background Track (Glassy) */}
      <circle
        className="background-track"
        stroke="rgba(255, 255, 255, 0.05)"
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        fill="transparent"
        r={CIRCLE_RADIUS}
        cx={CIRCLE_CENTRE}
        cy={CIRCLE_CENTRE}
        style={{
          transform: 'rotate(135deg)',
          transformOrigin: '50% 50%',
          strokeDasharray: `${MAX_STROKE} ${CIRCUMFERENCE}`,
        }}
      />

      {/* Progress Arc (Neon) */}
      <circle
        className="progress-arc"
        stroke="url(#neonGradient)"
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        fill="transparent"
        r={CIRCLE_RADIUS}
        cx={CIRCLE_CENTRE}
        cy={CIRCLE_CENTRE}
        filter="url(#neonGlow)"
        style={{
          transition: 'stroke-dasharray 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: 'rotate(135deg)',
          transformOrigin: '50% 50%',
          strokeDasharray: `${progress} ${CIRCUMFERENCE}`,
        }}
      />
    </svg>
  );
};

export { TimerCircle };