import {FC, useState} from "react"
import {BsChevronDown, BsChevronUp} from 'react-icons/bs'

import {useAppDispatch, useAppSelector} from "../../hooks";
import {categoryActions} from "../../redux";
import {CategoryForControl} from "../CategoryForControl/CategoryForControl";
import css from './CategoriesControl.module.css'

const CategoriesControl: FC = () => {
    const {categories} = useAppSelector(({categoryReducer}) => categoryReducer);
    const dispatch = useAppDispatch();
    const [categoryValue, setCategoryValue] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(false);

    const createBtnDisabled = !categoryValue || (categoryValue.length > 25)

    const activate = async () => {
        setIsActive(prevState => !prevState)
        if (!isActive && !categories.length) {
            await dispatch(categoryActions.getCategories())
        }
    }

    const createCategory = async () => {
        await dispatch(categoryActions.createCategory({categoryTitle: categoryValue}))
        setCategoryValue('')
    }


    return (
        <div className={css.wrap}>
            <div className={css.category_header} onClick={activate}>
                <span>Categories</span>
                {isActive ? <BsChevronUp/> : <BsChevronDown/>}
            </div>

            {isActive && <div>
                <div className={css.input_line}>
                    <label>New Category: </label>
                    <input onChange={(e) => setCategoryValue(e.target.value)} value={categoryValue}/>
                    <button onClick={createCategory} disabled={createBtnDisabled}>create</button>
                </div>

                {categories.map(category => <CategoryForControl key={category.id} category={category}/>)}
            </div>}
        </div>
    );
};

export {CategoriesControl};