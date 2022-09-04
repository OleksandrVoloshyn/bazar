import {FC, useEffect, useState} from "react"
import {Link, Outlet, useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {productActions} from "../../../redux";
import {PageNavigate, ProductForm} from "../../../components";

const ClientProductsPage: FC = () => {
    const {products} = useAppSelector(({productReducer}) => productReducer);
    const dispatch = useAppDispatch();
    const [query] = useSearchParams();
    const queryObj = Object.fromEntries(query.entries())

    useEffect(() => {
        dispatch(productActions.getClientProducts(queryObj))
    }, [query])

    return (
        <div>
            <PageNavigate/>
            {products && products.data.map(item => <div key={item.id}>
                {item.title} -- {item.price}

                <Link to={`${item.id}/details`}>
                    <button>Details</button>
                </Link>
                <Link to={`${item.id}/update`}>
                    <button>Update</button>
                </Link>
                <button onClick={() => dispatch(productActions.removeProduct({pk: item.id}))}>Remove</button>
            </div>)}
            <Outlet/>
        </div>
    );
};

export {ClientProductsPage};