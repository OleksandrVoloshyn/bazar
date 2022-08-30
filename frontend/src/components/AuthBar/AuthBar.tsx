import {FC} from "react"
import {Link, useLocation, useNavigate} from "react-router-dom";

import {authService} from "../../services";

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
        <div>
            {access
                ? isNotMainPage
                    ? <div onClick={logout}>logout</div>
                    : <div><Link to={'account'}>My Account</Link></div>

                : <div><Link to={'login'}>login</Link> | <Link to={'register'}>register</Link></div>
            }
        </div>
    );
};

export {AuthBar};