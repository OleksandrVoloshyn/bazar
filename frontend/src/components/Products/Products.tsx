import {FC, useEffect} from "react"

import {useAppDispatch, useAppSelector} from "../../hook";
import {Product} from "../Product/Product";
import {productActions} from "../../redux";

const Products: FC = () => {
    const {products} = useAppSelector(({productReducer}) => productReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(productActions.getAll())
    }, [dispatch])

    return (
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {products && products.map(product => <Product product={product}/>)}
        </div>
    );
};

export {Products};