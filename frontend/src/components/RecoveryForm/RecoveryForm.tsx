import {FC, useEffect} from "react"
import {useAppDispatch, useAppSelector, useInput} from "../../hook";
import {authActions} from "../../redux";

const RecoveryForm: FC = () => {
    const {hasSentRecoveryMailError} = useAppSelector(({authReducer}) => authReducer);
    const email = useInput('', {isEmpty: true, isEmailError: true})
    const dispatch = useAppDispatch();

    const sendMail = () => {
        dispatch(authActions.recovery({email: email.value}))
    }

    useEffect(() => {
    }, [hasSentRecoveryMailError])

    return (
        <div>
            <div>
                <label>Email:<input onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)}
                                    value={email.value} name={'email'} type="text"/></label>
            </div>
            {email.isDirty && !email.empty.status && hasSentRecoveryMailError &&
                <div>Ooops something wrong try again</div>}
            {email.isDirty && email.empty.status && <div>{email.empty.msg}</div>}
            {email.isDirty && email.emailError.status && <div>{email.emailError.msg}</div>}

            <div>
                <button disabled={!email.isInputValid} onClick={sendMail}>recovery</button>
            </div>
        </div>
    );
};

export {RecoveryForm};