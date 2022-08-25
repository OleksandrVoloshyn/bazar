import {FC, useEffect, useState} from "react"
import {useAppDispatch, useAppSelector} from "../../../hook";
import {productActions} from "../../../redux";

const AddValuesPage: FC = () => {
    //todo add remove brand add remove category
    const {categories, brands} = useAppSelector(({productReducer}) => productReducer);
    const dispatch = useAppDispatch();
    const [categoryValue, setCategoryValue] = useState<string>('');

    useEffect(() => {
        dispatch(productActions.getCategories())
        dispatch(productActions.getBrands)
    }, [dispatch])

    const addNewCategory = () => {
        dispatch(productActions.createCategory(categoryValue))
    }
    const removeCategory = (id: string) => {
        dispatch(productActions.removeCategory(id))
    }

    return (
        <div>
            <div>
                <div><label>New Category: <input type="text" onChange={(e) => setCategoryValue(e.target.value)}
                                                 value={categoryValue}/></label>
                    <button onClick={addNewCategory} disabled={!categoryValue}>add</button>
                </div>
                {categories.map(category => <div key={category.id}>{category.title}<span
                    onClick={() => removeCategory(category.id)}>X</span></div>)}
            </div>
        </div>
    );
};

export {AddValuesPage};