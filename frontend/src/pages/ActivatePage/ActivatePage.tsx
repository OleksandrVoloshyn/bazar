import {FC, useEffect} from "react"
import {useParams} from "react-router-dom";
import {authService} from "../../services";
import {useAppDispatch} from "../../hook";
import {authActions} from "../../redux/slices";

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
            <span>Ваш акаунт активовано</span>
        </div>
    );
};

export {ActivatePage};