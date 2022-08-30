import {FC, useEffect} from "react"
import {useParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hook";
import {authActions} from "../../redux";
import {MessageInfo} from "../../components";

const ActivatePage: FC = () => {
    const {isSuccessActivated, activatedError} = useAppSelector(({authReducer}) => authReducer);
    const {token} = useParams<string>();
    const dispatch = useAppDispatch();

    const msg = isSuccessActivated ? 'Your account was successfully activated, thanks for registration' : activatedError

    useEffect(() => {
        token && dispatch(authActions.activate({token}))
    }, [dispatch, token])

    return (
        <div>
            {msg && <MessageInfo data={msg}/>}
        </div>
    );
};

export {ActivatePage};