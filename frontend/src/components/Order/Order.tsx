import {FC} from "react"
import {FaTrash} from "react-icons/fa";

import css from './Order.module.css'
import {IProduct} from "../../interfaces";
import {useAppDispatch} from "../../hooks";
import {productActions} from "../../redux";

interface IProps {
    item: IProduct
}

const Order: FC<IProps> = ({item}) => {
    const dispatch = useAppDispatch();
    const deleteFromOrder = () => {
        dispatch(productActions.deleteFromOrder(item))
    }

    return (
        <div className={css.item}>
            <div>{item.id}--{item.title}--{item.price} </div>
            <FaTrash className={css.delete_icon} onClick={deleteFromOrder}/>
        </div>
    );
};

export {Order};