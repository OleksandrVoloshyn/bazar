import {FC, useEffect} from "react"
import {joiResolver} from "@hookform/resolvers/joi";
import {SubmitHandler, useForm} from "react-hook-form";

import {IUserProfile} from "../../interfaces";
import {ProfileValidator} from "../../validators";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {userActions} from "../../redux";
import {InputError} from "../InputError/InputError";

interface IProps {
    profile: IUserProfile,
    setIsUpdateProfile: CallableFunction
}

const UpdateProfileForm: FC<IProps> = ({profile, setIsUpdateProfile}) => {
    const {updateProfileErrors} = useAppSelector(({userReducer}) => userReducer);
    const dispatch = useAppDispatch();

    const {register, handleSubmit, setValue, formState: {errors}} = useForm<Partial<IUserProfile>>({
        resolver: joiResolver(ProfileValidator),
        mode: "onTouched"
    });

    useEffect(() => {
        setValue('name', profile.name)
        setValue('surname', profile.surname)
        setValue('age', profile.age)
        setValue('phone', profile.phone)
    }, [])

    const submit: SubmitHandler<Partial<IUserProfile>> = async (userProfile) => {
        await dispatch(userActions.updateProfile(userProfile))
        setIsUpdateProfile(false)
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div><label></label>Name: <input type="text"{...register('name')}/></div>
            {errors.name?.message && <InputError errorMsg={errors.name.message}/>}

            <div><label></label>Surname: <input type="text"{...register('surname')}/></div>
            {errors.surname?.message && <InputError errorMsg={errors.surname.message}/>}

            <div><label></label>Age: <input type="number"{...register('age', {valueAsNumber: true})}/></div>
            {errors.age?.message && <InputError errorMsg={errors.age.message}/>}

            <div><label></label>Phone: <input type="text"{...register('phone')}/></div>
            {errors.phone?.message && <InputError errorMsg={errors.phone.message}/>}
            {updateProfileErrors && <InputError errorMsg={updateProfileErrors}/>}

            <div><button>update</button></div>
        </form>
    );
};

export {UpdateProfileForm};