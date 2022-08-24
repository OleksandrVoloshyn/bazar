import {FC} from "react"
import {AdminFooBar, HeaderAccount} from "../../components";
import {Outlet} from "react-router-dom";

const AdminLayout: FC = () => {
    return (
        <div>
            <HeaderAccount/>
            <div style={{display: "flex"}}>
                <AdminFooBar/>
                <Outlet/>
            </div>
        </div>
    );
};

export {AdminLayout};