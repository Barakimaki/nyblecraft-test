import {Note, NOTES_ACTION_TYPES} from "./notes.types"
import {ActionWithPayload, createAction, withMatcher} from "../../utils/reducer/reducer.utils";


export type AddNote = ActionWithPayload<NOTES_ACTION_TYPES.ADD_NOTE, Note>

export const addNote = withMatcher((note: Note): AddNote =>
    createAction(NOTES_ACTION_TYPES.ADD_NOTE, note)
)

export type DeleteNote = ActionWithPayload<NOTES_ACTION_TYPES.DELETE_NOTE, string>

export const deleteNote = withMatcher((id: string): DeleteNote =>
    createAction(NOTES_ACTION_TYPES.DELETE_NOTE, id)
)

export type UpdateNote = ActionWithPayload<NOTES_ACTION_TYPES.UPDATE_NOTE, Note>

export const updateNote = withMatcher((note: Note): UpdateNote =>
    createAction(NOTES_ACTION_TYPES.UPDATE_NOTE, note)
)

export type AddTagToFilter = ActionWithPayload<NOTES_ACTION_TYPES.ADD_TAG_TO_FILTER, string>

export const addTagToFilter = withMatcher((tag: string): AddTagToFilter =>
    createAction(NOTES_ACTION_TYPES.ADD_TAG_TO_FILTER, tag)
)

export type RemoveTagFromFilter = ActionWithPayload<NOTES_ACTION_TYPES.REMOVE_TAG_FROM_FILTER, string>

export const removeTagFromFilter = withMatcher((tag: string): RemoveTagFromFilter =>
    createAction(NOTES_ACTION_TYPES.REMOVE_TAG_FROM_FILTER, tag)
)
