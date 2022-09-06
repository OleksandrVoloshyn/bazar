import {FC} from "react"
import {Outlet} from "react-router-dom";

import {AdminMenu, Header} from "../../components";


const AdminLayout: FC = () => {
    return (
        <div>
            <Header/>
            <div style={{display: "flex"}}>
                <AdminMenu/>
                <Outlet/>
            </div>
        </div>
    );
};

export {AdminLayout};