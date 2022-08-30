import {FC} from "react"
import {Link, useNavigate} from "react-router-dom";

import css from "./HeaderAccount.module.css";
import {authActions} from "../../redux";
import {useAppDispatch} from "../../hook";
import {authService} from "../../services";

const HeaderAccount: FC = () => {
    //todo remove component

    // const navigate = useNavigate();
    // const dispatch = useAppDispatch();

    // const logout = () => {
    //     authService.logout()
    //     dispatch(authActions.setAuth(false))
    //     navigate('/')
    // }

    return (
        <header className={css.header}>
            <h1><Link to={'/'} className={css.logo}>BAZAR</Link></h1>
            {/*<div onClick={logout} className={css.logout}>logout</div>*/}
        </header>
    );
};

export {HeaderAccount};