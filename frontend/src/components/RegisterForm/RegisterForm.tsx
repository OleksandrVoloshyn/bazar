import {FC, useEffect} from "react"
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from '@hookform/resolvers/joi'

import {useAppDispatch, useAppSelector} from "../../hook";
import {IUser} from "../../interfaces";
import {registerValidator} from "../../validators";
import {authActions} from "../../redux";
import {InputError} from "../InputError/InputError";
import css from './register_form.module.css'

const RegisterForm: FC = () => {
    const {registerErrors} = useAppSelector(({authReducer}) => authReducer);
    const dispatch = useAppDispatch();
    const {register, handleSubmit, formState: {errors}} = useForm<IUser>({
        resolver: joiResolver(registerValidator),
        mode: "onTouched"
    });

    const submit: SubmitHandler<IUser> = async (user: IUser) => {
        await dispatch(authActions.register({user}))
    }

    useEffect(() => {
        registerErrors && dispatch(authActions.resetErrors())
    }, [dispatch])

    return (
        <form onSubmit={handleSubmit(submit)} className={css.register_form}>
            <div className={css.input_line}>
                <label>Email: </label>
                <input type="email" {...register('email')}/>
            </div>
            {errors.email?.message && <InputError errorMsg={errors.email.message}/>}
            {registerErrors?.email && <InputError errorMsg={registerErrors?.email[0]}/>}

            <div className={css.input_line}>
                <label>Password: </label>
                <input type="password" {...register('password')}/>
            </div>
            {errors.password?.message && <InputError errorMsg={errors.password.message}/>}

            {/* Profile */}
            <div className={css.input_line}>
                <label>Name: </label>
                <input type="text" {...register('profile.name')}/>
            </div>
            {errors.profile?.name?.message && <InputError errorMsg={errors.profile.name.message}/>}
            {registerErrors?.profile && <InputError errorMsg={registerErrors.profile[0]}/>}

            <div className={css.input_line}>
                <label>Surname: </label>
                <input type="text" {...register('profile.surname')}/>
            </div>
            {errors.profile?.surname?.message && <InputError errorMsg={errors.profile.surname.message}/>}

            <div className={css.input_line}>
                <label>Age: </label>
                <input type="number" {...register('profile.age')}/>
            </div>
            {errors.profile?.age?.message && <InputError errorMsg={errors.profile.age.message}/>}

            <div className={css.input_line}>
                <label>Phone number: </label>
                <input type="text" {...register('profile.phone')}/>
            </div>
            {errors.profile?.phone?.message && <InputError errorMsg={errors.profile.phone.message}/>}

            <div className={css.btn_div}>
                <button>register</button>
            </div>
        </form>
    );
};

export {RegisterForm};