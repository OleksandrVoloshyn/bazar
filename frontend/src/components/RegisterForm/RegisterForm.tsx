import {FC, useEffect} from "react"
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from '@hookform/resolvers/joi'

import {userService} from "../../services";
import {IUser} from "../../interfaces";
import {registerValidator} from "../../validators";
import {useAppDispatch, useAppSelector} from "../../hook";
import {authActions} from "../../redux/slices";

interface IProps {
}

const RegisterForm: FC<IProps> = () => {
    const dispatch = useAppDispatch();
    const {registerEmailError} = useAppSelector(({authReducer}) => authReducer);
    const {register, handleSubmit, formState: {errors}} = useForm<IUser>({
        resolver: joiResolver(registerValidator),
        mode: "onTouched"
    });

    const submit: SubmitHandler<IUser> = async (user: IUser) => {
        try {
            await dispatch(authActions.register(user))
        } catch (e: any) {
            console.log(e.response.data);
        }
    }
    useEffect(() => {
    }, [registerEmailError])
    return (
        <form onSubmit={handleSubmit(submit)}>
            {/*// @ts-ignore*/}
            <div><label>Пошта: <input type="text" {...register('email')}/></label></div>
            {errors.email && <span>{errors.email.message}</span>}
            {registerEmailError && <span>{registerEmailError}</span>}
            <div><label>Пароль: <input type="password" {...register('password')}/></label></div>
            {errors.password && <span>{errors.password.message}</span>}

            <div><label>Ім'я: <input type="text" {...register('profile.name')}/></label></div>
            {errors.profile?.name && <span>{errors.profile?.name.message}</span>}
            <div><label>Прізвище: <input type="text" {...register('profile.surname')}/></label></div>
            {errors.profile?.surname && <span>{errors.profile?.surname.message}</span>}
            <div><label>Ваш вік: <input type="text" {...register('profile.age')}/></label></div>
            {errors.profile?.age && <span>{errors.profile?.age.message}</span>}
            <div><label>Номер телефону: <input type="text" {...register('profile.phone')}/></label></div>
            {errors.profile?.phone && <span>{errors.profile?.phone.message}</span>}

            <button>Зареєструватись</button>
        </form>
    );
};

export {RegisterForm};