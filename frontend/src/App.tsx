import {FC} from "react"
import {Route, Routes} from "react-router-dom";

import {useAppDispatch} from "./hook";
import {MainLayout} from "./layouts";
import {LoginPage, ActivatePage, HomePage, RegisterPage, RecoveryPage, ChangePasswordPage} from "./pages";
import {authActions} from "./redux/slices";

const App: FC = () => {
    const dispatch = useAppDispatch();
    const access = localStorage.getItem('access');

    if (access) {
        dispatch(authActions.setAuth())
    }

    return (
        <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route index element={<HomePage/>}/>
                <Route path={'login'} element={<LoginPage/>}/>
                <Route path={'register'} element={<RegisterPage/>}/>
                <Route path={'recovery'} element={<RecoveryPage/>}/>
                <Route path={'recovery/:token'} element={<ChangePasswordPage/>}/>
                <Route path={'activate/:token'} element={<ActivatePage/>}/>
            </Route>
        </Routes>
    );
};

export {App};