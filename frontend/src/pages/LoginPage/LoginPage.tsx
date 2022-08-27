import {FC, useEffect} from "react"
import {Link, useNavigate} from "react-router-dom";

import {LoginForm} from "../../components";
import {useAppSelector} from "../../hook";

const LoginPage: FC = () => {
    const {loginError, isAuth} = useAppSelector(({authReducer}) => authReducer);
    const navigate = useNavigate();

    useEffect(() => {
        const access = localStorage.getItem('access')
        access && navigate('/')
        // if (isAuth && !loginError) {
        //     localStorage.removeItem('doRecovery')
        //     navigate('/')
        // }
    }, [navigate, loginError, isAuth])

    return (
        <div>
            <LoginForm/>
            <div><Link to={'/register'}>to registration</Link></div>
            <div><Link to={'/recovery'}>recovery password</Link></div>
        </div>
    );
};

export {LoginPage};