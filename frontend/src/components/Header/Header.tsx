import {FC, useEffect} from "react"
import {Link} from "react-router-dom";

import css from './header.module.css'
import {useAppSelector} from "../../hook";

const Header: FC = () => {
    const {isAuth} = useAppSelector(({authReducer}) => authReducer);

    useEffect(() => {
    }, [isAuth])

    return (
        <div className={css.header}>
            <h1><Link to={'/'} className={css.logo}>BAZAR</Link></h1>
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