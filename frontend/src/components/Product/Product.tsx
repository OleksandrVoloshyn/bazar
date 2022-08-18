import {FC} from "react"
import {Link} from "react-router-dom";

import {notFoundImage} from "../../constants";

interface IProps {
    product: any
}

const Product: FC<IProps> = ({product}) => {
    const {title, size, price, images} = product;
    return (
        <div><Link to={`/products/${product.id}/details`}>
            <div><img src={images[0] || notFoundImage} alt="product_avatar" style={{height: '200px'}}/></div>
            <div>Title: {title}</div>
            <div>Size: {size}</div>
            <div>Price: {price}</div>
        </Link>
        </div>
    );
};

export {Product};