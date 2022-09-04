import {FC, useState} from "react"
import {BsChevronDown, BsChevronUp} from 'react-icons/bs'

import {useAppDispatch, useAppSelector} from "../../hooks";
import {categoryActions, productActions} from "../../redux";
import {CategoryForControl} from "../CategoryForControl/CategoryForControl";
import css from './CategoriesControl.module.css'

const CategoriesControl: FC = () => {
    const {categories} = useAppSelector(({categoryReducer}) => categoryReducer);
    const [categoryValue, setCategoryValue] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const createBtnDisabled = !categoryValue || (categoryValue.length > 50)

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
        <div>
            <div className={css.category_header} onClick={activate}>
                <span>Categories</span>
                {isActive ? <BsChevronUp/> : <BsChevronDown/>}
            </div>

            {isActive && <div>
                <label>New Category: </label>
                <input type="text" onChange={(e) => setCategoryValue(e.target.value)} value={categoryValue}/>
                <button onClick={createCategory} disabled={createBtnDisabled}>create</button>

                {categories.map(category => <CategoryForControl key={category.id} category={category}/>)}
            </div>}
            <hr/>
        </div>
    );
};

export {CategoriesControl};