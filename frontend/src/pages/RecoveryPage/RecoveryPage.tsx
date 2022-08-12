import {FC, useEffect, useState} from "react"
import {useAppDispatch, useInput} from "../../hook";

import {authActions} from "../../redux";
import {Info} from "../../components";

const RecoveryPage: FC = () => {
    const dispatch = useAppDispatch();
    const [sentMail, setSentMail] = useState<boolean>(false);
    const email = useInput('', {isEmpty: true, isEmail: true})

    const sendMail = () => {
        dispatch(authActions.recovery(email.value))
        setSentMail(true)
    }
    useEffect(() => {
    }, [sentMail])

    return (
        <div>
            {sentMail
                ? <Info data={'Перейдіть на вашу пошту для підтвердження'}/>
                :
                <div>
                    <div><label>Пошта: <input onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)}
                                              value={email.value} name={'email'}
                                              type="text"/></label></div>
                    {(email.isDirty && email.isEmpty) && <div>Поле не може бути пустим</div>}
                    {(email.isDirty && email.isEmailError) && <div>Хуйова пошта</div>}
                    <button disabled={!email.isInputValid} onClick={sendMail}>Відновити</button>
                </div>
            }
        </div>
    );
};

export {RecoveryPage};