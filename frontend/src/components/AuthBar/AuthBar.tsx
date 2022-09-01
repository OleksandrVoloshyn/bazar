import {FC} from "react"
import {Link, useLocation, useNavigate} from "react-router-dom";
import {VscAccount} from 'react-icons/vsc'

import {authService} from "../../services";
import css from './AuthBar.module.css'

const AuthBar: FC = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const isNotMainPage = pathname.includes('account') || pathname.includes('admin')
    const access = localStorage.getItem('access')

    const logout = () => {
        authService.logout()
        navigate('/')
    }

    return (
        <div className={css.auth}>
            {access
                ? isNotMainPage
                    ? <div onClick={logout} className={css.logout}>logout</div>
                    : <div className={css.account}>
                        <VscAccount/>
                        <Link to={'account'}>My Account</Link>
                    </div>

                : <div><Link to={'login'}>login</Link> | <Link to={'register'}>register</Link></div>
            }
        </div>
    );
};

export {AuthBar};