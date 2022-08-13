import {FC, useEffect} from "react"

import {useAppSelector} from "../../hook";
import {Info, RecoveryForm} from "../../components";

const RecoveryPage: FC = () => {
    const {isSentRecoveryMail} = useAppSelector(({authReducer}) => authReducer);

    useEffect(() => {
    }, [isSentRecoveryMail])

    return (
        <div>
            {isSentRecoveryMail
                ? <Info data={'check your email for recovery password'}/>
                : <RecoveryForm/>
            }
        </div>
    );
};

export {RecoveryPage};