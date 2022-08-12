import {FC} from "react"
import {Link} from "react-router-dom";

import {LoginForm} from "../../components";
import {localStorageService} from "../../services";

const LoginPage: FC = () => {
    localStorageService.logout()

    return (
        <div>
            <LoginForm/>
            <div><Link to={'/register'}>Зареєструватись</Link></div>
            <div><Link to={'/recovery'}>Забули пароль ?</Link></div>
        </div>
    );
};

export {LoginPage};