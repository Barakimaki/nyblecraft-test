import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { CardActions, CardContent } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import { useDispatch } from 'react-redux'
import { deleteNote } from '../../store/notes/notes.action'
import Tag from '../tag/tag'
import { useEffect, useState } from 'react'
import NoteForm from '../noteForm/noteForm'

type Props = {
  key: string
  id: string
  title: string
  description: string
  tags: string[]
}

const Note = ({ id, title, description, tags }: Props) => {
  const [editMode, setEditMode] = useState(false)

  const dispatch = useDispatch()
  const [myDescription, setMyDescription] = useState('')
  useEffect(() => {
    const newDescription = description.replaceAll('#', '')
    setMyDescription(newDescription)
  }, [description])

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {myDescription}
        </Typography>
        {tags.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </CardContent>
      <CardActions>
        <IconButton
          color="primary"
          title="Редактировать"
          onClick={() => {
            setEditMode(!editMode)
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="error"
          title="Удалить"
          onClick={() => {
            dispatch(deleteNote(id))
          }}
        >
          <DeleteRoundedIcon />
        </IconButton>
      </CardActions>
      {editMode && <NoteForm closeForm={() => setEditMode(false)} id={id} />}
    </Card>
  )
}

export default Note
