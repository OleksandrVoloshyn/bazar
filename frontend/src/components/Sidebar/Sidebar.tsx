import {FC, useEffect} from "react"
import {useAppDispatch, useAppSelector} from "../../hook";
import {Link} from "react-router-dom";
import {productActions} from "../../redux";

const Sidebar: FC = () => {
    const {categories} = useAppSelector(({productReducer}) => productReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(productActions.getCategories())
    }, [dispatch])
    return (
        <div>
            {categories && categories.map(category =>
                // @ts-ignore
                <div><Link to={`category/${category.title}`}>{category.title}</Link></div>)}
        </div>
    );
};

export {Sidebar};