import {FC, useEffect, useState} from "react"
import {useAppDispatch, useAppSelector} from "../../../hook";
import {productActions} from "../../../redux";
import {ProductForm} from "../../../components";

const ProductListPage: FC = () => {
    const dispatch = useAppDispatch();
    const {products} = useAppSelector(({productReducer}) => productReducer);
    const [productIdForUpdate, setProductIdForUpdate] = useState<string>('');

    useEffect(() => {
        dispatch(productActions.getMyProducts())
    }, [dispatch, productIdForUpdate])

    const removeProduct = (pk: string) => {
        dispatch(productActions.removeProduct({pk}))
    }

    return (
        <div>
            {products && products.map(product => (
                <div key={product.id}>
                    {product.id} -- {product.title}
                    {(productIdForUpdate && productIdForUpdate === product.id)
                        ? <ProductForm productIdForUpdate={productIdForUpdate} setProductIdForUpdate={setProductIdForUpdate}/>
                        : <button onClick={() => setProductIdForUpdate(product.id)}>update</button>
                    }
                    <button onClick={() => removeProduct(product.id)}>remove</button>
                </div>
            ))}
        </div>
    );
};

export {ProductListPage};