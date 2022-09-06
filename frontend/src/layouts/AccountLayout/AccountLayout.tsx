import {FC} from "react"
import {Outlet} from "react-router-dom";

import {AccountMenu, Header} from "../../components";

const AccountLayout: FC = () => {
    return (
        <div>
            <Header/>
            <div style={{display: "flex"}}>
                <AccountMenu/>
                <Outlet/>
            </div>
        </div>
    );
};

export {AccountLayout};