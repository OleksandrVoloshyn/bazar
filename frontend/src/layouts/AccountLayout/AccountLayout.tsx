import {FC, useEffect} from "react"
import {Outlet, useNavigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hook";
import {AccountFooBar, HeaderAccount} from "../../components";
import {userActions} from "../../redux";

const AccountLayout: FC = () => {
    const {isAuth} = useAppSelector(({authReducer}) => authReducer);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        !isAuth && navigate('/')
        dispatch(userActions.getCurrent())
    }, [dispatch, navigate, isAuth])

    return (
        <div>
            <HeaderAccount/>
            <div style={{display: "flex"}}>
                <AccountFooBar/>
                <Outlet/>
            </div>
        </div>
    );
};

export {AccountLayout};