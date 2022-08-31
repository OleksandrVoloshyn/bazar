import {FC} from "react"
import {Link} from "react-router-dom";

import {useAppSelector} from "../../hooks";
import css from './AccountMenu.module.css'

const AccountMenu: FC = () => {
    const {user} = useAppSelector(({userReducer}) => userReducer);

    return (
            <ul className={css.menu}>
                <li><Link to={'profile'}>Profile</Link></li>
                <li><Link to={'my_products'}>My products</Link></li>
                <li><Link to={'comments'}>My comments</Link></li>
                <li><Link to={'create_product'}>Create product</Link></li>
                <li><Link to={'basket'}>Wish list</Link></li>
                {/*<li><Link to={'history'}>Purchase history</Link></li>*/}
                {user?.is_staff && <li><Link to={'/admin'}>admin panel</Link></li>}
            </ul>
    );
};

export {AccountMenu};