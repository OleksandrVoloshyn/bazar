import {FC, useEffect, useRef, useState} from "react"

import {useAppDispatch} from "../../hook";
import {authActions} from "../../redux/slices";
import {useParams} from "react-router-dom";

const ChangePasswordPage: FC = () => {
    const password = useRef<any>();
    const dispatch = useAppDispatch();
    const {token} = useParams<any>();
    const [changed, setChanged] = useState<boolean>(false);

    const changePassword = () => {
        const newPassword = password.current.value;
        if (newPassword) {
            dispatch(authActions.changePassword({token, newPassword}))
            setChanged(true)
        }
    }
    useEffect(() => {
    }, [changed])
    return (
        <div>
            {changed
                ? <div>Пароль успішно зміненний</div>
                : <div>
                    <div><label>Новий пароль: <input type="text" ref={password}/></label></div>
                    <button onClick={changePassword}>Відновити</button>
                </div>
            }
        </div>
    );
};

export {ChangePasswordPage};