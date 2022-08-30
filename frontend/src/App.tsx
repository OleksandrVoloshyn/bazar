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
    AdminWelcomePage,
    WelcomePage,
    ProfilePage,
    ProductListPage,
    AddProductPage,
    BasketPage,
    PurchaseHistoryPage,
    MainFilterPage,
    ProductDetailPage,
    CommentListPage,
    AddValuesPage,
    ProductControlPage,
    UserControlPage, ChangeRolePage,
} from "./pages";

import {authActions, userActions} from "./redux";
import {RequireAuth} from "./hoc";

const App: FC = () => {
    // const dispatch = useAppDispatch();
    // const access = localStorage.getItem('access')

    // if (access) {
    //     dispatch(authActions.setAuth(true))
    //     dispatch(userActions.getCurrent())
    // }

    return (
        <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route index element={<HomePage/>}/>
                <Route path={'category/:title'} element={<MainFilterPage/>}/>
                <Route path={'products/:pk/details'} element={<ProductDetailPage/>}></Route>

                {/* AUTH */}
                <Route path={'login'} element={<LoginPage/>}/>
                <Route path={'register'} element={<RegisterPage/>}/>
                <Route path={'activate/:token'} element={<ActivatePage/>}/>
                <Route path={'recovery'} element={<RecoveryPage/>}/>
                <Route path={'recovery/:token'} element={<ChangePasswordPage/>}/>
            </Route>

            <Route path={'/account'} element={<RequireAuth><AccountLayout/></RequireAuth>}>
                <Route index element={<WelcomePage/>}/>
                <Route path={'profile'} element={<ProfilePage/>}/>
                <Route path={'product_list'} element={<ProductListPage/>}/>
                <Route path={'comments'} element={<CommentListPage/>}/>
                <Route path={'add_product'} element={<AddProductPage/>}/>
                <Route path={'basket'} element={<BasketPage/>}/>
                <Route path={'history'} element={<PurchaseHistoryPage/>}/>
            </Route>

            <Route path={'/admin'} element={<RequireAuth><AdminLayout/></RequireAuth>}>
                <Route index element={<AdminWelcomePage/>}/>
                <Route path={'add_values'} element={<AddValuesPage/>}/>
                <Route path={'product_control'} element={<ProductControlPage/>}/>
                <Route path={'user_control'} element={<UserControlPage/>}/>
                <Route path={'change_role'} element={<ChangeRolePage/>}/>
            </Route>

            <Route path={'*'} element={<NotFoundPage/>}/>
        </Routes>
    );
};

export {App};