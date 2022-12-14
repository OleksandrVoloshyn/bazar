import {FC} from "react"

import {useAppDispatch, useInput} from "../../hooks";
import {authActions} from "../../redux";
import {InputError} from "../InputError/InputError";
import css from './ChangePasswordForm.module.css'

interface IProps {
    token: string,
    setChanged: CallableFunction,
}

const ChangePasswordForm: FC<IProps> = ({token, setChanged}) => {
    const password = useInput('', {isEmpty: true, isPasswordError: true});
    const dispatch = useAppDispatch();

    const changePassword = async () => {
        await dispatch(authActions.changePassword({token, newPassword: password.value}))
        setChanged(true)
    }

    return (
        <div className={css.change_password_form}>
            <div className={`${css.display_canter} ${css.input_line}`}>
                <label>New Password:</label>
                <input onChange={e => password.onChange(e)} onBlur={() => password.onBlur()}
                       name={'password'} value={password.value}/>
            </div>
            {password.isDirty && password.empty.status && <InputError errorMsg={password.empty.msg}/>}
            {password.isDirty && password.passwordError.status && <InputError errorMsg={password.passwordError.msg}/>}

            <div className={css.display_canter}>
                <button onClick={changePassword} disabled={!password.isInputValid}>Recovery</button>
            </div>
        </div>
    );
};

export {ChangePasswordForm};