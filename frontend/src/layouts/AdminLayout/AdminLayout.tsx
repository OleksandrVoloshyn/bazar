import {FC} from "react"
import {Outlet} from "react-router-dom";

import {AdminMenu, Header} from "../../components";
import style from '../../styles/common.module.css'


const AdminLayout: FC = () => {
    return (
        <div>
            <Header/>
            <div className={style.d_flex}>
                <AdminMenu/>
                <Outlet/>
            </div>
        </div>
    );
};

export {AdminLayout};