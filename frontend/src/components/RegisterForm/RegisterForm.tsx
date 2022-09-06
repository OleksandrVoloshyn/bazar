import {FC, useEffect} from "react"
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from '@hookform/resolvers/joi'

import {useAppDispatch, useAppSelector} from "../../hooks";
import {IUser} from "../../interfaces";
import {registerValidator} from "../../validators";
import {authActions} from "../../redux";
import {InputError} from "../InputError/InputError";
import css from './RegisterForm.module.css'

const RegisterForm: FC = () => {
    const {registerErrors} = useAppSelector(({authReducer}) => authReducer);
    const dispatch = useAppDispatch();
    const {register, handleSubmit, formState: {errors}} = useForm<IUser>({
        resolver: joiResolver(registerValidator),
        mode: "onTouched"
    });

    useEffect(() => {
        registerErrors && dispatch(authActions.resetErrors())
    }, [dispatch])

    const submit: SubmitHandler<IUser> = async (user) => await dispatch(authActions.register({user}))

    return (
        <form onSubmit={handleSubmit(submit)}>
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
                <input {...register('profile.name')}/>
            </div>
            {errors.profile?.name?.message && <InputError errorMsg={errors.profile.name.message}/>}
            {registerErrors?.profile?.name && <InputError errorMsg={registerErrors.profile.name[0]}/>}

            <div className={css.input_line}>
                <label>Surname: </label>
                <input {...register('profile.surname')}/>
            </div>
            {errors.profile?.surname?.message && <InputError errorMsg={errors.profile.surname.message}/>}

            <div className={css.input_line}>
                <label>Age: </label>
                <input type="number" {...register('profile.age', {valueAsNumber: true})}/>
            </div>
            {errors.profile?.age?.message && <InputError errorMsg={errors.profile.age.message}/>}

            <div className={css.input_line}>
                <label>Phone number: </label>
                <input {...register('profile.phone')}/>
            </div>
            {errors.profile?.phone?.message && <InputError errorMsg={errors.profile.phone.message}/>}

            <div className={css.btn_div}><button>register</button></div>
        </form>
    );
};

export {RegisterForm};