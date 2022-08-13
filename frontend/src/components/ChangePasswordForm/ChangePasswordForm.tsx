import {FC} from "react"

import {useAppDispatch, useInput} from "../../hook";
import {localStorageService} from "../../services";
import {authActions} from "../../redux";

interface IProps {
    token: string,
    setChanged: CallableFunction,
    setIsCrash: CallableFunction
}

const ChangePasswordForm: FC<IProps> = ({token, setChanged, setIsCrash}) => {
    const password = useInput('', {isEmpty: true, isPasswordError: true});
    const dispatch = useAppDispatch();

    const changePassword = () => {
        const doRecovery = localStorageService.getDoRecovery();
        if (doRecovery) {
            dispatch(authActions.changePassword({token, newPassword: password.value}))
            setChanged(true)
            setIsCrash(false)
        } else {
            setChanged(true)
            setIsCrash(true)
        }
    }

    return (
        <div>
            <div><label>New Password:
                <input onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)}
                       name={'password'} type="text" value={password.value}/></label>
            </div>
            {password.isDirty && password.empty.status && <div>{password.empty.msg}</div>}
            {password.isDirty && password.passwordError.status && <div>{password.passwordError.msg}</div>}
            <div>
                <button onClick={changePassword} disabled={!password.isInputValid}>Recovery</button>
            </div>
        </div>
    );
};

export {ChangePasswordForm};