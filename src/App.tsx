import React, { useState } from 'react'
import './App.scss'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import { IconButton } from '@mui/material'
import NoteForm from './components/noteForm/noteForm'
import Notes from './components/notes/notes'

function App() {
  const [isNewNoteFormActive, setIsNewNoteFormActive] = useState(false)
  return (
    <div className="App">
      <div className="Add-note">
        <IconButton color="primary" size="large" title="Добавить заметку">
          <AddCircleOutlineRoundedIcon
            onClick={() => {
              setIsNewNoteFormActive(!isNewNoteFormActive)
            }}
          />
        </IconButton>
      </div>
      {isNewNoteFormActive && (
        <NoteForm
          closeForm={() => {
            setIsNewNoteFormActive(false)
          }}
        />
      )}
      <Notes />
    </div>
  )
}

export default App
