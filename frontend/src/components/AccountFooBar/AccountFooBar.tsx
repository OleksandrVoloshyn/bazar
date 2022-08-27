import {FC} from "react"
import {Link, NavLink} from "react-router-dom";

const AccountFooBar: FC = () => {
    return (
        <div>
            <ul>
                <li><NavLink to={'profile'}>Profile</NavLink></li>
                <li><NavLink to={'product_list'}>List of my products</NavLink></li>
                <li><NavLink to={'comments'}>My comments</NavLink></li>
                <li><NavLink to={'add_product'}>Append product</NavLink></li>
                <li><NavLink to={'basket'}>Wish list</NavLink></li>
                <li><NavLink to={'history'}>Purchase history</NavLink></li>
                <li><Link to={'/admin'}>admin panel</Link></li>
            </ul>
        </div>
    );
};

export {AccountFooBar};