import { Note } from './notes.types'
import { AnyAction } from 'redux'
import {
  addNote,
  addTagToFilter,
  deleteNote,
  removeTagFromFilter,
  updateNote,
} from './notes.action'

export type NotesState = {
  notes: Note[]
  tagFilter: string[]
}

const NOTES_INITIAL_STATE: NotesState = {
  notes: [],
  tagFilter: [],
}

const notesReducer = (
  state = NOTES_INITIAL_STATE,
  action: AnyAction,
): NotesState => {
  if (addNote.match(action)) {
    return { ...state, notes: [action.payload, ...state.notes] }
  }
  if (deleteNote.match(action)) {
    const newNotes = [...state.notes].filter(
      (note) => note.id !== action.payload,
    )
    return {
      ...state,
      notes: newNotes,
    }
  }
  if (updateNote.match(action)) {
    const newNotes = [...state.notes].map((note) => {
      if (note.id === action.payload.id) {
        return action.payload
      } else {
        return note
      }
    })
    return {
      ...state,
      notes: newNotes,
    }
  }
  if (addTagToFilter.match(action)) {
    let newTagFilter = [...state.tagFilter, action.payload]
    newTagFilter = newTagFilter.filter((element, index) => {
      return newTagFilter.indexOf(element) === index
    })
    return {
      ...state,
      tagFilter: newTagFilter,
    }
  }
  if (removeTagFromFilter.match(action)) {
    const newTagFilter = [...state.tagFilter].filter(
      (tag) => tag !== action.payload,
    )
    return {
      ...state,
      tagFilter: newTagFilter,
    }
  }
  return state
}

export default notesReducer