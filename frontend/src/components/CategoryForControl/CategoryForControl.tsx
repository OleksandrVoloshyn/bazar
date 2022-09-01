import {FC, useState} from "react"
import {BsFillPencilFill, BsTrash} from "react-icons/bs";

import {productActions} from "../../redux";
import {ICategory} from "../../interfaces";
import {useAppDispatch} from "../../hooks";

interface IProps {
    category: ICategory
}

const CategoryForControl: FC<IProps> = ({category}) => {
    const [categoryIdForUpdate, setCategoryIdForUpdate] = useState<string | null>(null)
    const [isUpdating, setIsUpdating] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>('')
    const dispatch = useAppDispatch();

    const updateBtnDisabled = !newTitle || (newTitle.length > 50)

    const toUpdateCategory = async (data: ICategory) => {
        setIsUpdating(true)
        setCategoryIdForUpdate(data.id)
        setNewTitle(data.title)
    }

    const updateCategory = async (pk: string) => {
        setCategoryIdForUpdate(null)
        await dispatch(productActions.updateCategory({pk, title: newTitle}))
        setIsUpdating(false)
    }

    return (
        <div key={category.id}>
            {isUpdating && (category.id === categoryIdForUpdate)
                ? <div>
                    <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
                    <button onClick={() => updateCategory(category.id)} disabled={updateBtnDisabled}>save</button>
                </div>
                : <div>{category.title}
                    <BsFillPencilFill onClick={() => toUpdateCategory(category)}/>
                    <BsTrash onClick={() => dispatch(productActions.removeCategory({pk: category.id}))}/>
                </div>}
        </div>
    );
};

export {CategoryForControl};