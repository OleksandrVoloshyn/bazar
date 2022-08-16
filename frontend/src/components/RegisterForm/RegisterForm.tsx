import {FC} from "react"
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from '@hookform/resolvers/joi'

import {useAppDispatch, useAppSelector} from "../../hook";
import {IUser} from "../../interfaces";
import {registerValidator} from "../../validators";
import {authActions} from "../../redux";

const RegisterForm: FC = () => {
    const dispatch = useAppDispatch();
    const {registerErrors} = useAppSelector(({authReducer}) => authReducer);

    const {register, handleSubmit, formState: {errors}} = useForm<IUser>({
        resolver: joiResolver(registerValidator),
        mode: "onTouched"
    });

    const submit: SubmitHandler<IUser> = async (user: IUser) => {
        await dispatch(authActions.register({user}))
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <h1>Registration</h1>

            <div><label>Email: <input type="email" {...register('email')}/></label></div>
            {errors.email && <span>{errors.email.message}</span>}
            {registerErrors?.email && <span>{registerErrors.email}</span>}
            <div><label>Password: <input type="password" {...register('password')}/></label></div>
            {errors.password && <span>{errors.password.message}</span>}

            {/* Profile */}
            <div><label>Name: <input type="text" {...register('profile.name')}/></label></div>
            {errors.profile?.name && <span>{errors.profile.name.message}</span>}
            {registerErrors?.name && <span> Forbidden name contain admin</span>}
            <div><label>Surname: <input type="text" {...register('profile.surname')}/></label></div>
            {errors.profile?.surname && <span>{errors.profile.surname.message}</span>}
            <div><label>age: <input type="number" {...register('profile.age')}/></label></div>
            {errors.profile?.age && <span>{errors.profile.age.message}</span>}
            <div><label>Phone number: <input type="text" {...register('profile.phone')}/></label></div>
            {errors.profile?.phone && <span>{errors.profile.phone.message}</span>}

            <div>
                <button>register</button>
            </div>
        </form>
    );
};

export {RegisterForm};