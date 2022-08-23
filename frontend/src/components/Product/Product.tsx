import {FC} from "react"
import {Link} from "react-router-dom";

import css from './Product.module.css'
import {notFoundImage} from "../../constants";
import {IProduct} from '../../interfaces'
import {useAppDispatch} from "../../hook";
import {productActions} from "../../redux";

interface IProps {
    product: Partial<IProduct>
}

const Product: FC<IProps> = ({product}) => {
    const {title, size, price, images} = product;
    const imgSrc = images && (images[0]?.image || notFoundImage)
    const dispatch = useAppDispatch();

    const addToCart = async () => {
        await dispatch(productActions.addToOrder(product))
    }

    return (
        <div>
            <Link to={`/products/${product.id}/details`}>
                <div><img src={imgSrc} alt="product_avatar" style={{width: '200px'}}/></div>
            </Link>
            <div>Title: {title}</div>
            <div>Size: {size}</div>
            <div>Price: {price}</div>
            <div className={css.add_to_cart} onClick={addToCart}>+</div>

        </div>
    );
};

export {Product};