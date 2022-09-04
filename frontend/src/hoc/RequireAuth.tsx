import {FC, ReactElement, useEffect} from "react"
import {Navigate, useLocation} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../hooks";
import {userActions} from "../redux";

interface IProps {
    children: ReactElement
}

const RequireAuth: FC<IProps> = ({children}) => {
    const {user} = useAppSelector(({userReducer}) => userReducer);
    const dispatch = useAppDispatch();
    const {pathname} = useLocation();

    const access = localStorage.getItem('access')

    useEffect(() => {
        !user && dispatch(userActions.getCurrent())
    }, [dispatch, user])

    if (!access) {
        return <Navigate to={'/login'}/>
    }


    if (pathname.includes('admin') && !user?.is_staff) {
        return <Navigate to={'/'}/>
    }

    return children
};

export {RequireAuth};