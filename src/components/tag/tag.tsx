import style from './tag.module.scss'
import notesStore from '../../store/notes'

type Props = {
  tag: string
}

const Tag = ({ tag }: Props) => {
  return (
    <span
      className={style.tag}
      onClick={() => {
        notesStore.addTagToFilter(tag)
      }}
    >
      {tag}
    </span>
  )
}

export default Tag
