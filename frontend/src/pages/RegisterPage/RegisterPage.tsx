import {FC, useEffect} from "react"
import {useAppDispatch, useAppSelector} from "../../hook";
import {Link} from "react-router-dom";

import {RegisterForm} from "../../components";
import {authActions} from "../../redux/slices";

const RegisterPage: FC = () => {
    const dispatch = useAppDispatch();
    const {isRegister} = useAppSelector(({authReducer}) => authReducer);

    useEffect(() => {
        dispatch(authActions.setError())
    }, [dispatch])
    return (
        <div>
            {
                isRegister
                    ? <div>Перейдіть будь ласка на пошту для підтвердження реєстрації</div>
                    : <div>
                        <RegisterForm/>
                        <Link to={'/login'}>Увійти</Link>
                    </div>
            }
        </div>
    );
};

export {RegisterPage};