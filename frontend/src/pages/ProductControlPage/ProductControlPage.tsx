import {FC, useEffect, useState} from "react"
import {BsTrash, BsSearch} from 'react-icons/bs'
import {Link, useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {productActions} from "../../redux";
import {PagePagination} from "../../components";
import css from './ProductContolPage.module.css'

const ProductControlPage: FC = () => {
    const {products} = useAppSelector(({productReducer}) => productReducer);
    const [productTitle, setProductTitle] = useState<string>('');
    const dispatch = useAppDispatch();

    const [query, setQuery] = useSearchParams();
    const queryObj = Object.fromEntries(query.entries());

    const searchCandidates =  async () => {
        if (productTitle) {
            setQuery('')
            await dispatch(productActions.getProducts({QParamsObj: {search: productTitle, page: '1'}}))
        }
    }

    const removeProduct = async (id: string) => await dispatch(productActions.removeProduct({pk: id}))

    useEffect(() => {
        queryObj.page && dispatch(productActions.getProducts({QParamsObj: {search: productTitle, page: queryObj.page}}))
        return () => {
            dispatch(productActions.clearProducts())
        }
    }, [queryObj.page])

    return (
        <div>
            <div><label>Title: </label>
                <input type="search" onChange={(e) => setProductTitle(e.target.value)} value={productTitle}/>
                <BsSearch onClick={searchCandidates} className={css.cursor}/>
            </div>

            {products?.data.length
                ? <div>
                    <PagePagination next={products.next} prev={products.prev} total_pages={products.total_pages}
                                    total_items={products.total_items}/>

                    {products.data.map(product => <div key={product.id}>
                        <Link to={`/products/${product.id}/details`}>{product.title} -- {product.price}</Link>
                        <span><BsTrash onClick={() => removeProduct(product.id)} className={css.cursor}/></span>
                    </div>)}
                </div>
                : <div>Nothing</div>
            }
        </div>
    );
};

export {ProductControlPage};