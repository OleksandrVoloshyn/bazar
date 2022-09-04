import {FC, useState} from "react"
import {BsTrash, BsSearch} from 'react-icons/bs'

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {productActions} from "../../../redux";

const ProductControlPage: FC = () => {
    const {products} = useAppSelector(({productReducer}) => productReducer);
    const [productTitle, setProductTitle] = useState<string>('');
    const dispatch = useAppDispatch();

    const searchCandidates = () => {
        dispatch(productActions.getAll({QueryParamsObj: {search: productTitle}}))
    }

    const removeProduct = (id: string) => dispatch(productActions.removeProduct({pk: id}))


    console.log(products)
    return (
        <div>
            <div><label>
                Title: <input type="search" onChange={(e) => setProductTitle(e.target.value)}
                              value={productTitle}/></label>
                <BsSearch onClick={searchCandidates}/>
            </div>

            {products
                ? products.data.map(product => <div key={product.id}>
                    {product.id} -- {product.title} <BsTrash onClick={() => removeProduct(product.id)}/>
                </div>)
                : <div>Nothing</div>
            }
        </div>
    );
};

export {ProductControlPage};