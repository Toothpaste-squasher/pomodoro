import { useRef } from 'react';
import { Move, Minus } from 'lucide-react';
import { useDrag } from '../../hooks/useDrag';
import s from './floatWindow.module.scss';


export const FloatWindow = ({ children, title }) => {
  const handleRef = useRef(null);
  const windowRef = useRef(null);
  useDrag(handleRef, windowRef)

  return (
    <div
      ref={windowRef}
      className={s.window}
    >
      <div className={s.header}>
        <Move
          ref={handleRef}
          className={s.handle}
          onMouseDown={(e) => e.stopPropagation()}
        />
        <h3 className={s.title}>{title}</h3>
        <Minus
          className={s.minimize}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      {children}
    </div >
  )
}