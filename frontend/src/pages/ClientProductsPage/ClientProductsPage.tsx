import {FC, useEffect} from "react"
import {Link, Outlet, useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {productActions} from "../../redux";
import {PagePagination} from "../../components";

const ClientProductsPage: FC = () => {
    const {products} = useAppSelector(({productReducer}) => productReducer);
    const dispatch = useAppDispatch();

    const [query] = useSearchParams();
    const queryObj = Object.fromEntries(query.entries())

    const removeProduct = async (pk: string) => await dispatch(productActions.removeProduct({pk}))

    useEffect(() => {
        dispatch(productActions.getClientProducts(queryObj))
    }, [queryObj.page])

    return (
        <div>
            {products && <div>
                <PagePagination next={products.next} prev={products.prev} total_pages={products.total_pages}
                                total_items={products.total_items}/>

                {products.data.map(item => <div key={item.id}>
                    {item.title} -- {item.price}

                    <Link to={`${item.id}/details`}><button>Details</button></Link>
                    <Link to={`${item.id}/update`}><button>Update</button></Link>
                    <button onClick={() => removeProduct(item.id)}>Remove</button>
                </div>)}
            </div>}

            <Outlet/>
        </div>
    );
};

export {ClientProductsPage};