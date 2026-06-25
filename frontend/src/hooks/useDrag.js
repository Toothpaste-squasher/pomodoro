import { useEffect, useState } from "react"
// hr = handleRef
// tr = targetRef

export const useDrag = (hr, tr = hr) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [grabbing, setGrabbing] = useState(false)
  const [offSet, setOffSet] = useState({ xo: 0, yo: 0 })

  // Attach the mousedown listener to the element itself
  useEffect(() => {
    const node = hr.current;
    const parent = tr.current;
    if (!node || !parent) {
      console.error("useDrag.js: invalid ref object passed");
      return;
    }
    const handleMouseDown = (e) => {
      setGrabbing(true)
      const { left, top } = parent.getBoundingClientRect();
      const newOffSet = {
        xo: e.clientX - left,
        yo: e.clientY - top
      };
      setOffSet(newOffSet);
    }

    node.addEventListener('mousedown', handleMouseDown)
    return () => {
      node.removeEventListener('mousedown', handleMouseDown)
    }
  }, []);

  useEffect(() => {
    if (!grabbing) return;

    const handleMouseUp = () => {
      setGrabbing(false)
    }

    const handleMouseMove = (e) => {
      const newPos = {
        x: e.clientX - offSet.xo,
        y: e.clientY - offSet.yo
      }
      setPosition(newPos);
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [grabbing])

  useEffect(() => {
    if (!position) return;
    tr.current.style.left = position.x + 'px';
    tr.current.style.top = position.y + 'px';
  }, [position])

  return { position }
}