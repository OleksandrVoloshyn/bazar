import {FC} from "react"
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {authActions} from "../../redux";
import {IUser} from "../../interfaces";
import {registerValidator} from "../../validators";
import {InputError} from "../InputError/InputError";
import css from './LoginForm.module.css'

const LoginForm: FC = () => {
    const {isLoginError} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();

    const {register, handleSubmit, formState: {errors}} = useForm<IUser>({
        resolver: joiResolver(registerValidator),
        mode: "onTouched"
    });

    const submit: SubmitHandler<Partial<IUser>> = async (user) => await dispatch(authActions.login({user}))

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className={css.input_line}><label>Email: </label>
                <input type="email" {...register('email')}/></div>
            {errors.email?.message && <InputError errorMsg={errors.email.message}/>}

            <div className={css.input_line}><label>Password: </label>
                <input type="password" {...register('password')}/></div>
            {errors.password?.message && <InputError errorMsg={errors.password.message}/>}
            {isLoginError && <InputError errorMsg={'Invalid login or password'}/>}

            <div className={css.btn_div}><button>login</button></div>
        </form>
    );
};

export {LoginForm};