import {useDispatch} from "react-redux";
import {addTagToFilter} from "../../store/notes/notes.action";
import style from './tag.module.scss'

type Props = {
    tag: string
}

const Tag = ({tag}: Props) => {

    const dispatch = useDispatch()

    return (
        <span className={style.tag} onClick={() => {
            dispatch(addTagToFilter(tag))
        }}>
            {tag}
        </span>
    );
};

export default Tag;