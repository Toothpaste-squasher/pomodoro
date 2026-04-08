import './studyNotes.scss'


const Notes = ({ notes, setNotes }) => {

  const handleChange = (newNote) => {
    setNotes(newNote);
  }

  return (
    <div className="notes-container">
      <h2>Notes</h2>
      <textarea
        className="notes-area"
        placeholder="Jot down your thoughts..."
        value={notes}
        onChange={e => handleChange(e.target.value)}
      />
    </div>
  )
}

export { Notes };