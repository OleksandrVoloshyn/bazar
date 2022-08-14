import {FC} from "react"
import {Link, useNavigate} from "react-router-dom";

import {localStorageService} from "../../services";
import css from "./HeaderAccount.module.css";
import {authActions} from "../../redux";
import {useAppDispatch} from "../../hook";

const HeaderAccount: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const logout = () => {
        localStorageService.logout()
        dispatch(authActions.setAuth(false))
        navigate('/')
    }

    return (
        <header className={css.header}>
            <h1><Link to={'/'} className={css.logo}>BAZAR</Link></h1>
            <div onClick={logout} className={css.logout}>logout</div>
        </header>
    );
};

export {HeaderAccount};