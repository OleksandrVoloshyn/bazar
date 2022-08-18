import {ChangeEvent, FC, useState} from "react"
import {Link, useParams, useSearchParams} from "react-router-dom";

import css from './header.module.css'
import {useAppSelector} from "../../hook";

const Header: FC = () => {
    const {isAuth} = useAppSelector(({authReducer}) => authReducer);
    const [searchData, setSearchData] = useState<string>('');
    const [query, setQuery] = useSearchParams();

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