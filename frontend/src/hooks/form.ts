import {ChangeEvent, useEffect, useState} from "react";

import {errorMessage} from "../constants";
import {regEx} from "../validators";
import {IValidators} from "../interfaces";

interface IError {
    status: boolean,
    msg: string
}
// todo remove useless
const useValidation = (value: string, validations: Partial<IValidators>) => {
    const [emailError, setEmailError] = useState<IError>({status: false, msg: regEx.email.msg});
    const [passwordError, setPasswordError] = useState<IError>({status: false, msg: regEx.password.msg});

    const [empty, setEmpty] = useState<IError>({status: true, msg: errorMessage.empty});
    const [isInputValid, setInputValid] = useState<boolean>(false);

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'isEmpty':
                    value ? setEmpty({...empty, status: false}) : setEmpty({...empty, status: true})
                    break

                case 'isEmailError':
                    const emailReg = regEx.email.pattern
                    emailReg.test(String(value).toLowerCase())
                        ? setEmailError({...emailError, status: false})
                        : setEmailError({...emailError, status: true})
                    break

                case 'isPasswordError':
                    const passwordReg = regEx.password.pattern
                    passwordReg.test(String(value))
                        ? setPasswordError({...passwordError, status: false})
                        : setPasswordError({...passwordError, status: true})
                    break
            }
        }
    }, [validations, value, emailError, empty, passwordError])

    useEffect(() => {
        empty.status || emailError.status || passwordError.status
            ? setInputValid(false)
            : setInputValid(true)
    }, [empty, emailError, passwordError])

    return {
        empty,
        emailError,
        passwordError,
        isInputValid
    }
}

const useInput = (initialState: string, validations: Partial<IValidators>) => {
    const [value, setValue] = useState<string>(initialState);
    const [isDirty, setDirty] = useState<boolean>(false);
    const valid = useValidation(value, validations)


    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const onBlur = () => {
        setDirty(true)
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}

export {useInput, useValidation}