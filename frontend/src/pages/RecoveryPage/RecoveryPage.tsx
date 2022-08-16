import {FC} from "react"

import {useAppSelector} from "../../hook";
import {MessageInfo, RecoveryForm} from "../../components";

const RecoveryPage: FC = () => {
    const {isSentRecoveryMail} = useAppSelector(({authReducer}) => authReducer);

    return (
        <div>
            {isSentRecoveryMail
                ? <MessageInfo data={'check your email for recovery password'}/>
                : <RecoveryForm/>
            }
        </div>
    );
};

export {RecoveryPage};