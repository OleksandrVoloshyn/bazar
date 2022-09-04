import {FC} from "react"
import {FaTrash} from "react-icons/fa";

import {IProduct} from "../../interfaces";
import {useAppDispatch} from "../../hooks";
import {productActions} from "../../redux";
import css from './Order.module.css'

interface IProps {
    item: IProduct
}

const Order: FC<IProps> = ({item}) => {
    const dispatch = useAppDispatch();

    return (
        <div className={css.item}>
            <div>{item.title} -- {item.price}</div>
            <FaTrash className={css.delete_icon} onClick={() => dispatch(productActions.removeFromBasket(item))}/>
        </div>
    );
};

export {Order};