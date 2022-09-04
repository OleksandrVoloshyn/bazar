import {FC} from "react"
import {Orders} from "../../../components";
import {useAppDispatch} from "../../../hooks";
import {productActions} from "../../../redux";

const BasketPage: FC = () => {
    const dispatch = useAppDispatch();
    return (
        <div>
            <Orders/>
            <button onClick={() => dispatch(productActions.clearBasket())}> clear wish list</button>
            {/*    todo buy btn*/}
        </div>
    );
};

export {BasketPage};