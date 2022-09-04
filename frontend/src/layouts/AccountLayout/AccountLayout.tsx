import {FC} from "react"
import {Outlet} from "react-router-dom";

import {AccountMenu, Header} from "../../components";
import style from '../../styles/common.module.css'

const AccountLayout: FC = () => {
    return (
        <div>
            <Header/>
            <div className={style.d_flex}>
                <AccountMenu/>
                <Outlet/>
            </div>
        </div>
    );
};

export {AccountLayout};