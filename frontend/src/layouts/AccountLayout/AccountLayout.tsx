import {FC} from "react"
import {Outlet} from "react-router-dom";

import {AccountFooBar, HeaderAccount} from "../../components";

const AccountLayout: FC = () => {

    return (
        <div>
            <HeaderAccount/>
            <div style={{display: "flex"}}>
                <AccountFooBar/>
                <Outlet/>
            </div>
        </div>
    );
};

export {AccountLayout};