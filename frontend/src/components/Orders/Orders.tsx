import {FC} from "react"

import {useAppSelector} from "../../hooks";
import {Order} from "../Order/Order";

const Orders: FC = () => {
    const {orders} = useAppSelector(({productReducer}) => productReducer);

    let orderSum = 0
    orders.forEach(item => orderSum += item.price)

    return (
        <div>
            {orders.length
                ? <div>
                    {orders.map(item => <Order key={item.id} item={item}/>)}
                    <span>Sum: {orderSum}</span>
                </div>
                : <div>Nothing</div>
            }
        </div>
    );
};

export {Orders};