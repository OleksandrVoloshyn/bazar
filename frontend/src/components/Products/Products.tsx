import {FC, FormEvent, useEffect, useMemo} from "react"

import {useAppDispatch, useAppSelector} from "../../hook";
import {Product} from "../Product/Product";
import {productActions} from "../../redux";
import {useParams, useSearchParams} from "react-router-dom";

const Products: FC = () => {
    const {products, prev, next} = useAppSelector(({productReducer}) => productReducer);
    const [query, setQuery] = useSearchParams();
    const queryObj = useMemo(() => Object.fromEntries(query.entries()), [query]);
    const dispatch = useAppDispatch();
    const {title} = useParams();

    useEffect(() => {
        if (title) {
            queryObj['category'] = title
        }
        dispatch(productActions.getAll(queryObj))
    }, [dispatch, queryObj, title])

    const prevPage = (): void => {
        queryObj.page = (+queryObj.page - 1).toString()
        setQuery(queryObj)
    }

    const nextPage = (): void => {
        queryObj.page = (+queryObj.page + 1).toString()
        setQuery(queryObj)
    }

    const pagination = (e: FormEvent) => {
        e.preventDefault()
        // @ts-ignore
        queryObj.pagination = e.target.value
        setQuery(queryObj)
    }
    return (
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            <div>
                <button onClick={prevPage} disabled={!prev}>Prev</button>
                <button onClick={nextPage} disabled={!next}>Next</button>
            </div>
            <div>
                <form onChange={e => pagination(e)}>
                    <select name="pagination">
                        <option value="15">15</option>
                        <option value="30">30</option>
                    </select>
                </form>
            </div>
            <h1>Products</h1>
            {products && products.map(product => <Product product={product}/>)}
        </div>
    );
};

export {Products};