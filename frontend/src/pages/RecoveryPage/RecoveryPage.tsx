import {FC} from "react"

import {useAppSelector} from "../../hooks";
import {MessageInfo, RecoveryForm} from "../../components";

const RecoveryPage: FC = () => {
    const {isSentRecoveryMail} = useAppSelector(({authReducer}) => authReducer);

    return (
        isSentRecoveryMail
            ? <MessageInfo data={'check your email for recovery password'}/>
            : <RecoveryForm/>
    )
};

export {RecoveryPage};