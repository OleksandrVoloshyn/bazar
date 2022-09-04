import {FC, useEffect} from "react"
import {useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {categoryActions} from "../../redux";

const CategoryBar: FC = () => {
    const {categories} = useAppSelector(({categoryReducer}) => categoryReducer);
    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams();
    const queryObj = Object.fromEntries(query.entries())

    useEffect(() => {
        dispatch(categoryActions.getCategories())
    }, [dispatch])

    const setCategory = (title: string) => {
        queryObj.category = title
        setQuery(queryObj)
    }

    return (
        <div>
            {categories && categories.map(category => <div
                onClick={() => setCategory(category.title)}>{category.title}</div>)}
        </div>
    );
};

export {CategoryBar};