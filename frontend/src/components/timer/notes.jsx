import React, { memo } from 'react'
import s from './timerComp.module.scss';


const Notes = memo(({ notes, setNotes }) => {

  const handleChange = (newNote) => {
    setNotes(newNote);
  }

  return (
    <div className={s.notesContainer}>
      <h2>Notes</h2>
      <textarea
        className={s.notesArea}
        placeholder="Jot down your thoughts..."
        value={notes}
        onChange={e => handleChange(e.target.value)}
      />
    </div>
  )
})

export { Notes };