import {FC, useState} from "react"
import {BsFillPencilFill, BsTrash} from "react-icons/bs";

import {categoryActions} from "../../redux";
import {ICategory} from "../../interfaces";
import {useAppDispatch} from "../../hooks";
import css from './CategoryForControl.module.css'

interface IProps {
    category: ICategory
}

const CategoryForControl: FC<IProps> = ({category}) => {
    const dispatch = useAppDispatch();
    const [isUpdating, setIsUpdating] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>('')

    const updateBtnDisabled = !newTitle || newTitle.length > 25

    const setCategory = (): void => {
        setIsUpdating(true)
        setNewTitle(category.title)
    }

    const updateCategory = async () => {
        await dispatch(categoryActions.updateCategory({pk: category.id, title: newTitle}))
        setIsUpdating(false)
    }

    return (
        isUpdating
            ? <div>
                <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
                <button onClick={() => updateCategory()} disabled={updateBtnDisabled}>save</button>
            </div>
            : <div className={css.icons}>{category.title}
                <BsFillPencilFill onClick={() => setCategory()}/>
                <BsTrash onClick={() => dispatch(categoryActions.removeCategory({pk: category.id}))}/>
            </div>
    );
};

export {CategoryForControl};