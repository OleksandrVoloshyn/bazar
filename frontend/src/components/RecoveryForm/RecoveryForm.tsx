import {FC} from "react"

import {useAppDispatch, useAppSelector, useInput} from "../../hook";
import {authActions} from "../../redux";
import {InputError} from "../InputError/InputError";
import css from './RecoveryForm.module.css'

const RecoveryForm: FC = () => {
    const {isRecoveryMailError} = useAppSelector(({authReducer}) => authReducer);
    const emailInput = useInput('', {isEmpty: true, isEmailError: true})
    const dispatch = useAppDispatch();

    return (
        <div className={css.recovery_form}>
            <div className={`${css.display_canter} ${css.input_line}`}>
                <label>Email: </label>
                <input onChange={e => emailInput.onChange(e)}
                       onBlur={() => emailInput.setDirty(true)}
                       value={emailInput.value} name={'email'} type="text"/>
            </div>
            {isRecoveryMailError && <InputError errorMsg={'Ooops something wrong try again'}/>}
            {emailInput.isDirty && emailInput.empty.status && <InputError errorMsg={emailInput.empty.msg}/>}
            {emailInput.isDirty && emailInput.emailError.status && <InputError errorMsg={emailInput.emailError.msg}/>}

            <div className={css.display_canter}>
                <button disabled={!emailInput.isInputValid}
                        onClick={() => dispatch(authActions.recovery({email: emailInput.value}))}>recovery
                </button>
            </div>

        </div>
    );
};

export {RecoveryForm};