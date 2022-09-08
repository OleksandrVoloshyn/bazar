import {FC, useState} from "react"
import {useParams} from "react-router-dom";

import {useAppSelector} from "../../hooks";
import {ChangePasswordForm, MessageInfo} from "../../components";


const ChangePasswordPage: FC = () => {
    const {isChangePasswordError} = useAppSelector(({authReducer}) => authReducer);
    const [changed, setChanged] = useState<boolean>(false);
    const {token} = useParams<string>();

    const msg = isChangePasswordError ? 'Oppps something wrong' : 'your password has been changed'

    return (
        changed
            ? <MessageInfo data={msg}/>
            : <ChangePasswordForm setChanged={setChanged} token={token as string}/>
    );
};

export {ChangePasswordPage};