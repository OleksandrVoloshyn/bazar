import {FC, useState} from "react"
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {productActions} from "../../../redux";

const ProductControlPage: FC = () => {
    const {products} = useAppSelector(({productReducer}) => productReducer);
    const [productTitle, setProductTitle] = useState<string>('');
    const dispatch = useAppDispatch();

    const searchCandidates = () => {
        dispatch(productActions.getAll({QueryParamsObj: {search: productTitle}}))
    }

    const removeProduct = (id: string) => {
        dispatch(productActions.removeProduct({pk: id}))
    }

    return (
        <div>
            <div><label>
                Title: <input type="search" onChange={(e) => setProductTitle(e.target.value)}
                              value={productTitle}/></label>
            </div>
            <button onClick={searchCandidates}>search</button>
            {products.length
                ? products.map(product => <div key={product.id}>
                    {product.id} -- {product.title} <span onClick={() => removeProduct(product.id)}>X</span>
                </div>)
                : <div>Nothing</div>
            }
        </div>
    );
};

export {ProductControlPage};