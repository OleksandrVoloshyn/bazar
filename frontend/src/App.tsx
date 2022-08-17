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
    NotFoundPage,
    AdminPage,
    WelcomePage,
    ProfilePage,
    ProductListPage,
    AddProductPage,
    BasketPage,
    PurchaseHistoryPage, MainFilterPage,
} from "./pages";
import {authActions} from "./redux";

const App: FC = () => {
    const dispatch = useAppDispatch();
    const access = localStorage.getItem('access')

    if (access) {
        dispatch(authActions.setAuth(true))
    }

    return (
        <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route index element={<HomePage/>}/>
                <Route path={'category/:title'} element={<MainFilterPage/>}/>

                <Route path={'login'} element={<LoginPage/>}/>
                <Route path={'register'} element={<RegisterPage/>}/>
                <Route path={'recovery'} element={<RecoveryPage/>}/>
                <Route path={'recovery/:token'} element={<ChangePasswordPage/>}/>
                <Route path={'activate/:token'} element={<ActivatePage/>}/>
            </Route>

            {/*todo hoc for account*/}
            <Route path={'/account'} element={<AccountLayout/>}>
                <Route index element={<WelcomePage/>}/>
                <Route path={'profile'} element={<ProfilePage/>}/>
                <Route path={'product_list'} element={<ProductListPage/>}/>
                <Route path={'add_product'} element={<AddProductPage/>}/>
                <Route path={'basket'} element={<BasketPage/>}/>
                <Route path={'history'} element={<PurchaseHistoryPage/>}/>
            </Route>

            <Route path={'/admin'} element={<AdminLayout/>}>
                <Route index element={<AdminPage/>}/>
            </Route>

            <Route path={'*'} element={<NotFoundPage/>}/>
        </Routes>
    );
};

export {App};