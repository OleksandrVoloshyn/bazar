import {FC, useEffect} from "react"
import {useParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hook";
import {authActions} from "../../redux";
import {Info} from "../../components";

const ActivatePage: FC = () => {
    const {isSuccessActivated} = useAppSelector(({authReducer}) => authReducer);
    const dispatch = useAppDispatch();
    const {token} = useParams<string>();

    useEffect(() => {
        if (token) {
            dispatch(authActions.activate({token}))
        }
    }, [dispatch, token, isSuccessActivated])

    return (
        <div>
            {isSuccessActivated
                ? <Info data={'Your account was successfully activated, thanks for registration'}/>
                : <Info data={'Ooopss, something wrong'}/>
            }

        </div>
    );
};

export {ActivatePage};