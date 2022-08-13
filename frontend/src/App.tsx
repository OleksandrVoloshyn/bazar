import {FC} from "react"
import {Route, Routes} from "react-router-dom";

import {useAppDispatch} from "./hook";
import {AccountLayout, AdminLayout, MainLayout} from "./layouts";
import {
    LoginPage,
    ActivatePage,
    HomePage,
    RegisterPage,
    RecoveryPage,
    ChangePasswordPage,
    AccountPage,
    NotFoundPage, AdminPage
} from "./pages";
import {authActions} from "./redux";
import {localStorageService} from "./services";

const App: FC = () => {
    const dispatch = useAppDispatch();
    const access = localStorageService.getAccess()

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

            <Route path={'/account'} element={<AccountLayout/>}>
                {/*todo hoc for account*/}
                <Route index element={<AccountPage/>}/>
            </Route>

            <Route path={'/admin'} element={<AdminLayout/>}>
                <Route index element={<AdminPage/>}/>
            </Route>

            <Route path={'*'} element={<NotFoundPage/>}/>
        </Routes>
    );
};

export {App};