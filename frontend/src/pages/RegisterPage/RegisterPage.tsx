import {FC, useEffect} from "react"
import {useAppDispatch, useAppSelector} from "../../hook";
import {Link} from "react-router-dom";

import {Info, RegisterForm} from "../../components";
import {authActions} from "../../redux";

const RegisterPage: FC = () => {
    const dispatch = useAppDispatch();
    const {isRegister} = useAppSelector(({authReducer}) => authReducer);
    //todo setError
    //todo validate
    useEffect(() => {
        dispatch(authActions.setError())
    }, [dispatch])
    return (
        <div>
            {
                isRegister
                    ? <Info data={'Перейдіть будь ласка на пошту для підтвердження реєстрації'}/>
                    : <div>
                        <RegisterForm/>
                        <Link to={'/login'}>Увійти</Link>
                    </div>
            }
        </div>
    );
};

export {RegisterPage};