import {useEffect, useState} from "react";

const useValidation = (value: any, validations: any) => {
    const [isEmpty, setEmpty] = useState<boolean>(true);
    const [isEmailError, setIsEmailError] = useState<boolean>(false);
    const [isInputValid, setInputValid] = useState<boolean>(false);

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                    break
                case 'isEmail':
                    const re = /^.+@.+\..+$/
                    re.test(String(value).toLowerCase()) ? setIsEmailError(false) : setIsEmailError(true)
                    break
            }
        }
    }, [validations, value])

    useEffect(() => {
        if (isEmpty || isEmailError) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    }, [isEmpty, isEmailError])
    return {
        isEmpty,
        isEmailError,
        isInputValid
    }
}

const useInput = (initialState: any, validations: any) => {
    const [value, setValue] = useState<any>(initialState);
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