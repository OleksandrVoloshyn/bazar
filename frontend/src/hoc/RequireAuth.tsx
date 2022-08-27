import {FC, ReactElement, useEffect} from "react"

import {Navigate, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hook";
import {userActions} from "../redux";

interface IProps {
    children: ReactElement
}

const RequireAuth: FC<IProps> = ({children}) => {
    const {user} = useAppSelector(({userReducer}) => userReducer);
    const {pathname} = useLocation();
    const access = localStorage.getItem('access')
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!user) {
            dispatch(userActions.getCurrent())
        }
    }, [dispatch, user])

    if (!access) {
        return <Navigate to={'/login'}/>
    }


    if (pathname.includes('admin') && !user?.is_staff) {
        return <div>Шо за макин хацкер</div>
    }

    return children
};

export {RequireAuth};