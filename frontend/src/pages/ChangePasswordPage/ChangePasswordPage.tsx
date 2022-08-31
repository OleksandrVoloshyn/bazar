import {FC, useState} from "react"
import {useParams} from "react-router-dom";

import {ChangePasswordForm, MessageInfo} from "../../components";
import {useAppSelector} from "../../hooks";


const ChangePasswordPage: FC = () => {
    const {isChangePasswordError} = useAppSelector(({authReducer}) => authReducer);
    const [changed, setChanged] = useState<boolean>(false);
    const {token} = useParams<string>();

    const msg = isChangePasswordError ? 'Oppps something wrong' : 'your password was changed'

    return (
        changed
            ? <MessageInfo data={msg}/>
            : <ChangePasswordForm setChanged={setChanged} token={token as string}/>
    );
};

export {ChangePasswordPage};