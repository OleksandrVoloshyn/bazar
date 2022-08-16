import {FC} from "react"
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";

import {useAppDispatch, useAppSelector} from "../../hook";
import {authActions} from "../../redux";
import {IUser} from "../../interfaces";
import {registerValidator} from "../../validators";

const LoginForm: FC = () => {
    const {loginError} = useAppSelector(state => state.authReducer);
    const {register, handleSubmit, formState: {errors}} = useForm<Partial<IUser>>({
        resolver: joiResolver(registerValidator),
        mode: "onTouched"
    });
    const dispatch = useAppDispatch();

    const submit: SubmitHandler<Partial<IUser>> = async (user: Partial<IUser>) => {
        await dispatch(authActions.login({user}))
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div><label>Email: <input type="email" {...register('email')}/></label></div>
            {errors.email && <div>{errors.email.message}</div>}
            <div><label>Password: <input type="text" {...register('password')}/></label></div>
            {errors.password && <div>{errors.password.message}</div>}
            {loginError && <span>Invalid login or password</span>}

            <div>
                <button>login</button>
            </div>
        </form>
    );
};

export {LoginForm};