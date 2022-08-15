import {FC, useState} from "react"

import {useAppDispatch, useInput} from "../../hook";
import {IUserProfile, IValidations} from "../../interfaces";
import {userActions} from "../../redux";

interface IProps {
    fieldName: string
    initialState: string,
    profile: IUserProfile
    validators: Partial<IValidations>,
    inputType?: string,
    errors: string
}

const ChangeProfileField: FC<IProps> = ({validators, initialState, fieldName, profile, errors, inputType = 'text'}) => {
    const [isChange, setIsChange] = useState<boolean>(false);
    const myInput = useInput(initialState, {...validators});
    const dispatch = useAppDispatch();

    const changeField = () => {
        setIsChange(false)
        dispatch(userActions.updateAccount({[fieldName]: myInput.value}))
    }
    return (
        <div>
            {
                isChange

                    ? <div>
                        <label>{fieldName}:
                            <input type={inputType} value={myInput.value} onBlur={e => myInput.onBlur(e)}
                                   onChange={e => myInput.onChange(e)}/>
                        </label>
                        {myInput.isDirty && myInput.empty.status && <div>{myInput.empty.msg}</div>}
                        {/*// @ts-ignore*/}
                        {myInput.isDirty && myInput[errors]['status'] && <div>{myInput[errors]['msg']}</div>}

                        <button onClick={changeField} disabled={!myInput.isInputValid}>change</button>
                    </div>
                    : <div>{fieldName}:
                        {/*// @ts-ignore*/}
                        {profile[fieldName]}
                        <button onClick={e => setIsChange(true)}>change</button>
                    </div>
            }
        </div>
    );
};

export {ChangeProfileField};