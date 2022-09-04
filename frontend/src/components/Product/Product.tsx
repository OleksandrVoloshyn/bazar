import {FC} from "react"
import {Link} from "react-router-dom";

import {notFoundImage} from "../../constants";
import {IProduct} from '../../interfaces'
import {useAppDispatch} from "../../hooks";
import {productActions} from "../../redux";
import css from './Product.module.css'

interface IProps {
    product: IProduct
}

const Product: FC<IProps> = ({product}) => {
    const dispatch = useAppDispatch();
    const {title, size, price, images} = product;
    const imgSrc = images && (images[0]?.image || notFoundImage)

    const addToBasket = async () => await dispatch(productActions.addToBasket(product))

    return (
        <div className={css.wrap}>
            <Link to={`/products/${product.id}/details`}>
                <div className={css.img}><img src={imgSrc} alt="product_avatar"/></div>
            </Link>
            <div className={css.content}>
                <div>Title: {title}</div>
                <div>Size: {size}</div>
                <div>Price: {price}</div>
            </div>
            <div className={css.add_btn} onClick={addToBasket}>love it</div>
        </div>
    );
};

export {Product};