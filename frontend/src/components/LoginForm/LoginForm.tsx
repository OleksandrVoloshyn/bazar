import {FC, useEffect} from "react"
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hook";
import {authActions} from "../../redux";
import {IUser} from "../../interfaces";
import {joiResolver} from "@hookform/resolvers/joi";
import {registerValidator} from "../../validators";

const LoginForm: FC = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<Partial<IUser>>({
        resolver: joiResolver(registerValidator),
        mode: "onTouched"
    });

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
            {/*// @ts-ignore*/}
            <div><label>Пошта: <input type="text" {...register('email')}/></label></div>
            {errors.email && <span>{errors.email.message}</span>}
            <div><label>Пароль: <input type="text" {...register('password')}/></label></div>
            {errors.password && <span>{errors.password.message}</span>}

            <div>{loginError && <span>Невірний пароль або пошта</span>}</div>

            <button>Увійти</button>
        </form>
    );
};

export {LoginForm};