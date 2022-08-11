import {FC} from "react"
import {Link} from "react-router-dom";

import {LoginForm} from "../../components";

const LoginPage: FC = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    return (
        <div>
            <LoginForm/>
            <div><Link to={'/register'}>Зареєструватись</Link></div>
            <div><Link to={'/recovery'}>Забули пароль ?</Link></div>
        </div>
    );
};

export {LoginPage};