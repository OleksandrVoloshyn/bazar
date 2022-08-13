import {useEffect, useState} from "react";
import {errorMessage} from "../constants";
import {regEx} from "../validators";

interface IValidations {
    isEmpty: boolean,
    isEmailError: boolean,
    isPasswordError: boolean
}

interface IError {
    status: boolean,
    msg: string
}

const useValidation = (value: string, validations: Partial<IValidations>) => {
    const [empty, setEmpty] = useState<IError>({status: true, msg: errorMessage.empty});
    const [emailError, setEmailError] = useState<IError>({status: false, msg: 'Invalid email'});
    const [passwordError, setPasswordError] = useState<IError>({status: false, msg: 'invalid password'});
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

const useInput = (initialState: string, validations: Partial<IValidations>) => {
    const [value, setValue] = useState<string>(initialState);
    const [isDirty, setDirty] = useState<boolean>(false);
    const valid = useValidation(value, validations)


    const onChange = (e: any) => {
        setValue(e.target.value)
    }

    const onBlur = (e: any) => {
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