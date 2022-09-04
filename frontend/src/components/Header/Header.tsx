import {ChangeEvent, FC, useState} from "react"
import {Link, useLocation, useSearchParams} from "react-router-dom";
import {FaShoppingCart} from 'react-icons/fa'

import {Orders} from "../Orders/Orders";
import {AuthBar} from "../AuthBar/AuthBar";
import css from './header.module.css'

const Header: FC = () => {
    const [query, setQuery] = useSearchParams();
    const queryObj = Object.fromEntries(query.entries())
    const {pathname} = useLocation();

    const [searchData, setSearchData] = useState<string>('');
    const [cartOpen, setCartOpen] = useState<boolean>(false);
    const isMainPage = pathname === '/'

    const searchFunc = () => {
        queryObj.search = searchData
        setSearchData('')
        setQuery(queryObj)
    }

    return (
        <div className={css.header}>
            <h1><Link to={'/'} className={css.logo}>BAZAR</Link></h1>

            {isMainPage &&
                <div>
                    <input type="search" value={searchData}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchData(e.target.value)}/>
                    <button onClick={searchFunc} disabled={!searchData}>search</button>
                </div>
            }

            <div className={css.right_part}>
                <FaShoppingCart className={css.shop_cart_button} onClick={() => setCartOpen(!cartOpen)}/>
                {cartOpen && <div className={css.shop_cart}><Orders/></div>}
                <AuthBar/>
            </div>
        </div>
    );
};

export {Header};