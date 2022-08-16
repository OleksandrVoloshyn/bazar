import {FC, useEffect} from "react"
import {Link, useNavigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hook";
import {MessageInfo, RegisterForm} from "../../components";
import css from './RegisterPage.module.css'
import {authActions} from "../../redux";

const RegisterPage: FC = () => {
    const {isSentActivatedMail, isAuth} = useAppSelector(({authReducer}) => authReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // todo поставити hoc
        if (isAuth) {
            navigate('/')
        }
        dispatch(authActions.setError())
    }, [dispatch, isAuth, navigate])

    return (
        <div className={css.content}>
            {
                isSentActivatedMail
                    ? <MessageInfo data={'Check your mail for activate'}/>
                    : <div>
                        <RegisterForm/>
                        <Link to={'/login'}>to login</Link>
                    </div>
            }
        </div>
    );
};

export {RegisterPage};