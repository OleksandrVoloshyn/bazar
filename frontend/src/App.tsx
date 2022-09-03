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
    ClientProductsPage,
    CreateProductPage,
    BasketPage,
    MainFilterPage,
    ProductDetailPage,
    CommentListPage,
    ProductControlPage,
    UserControlPage,
    ValuesPage, UpdateProductPage
} from "./pages";

import {RequireAuth} from "./hoc";

const App: FC = () => {
    return (
        <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route index element={<HomePage/>}/>
                <Route path={'category/:title'} element={<MainFilterPage/>}/>
                <Route path={'products/:pk/details'} element={<ProductDetailPage/>}></Route>
                <Route path={'users/:pk'} element={<UserPage/>}></Route>

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
                <Route path={'create_product'} element={<CreateProductPage/>}/>
                <Route path={'my_products'} element={<ClientProductsPage/>}>
                    <Route path={':pk/details'} element={<ProductDetailPage/>}/>
                    <Route path={':pk/update'} element={<UpdateProductPage/>}/>
                </Route>

                <Route path={'comments'} element={<CommentListPage/>}/>
                <Route path={'basket'} element={<BasketPage/>}/>
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

export
{
    App
}
    ;