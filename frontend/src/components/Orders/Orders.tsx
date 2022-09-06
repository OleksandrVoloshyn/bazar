import {FC, useEffect} from "react"

import {useAppDispatch, useAppSelector} from "../../hooks";
import {Order} from "../Order/Order";
import {productActions} from "../../redux";

const Orders: FC = () => {
    const {orders} = useAppSelector(({productReducer}) => productReducer);
    const dispatch = useAppDispatch();
    let orderSum = 0
    orders.forEach(item => orderSum += item.price)

    useEffect(() => {
        dispatch(productActions.getBasket())
    }, [])

    return (
        orders.length
            ? <div>
                {orders.map(item => <Order key={item.id} item={item}/>)}
                <span>Sum: {orderSum} гривень</span>
            </div>
            : <div>Nothing</div>
    );
};

export {Orders};