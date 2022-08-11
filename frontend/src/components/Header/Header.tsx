import {FC} from "react"
import {Link} from "react-router-dom";
import css from './header.module.css'

const Header: FC = () => {
    return (
        <div className={css.header}>
            <h1><Link to={'/'} className={css.logo}>BAZAR</Link></h1>
            <div className={css.auth}>
                <Link to={'login'}>Увійти</Link> | <Link to={'register'}>Зареєструватись</Link>
            </div>
        </div>
    );
};

export {Header};