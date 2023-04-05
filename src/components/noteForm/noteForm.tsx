import { ChangeEvent, useEffect, useState } from 'react'
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  TextField,
} from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import style from './noteForm.module.scss'
import Tag from '../tag/tag'
//
import notesStore, { Note } from '../../store/notes'
import { observer } from 'mobx-react-lite'

type Props = {
  closeForm: () => void
  id?: string
}

const NoteForm = observer(({ closeForm, id = '' }: Props) => {
  let [inputError, setInputError] = useState(false)

  const note = notesStore.notes.find((note) => note.id === id)
  const [title, setTitle] = useState(note?.title || '')
  const [description, setDescription] = useState(note?.description || '')
  const [tags, setTags] = useState(note?.tags || ([] as string[]))
  const onDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }
  useEffect(() => {
    let newTags: string[] = []
    const descriptionArray = description.split(/[^#\wА-Яа-я]+/g)
    descriptionArray.forEach((item) => {
      if (item[0] === '#' && item.length > 1) {
        newTags.push(item)
      }
    })
    newTags = newTags.filter((element, index) => {
      return newTags.indexOf(element) === index
    })
    setTags(newTags)
  }, [description])

  const updateNoteToNotes = () => {
    if (title.length > 0 && note) {
      const updatedNote: Note = {
        id: note.id,
        title: title,
        description: description,
        tags: tags,
      }
      console.log(updatedNote)
      notesStore.updateNote(updatedNote)
      closeForm()
    } else {
      setInputError(true)
    }
  }

  const addNoteToNotes = () => {
    if (title.length > 0) {
      const newNote: Note = {
        id: uuidv4(),
        title: title,
        description: description,
        tags: tags,
      }
      notesStore.addNote(newNote)
      closeForm()
    } else {
      setInputError(true)
    }
  }

  return (
    <form action="" className={style.form}>
      <div>
        <FormControl error={inputError} variant="standard">
          <Input
            placeholder="Заголовок"
            defaultValue={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setInputError(false)
              setTitle(e.target.value)
            }}
          />
          {inputError && (
            <FormHelperText id="component-error-text">
              Заголовок не может быть пустым
            </FormHelperText>
          )}
        </FormControl>
      </div>
      <div className={style.textField}>
        <TextField
          id="outlined-multiline-static"
          label="Описание"
          multiline
          fullWidth={true}
          rows={4}
          defaultValue={description}
          onChange={onDescriptionChange}
        />
      </div>
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} />
      ))}
      <div className={style.buttons}>
        {note ? (
          <Button
            variant="contained"
            onClick={() => {
              updateNoteToNotes()
            }}
          >
            Редактировать
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              addNoteToNotes()
            }}
          >
            Добавить
          </Button>
        )}
      </div>
    </form>
  )
})

export default NoteForm
