import {ChangeEvent, FC, useState} from "react"
import {Link, useSearchParams} from "react-router-dom";
import {FaShoppingCart} from 'react-icons/fa'

import css from './header.module.css'
import {useAppSelector} from "../../hook";
import {Orders} from "../Orders/Orders";

const Header: FC = () => {
    const {isAuth} = useAppSelector(({authReducer}) => authReducer);
    const [searchData, setSearchData] = useState<string>('');
    const [query, setQuery] = useSearchParams();
    const [cartOpen, setCartOpen] = useState<boolean>(false);

    const searchFunc = () => {
        const queryObj = Object.fromEntries(query.entries())
        queryObj.search = searchData
        setSearchData('')
        setQuery(queryObj)
    }
    return (
        <div className={css.header}>
            <h1><Link to={'/'} className={css.logo}>BAZAR</Link></h1>
            <div>
                <input type="search" value={searchData}
                       onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchData(e.target.value)}/>
                <button onClick={searchFunc} disabled={!searchData}>search</button>
            </div>

            <FaShoppingCart className={`${css.shop_cart_button} ${cartOpen && css.active}`}
                            onClick={() => setCartOpen(!cartOpen)}/>

            {cartOpen && <div className={css.shop_cart}><Orders/></div>}

            <div className={css.auth}>
                {
                    isAuth
                        ? <div><Link to={'account'}>My Account</Link></div>
                        : <div><Link to={'login'}>login</Link> | <Link to={'register'}>register</Link></div>
                }
            </div>
        </div>
    );
};

export {Header};