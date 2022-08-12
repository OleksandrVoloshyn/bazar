import {FC, useEffect, useRef, useState} from "react"
import {useParams} from "react-router-dom";

import {useAppDispatch} from "../../hook";
import {authActions} from "../../redux";
import {Info} from "../../components";


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
    //todo validate input
    useEffect(() => {
    }, [changed])
    return (
        <div>
            {changed
                ? <Info data={'Пароль успішно зміненний'}/>
                : <div>
                    <div><label>Новий пароль: <input type="text" ref={password}/></label></div>
                    <button onClick={changePassword}>Відновити</button>
                </div>
            }
        </div>
    );
};

export {ChangePasswordPage};