import {FC, useEffect} from "react"
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hook";
import {authActions} from "../../redux";
import {IUser} from "../../interfaces";

const LoginForm: FC = () => {
    const {register, handleSubmit} = useForm<Partial<IUser>>();
    const {loginError} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();

    const submit: SubmitHandler<Partial<IUser>> = async (user: Partial<IUser>) => {
        await dispatch(authActions.login({user}))
    }

    useEffect(() => {
    }, [loginError])

    return (
        <form onSubmit={handleSubmit(submit)}>
            {/*// @ts-ignore*/}
            <div><label>Email: <input type="email" {...register('email')}/></label></div>
            <div><label>Password: <input type="text" {...register('password')}/></label></div>
            {loginError && <span>Invalid login or password</span>}

            <div>
                <button>Увійти</button>
            </div>
        </form>
    );
};

export {LoginForm};