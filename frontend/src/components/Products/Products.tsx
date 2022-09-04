import {FC, useEffect, useMemo} from "react"
import {useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {Product} from "../Product/Product";
import {productActions} from "../../redux";
import css from './Products.module.css'
import {PageNavigate} from "../PageNavigate/PageNavigate";

const Products: FC = () => {
    const {products} = useAppSelector(({productReducer}) => productReducer);
    const [query, setQuery] = useSearchParams({page: '1'});
    const queryObj = useMemo(() => Object.fromEntries(query.entries()), [query]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(productActions.getAll({QueryParamsObj: queryObj}))
    }, [dispatch, queryObj])

    const pagination_ordering = (e: any) => {
        if (e.target.name === 'ordering') {
            e.target.value ? (queryObj.ordering = e.target.value) : (delete queryObj.ordering)
        }
        e.target.name === 'pagination' && (queryObj.pagination = e.target.value)
        setQuery(queryObj)
    }

    return (
        <div className={css.wrap}>
            <div className={css.nav_page_ordering}>
                <PageNavigate/>
                <form onChange={(e) => pagination_ordering(e)} className={css.form}>
                    <select name="pagination" id='pagination'>
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

            <div className={css.products}>
                {products && products.data.map(product => <Product key={product.id} product={product}/>)}
            </div>
        </div>
    );
};

export {Products};