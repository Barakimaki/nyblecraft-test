import { createSelector } from 'reselect'
import { RootState } from '../store'
import { NotesState } from './notes.reducer'

const selectNotesReducer = (state: RootState): NotesState => state.notes

export const selectNotes = createSelector(
  [selectNotesReducer],
  (notes) => notes.notes,
)

export const selectNote = (id: string) =>
  createSelector([selectNotesReducer], (notes) => {
    for (let note of notes.notes) {
      if (note.id === id) {
        return note
      }
    }
    return null
  })

export const selectTagFilter = createSelector(
  [selectNotesReducer],
  (notes) => notes.tagFilter,
)
