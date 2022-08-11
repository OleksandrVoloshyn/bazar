import {FC, useEffect, useRef, useState} from "react"
import {useAppDispatch} from "../../hook";
import {authActions} from "../../redux/slices";

const RecoveryPage: FC = () => {
    const email = useRef<any>();
    const dispatch = useAppDispatch();
    const [sentMail, setSentMail] = useState<boolean>(false);

    const sendMail = () => {
        const emailForRecovery = email.current.value;
        if (emailForRecovery) {
            dispatch(authActions.recovery(emailForRecovery))
            setSentMail(true)
        }
    }
    useEffect(() => {
    }, [sentMail])
    return (
        <div>
            {sentMail
                ? <div>Перейдіть на вашу пошту для підтвердження</div>
                : <div>
                    <div><label>Пошта: <input type="text" ref={email}/></label></div>
                    <button onClick={sendMail}>Відновити</button>
                </div>
            }
        </div>
    );
};

export {RecoveryPage};