import React, { ChangeEvent, useState } from 'react'
import Note from '../note/note'
import { useDispatch, useSelector } from 'react-redux'
import { selectNotes, selectTagFilter } from '../../store/notes/notes.selector'

import style from './notes.module.scss'
import { Button, IconButton, Input } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import {
  addTagToFilter,
  removeTagFromFilter,
} from '../../store/notes/notes.action'

const Notes = () => {
  const dispatch = useDispatch()

  const notes = useSelector(selectNotes) || []
  const tagFilter = useSelector(selectTagFilter) || []
  const [newTagFilterItem, setNewTagFilterItem] = useState('')

  const addNewTagToFilter = () => {
    let newTag
    if (newTagFilterItem.length > 0) {
      if (newTagFilterItem[0] === '#') {
        newTag = newTagFilterItem
      } else {
        newTag = '#' + newTagFilterItem
      }
      dispatch(addTagToFilter(newTag))
    }
    setNewTagFilterItem('')
  }

  return (
    <div className={style.notes}>
      <div className={style.tagFilter}>
        {tagFilter.map((tag) => (
          <span key={tag} className={style.tag}>
            {tag}
            <IconButton color="error" title="Удалить">
              <ClearIcon
                onClick={() => {
                  dispatch(removeTagFromFilter(tag))
                }}
              />
            </IconButton>
          </span>
        ))}
        <Input
          placeholder="Введите тег"
          value={newTagFilterItem}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setNewTagFilterItem(e.target.value)
          }}
        />
        <Button onClick={addNewTagToFilter}>Добавить тег</Button>
      </div>
      <div className={style.noteList}>
        {notes
          .filter((note) => {
            let flag = true
            tagFilter.forEach((tag) => {
              if (note.tags.includes(tag)) {
                flag = true
              } else {
                flag = false
                return
              }
            })
            return flag
          })
          .map((note) => (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              description={note.description}
              tags={note.tags}
            />
          ))}
      </div>
    </div>
  )
}

export default Notes;