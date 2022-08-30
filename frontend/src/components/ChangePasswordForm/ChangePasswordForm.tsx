import {FC} from "react"

import {useAppDispatch, useInput} from "../../hook";
import {authActions} from "../../redux";
import css from './ChangePasswordForm.module.css'
import {InputError} from "../InputError/InputError";

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
            <div className={`${css.display_canter} ${css.input_line}`}><label>New Password:</label>
                <input onChange={e => password.onChange(e)} onBlur={() => password.setDirty(true)}
                       name={'password'} type="text" value={password.value}/>
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