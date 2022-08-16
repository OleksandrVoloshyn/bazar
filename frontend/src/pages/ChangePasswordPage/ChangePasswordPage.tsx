import {FC, useState} from "react"
import {useParams} from "react-router-dom";

import {ChangePasswordForm, MessageInfo} from "../../components";


const ChangePasswordPage: FC = () => {
    const [changed, setChanged] = useState<boolean>(false);
    const [isCrash, setIsCrash] = useState<boolean>(false)
    const {token} = useParams<string>();

    const msg = isCrash ? 'Шо за мамкин хацкер тут сидить' : 'your password was changed'

    return (
        <div>
            {changed
                ? <MessageInfo data={msg}/>
                : <ChangePasswordForm setIsCrash={setIsCrash} setChanged={setChanged} token={token as string}/>
            }
        </div>
    );
};

export {ChangePasswordPage};