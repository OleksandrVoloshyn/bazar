import {FC} from "react"
import {Link} from "react-router-dom";

import css from './AdminMenu.module.css'

const AdminMenu: FC = () => {
    return (
        <ul className={css.menu}>
            <li><Link to={'users_control'}>Users control</Link></li>
            <li><Link to={'product_control'}>Product control</Link></li>
            <li><Link to={'product_values'}>Product values control</Link></li>
            <li><Link to={'/account'}>To account</Link></li>
        </ul>
    );
};

export {AdminMenu};