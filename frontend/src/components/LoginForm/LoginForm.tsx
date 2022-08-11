import {FC, useEffect} from "react"
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hook";
import {authActions} from "../../redux/slices";
import {IUser} from "../../interfaces";

const LoginForm: FC = () => {
    const {register, handleSubmit} = useForm();
    const {loginError, isAuth} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const submit: SubmitHandler<Partial<IUser>> = async (user: Partial<IUser>) => {
        await dispatch(authActions.login(user))
    }
    useEffect(() => {
        !loginError && isAuth && navigate('/')
    }, [navigate, loginError, isAuth])
    return (
        <form onSubmit={handleSubmit(submit)}>
            <div><label>Пошта: <input type="text" {...register('email', {required: true})}/></label></div>
            <div><label>Пароль: <input type="text" {...register('password', {required: true})}/></label></div>
            <div>{loginError && <span>Невірний пароль або пошта</span>}</div>
            <button>Увійти</button>
        </form>
    );
};

export {LoginForm};