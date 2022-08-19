import {FC, useEffect} from "react"
import {useAppDispatch, useAppSelector} from "../../../hook";
import {productActions} from "../../../redux";

const ProductListPage: FC = () => {
    const dispatch = useAppDispatch();
    const {products} = useAppSelector(({productReducer}) => productReducer);

    useEffect(() => {
        // @ts-ignore
        dispatch(productActions.getMyProducts())
    }, [dispatch])

    return (
        <div>
            {/*// @ts-ignore*/}
            {products && products.map(product => <div>{product.id} -- {product.title}</div>)}
        </div>
    );
};

export {ProductListPage};