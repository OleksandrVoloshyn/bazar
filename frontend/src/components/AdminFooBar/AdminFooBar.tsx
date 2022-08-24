import {FC} from "react"
import {NavLink} from "react-router-dom";

const AdminFooBar: FC = () => {
    return (
        <div>
            <ul>
                <li><NavLink to={'add_values'}>Add Values</NavLink></li>
                <li><NavLink to={'change_role'}>Change role</NavLink></li>
                {/*todo for superuser*/}
                <li><NavLink to={'product_control'}>Product control</NavLink></li>
                <li><NavLink to={'user_control'}>User control</NavLink></li>
            </ul>
        </div>
    );
};

export {AdminFooBar};