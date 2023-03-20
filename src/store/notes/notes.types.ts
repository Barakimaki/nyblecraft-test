export enum NOTES_ACTION_TYPES {
    ADD_NOTE = 'notes/ADD_NOTE',
    DELETE_NOTE = 'notes/DELETE_NOTE',
    UPDATE_NOTE = 'notes/UPDATE_NOTE',
    ADD_TAG_TO_FILTER = 'notes/ADD_TAG_TO_FILTER',
    REMOVE_TAG_FROM_FILTER = 'notes/REMOVE_TAG_FROM_FILTER'
}

export type Note = {
    id: string
    title: string
    description: string
    tags: string[]
}