import {FC, useEffect} from "react"
import {Link, useNavigate} from "react-router-dom";

import {LoginForm} from "../../components";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {authActions} from "../../redux";
import css from './LoginPage.module.css'

const LoginPage: FC = () => {
    const {isAuth} = useAppSelector(({authReducer}) => authReducer);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const access = localStorage.getItem('access')
        access && navigate('/')

        dispatch(authActions.resetErrors())
    }, [navigate, isAuth])

    return (
        <div className={css.wrap}>
            <div className={css.content}>
                <LoginForm/>
                <div><Link to={'/register'}>to registration</Link></div>
                <div><Link to={'/recovery'}>recovery password</Link></div>
            </div>
        </div>
    );
};

export {LoginPage};