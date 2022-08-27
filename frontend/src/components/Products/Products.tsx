import {FC, FormEvent, useEffect, useMemo} from "react"
import {useParams, useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hook";
import {Product} from "../Product/Product";
import {productActions} from "../../redux";

const Products: FC = () => {
    const {products, prev, next} = useAppSelector(({productReducer}) => productReducer);
    const [query, setQuery] = useSearchParams({page: '1'});
    const queryObj = useMemo(() => Object.fromEntries(query.entries()), [query]);
    const dispatch = useAppDispatch();
    const {title} = useParams();

    useEffect(() => {
        if (title) {
            queryObj['category'] = title
        }
        dispatch(productActions.getAll({QueryParamsObj: queryObj}))
    }, [dispatch, queryObj, title])

    const prevPage = (): void => {
        queryObj.page = (+queryObj.page - 1).toString()
        setQuery(queryObj)
    //    todo try to change
    }

    const nextPage = (): void => {
        queryObj.page = (+queryObj.page + 1).toString()
        setQuery(queryObj)
    }

    const pagination_ordering = (e: FormEvent) => {
        // todo find correct TS
        e.preventDefault()
        // @ts-ignore
        if (e.target.name === 'ordering') {
            // @ts-ignore
            e.target.value ? (queryObj.ordering = e.target.value) : (delete queryObj.ordering)
        }
        // @ts-ignore
        if (e.target.name === 'pagination') {
            // @ts-ignore
            queryObj.pagination = e.target.value
        }
        setQuery(queryObj)
    }
    return (
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            <div>
                <button onClick={prevPage} disabled={!prev}>Prev</button>
                <button onClick={nextPage} disabled={!next}>Next</button>
            </div>
            <div>
                <form onChange={e => pagination_ordering(e)}>
                    <select name="pagination">
                        <option value="15">15</option>
                        <option value="30">30</option>
                    </select>
                    <select name="ordering">
                        <option></option>
                        <option value="price">price</option>
                        <option value="-price">-price</option>
                        <option value="created_at">created_at</option>
                        <option value="-created_at">-created_at</option>
                    </select>
                </form>
            </div>
            <h1>Products</h1>
            {products && products.map(product => <Product key={product.id} product={product}/>)}
        </div>
    );
};

export {Products};