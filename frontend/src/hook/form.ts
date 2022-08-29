import {ChangeEvent, useEffect, useState} from "react";

import {errorMessage} from "../constants";
import {regEx} from "../validators";
import {IValidators} from "../interfaces";

interface IError {
    status: boolean,
    msg: string
}

const useValidation = (value: string, validations: Partial<IValidators>) => {
    const [emailError, setEmailError] = useState<IError>({status: false, msg: regEx.email.msg});
    const [passwordError, setPasswordError] = useState<IError>({status: false, msg: regEx.password.msg});
    const [nameError, setNameError] = useState<IError>({status: false, msg: regEx.name.msg});
    const [ageError, setAgeError] = useState<IError>({status: false, msg: 'Invalid age min 6 max 100'});
    const [phoneError, setPhoneError] = useState<IError>({status: false, msg: regEx.phone.msg});

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

                case 'isNameError':
                    const nameReg = regEx.name.pattern
                    nameReg.test(String(value))
                        ? setNameError({...nameError, status: false})
                        : setNameError({...nameError, status: true})
                    break

                case 'isAgeError':
                    const age = +value
                    age >= 6 && age < 100
                        ? setAgeError({...ageError, status: false})
                        : setAgeError({...ageError, status: true})
                    break

                case 'isPhoneError':
                    const phoneReg = regEx.phone.pattern
                    phoneReg.test(String(value))
                        ? setPhoneError({...phoneError, status: false})
                        : setPhoneError({...phoneError, status: true})
                    break
            }
        }
    }, [validations, value, emailError, empty, passwordError, nameError, ageError, phoneError])

    useEffect(() => {
        empty.status || emailError.status || passwordError.status || nameError.status || ageError.status || phoneError.status
            ? setInputValid(false)
            : setInputValid(true)
    }, [empty, emailError, passwordError, nameError, ageError, phoneError])

    return {
        empty,
        emailError,
        passwordError,
        nameError,
        ageError,
        phoneError,
        isInputValid
    }
}

const useInput = (initialState: string, validations: Partial<IValidators>) => {
    const [value, setValue] = useState<string>(initialState);
    const [isDirty, setDirty] = useState<boolean>(false);
    const valid = useValidation(value, validations)


    // const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const onChange = (e: any) => {
        //todo check type
        setValue(e.target.value)
    }

    const onBlur = (e: any) => {
        // todo check type
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