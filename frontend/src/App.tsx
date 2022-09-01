import {FC} from "react"
import {Navigate, Route, Routes} from "react-router-dom";

import {AccountLayout, AdminLayout, MainLayout} from "./layouts";
import {
    LoginPage,
    ActivatePage,
    HomePage,
    RegisterPage,
    RecoveryPage,
    ChangePasswordPage,
    NotFoundPage,
    UserPage,
    ProductListPage,
    AddProductPage,
    BasketPage,
    PurchaseHistoryPage,
    MainFilterPage,
    ProductDetailPage,
    CommentListPage,
    ProductControlPage,
    UserControlPage,
    ValuesPage
} from "./pages";

import {RequireAuth} from "./hoc";

const App: FC = () => {
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
                <Route index element={<Navigate to={'profile'}/>}/>
                <Route path={'profile'} element={<UserPage/>}/>

                <Route path={'my_products'} element={<ProductListPage/>}/>
                <Route path={'comments'} element={<CommentListPage/>}/>
                <Route path={'create_product'} element={<AddProductPage/>}/>
                <Route path={'basket'} element={<BasketPage/>}/>
                <Route path={'history'} element={<PurchaseHistoryPage/>}/>
            </Route>

            <Route path={'/admin'} element={<RequireAuth><AdminLayout/></RequireAuth>}>
                <Route index element={<Navigate to={'users_control'}/>}/>
                <Route path={'users_control'} element={<UserControlPage/>}/>
                <Route path={'product_values'} element={<ValuesPage/>}/>
                <Route path={'product_control'} element={<ProductControlPage/>}/>
            </Route>

            <Route path={'*'} element={<NotFoundPage/>}/>
        </Routes>
    );
};

export {App};