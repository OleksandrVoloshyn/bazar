import {FC, useEffect} from "react"
import {useParams} from "react-router-dom";

import {useAppDispatch} from "../../hook";
import {authActions} from "../../redux";
import {Info} from "../../components";

const ActivatePage: FC = () => {
    const {token} = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (token) {
            dispatch(authActions.activate(token))
        }
    }, [dispatch, token])

    return (
        <div>
            <Info data={'Ваш акаунт активовано'}/>
        </div>
    );
};

export {ActivatePage};