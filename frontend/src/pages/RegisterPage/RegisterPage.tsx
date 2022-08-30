import {FC, useEffect} from "react"
import {Link, useNavigate} from "react-router-dom";

import {useAppSelector} from "../../hook";
import {MessageInfo, RegisterForm} from "../../components";
import css from './RegisterPage.module.css'

const RegisterPage: FC = () => {
    const {isSentActivatedMail} = useAppSelector(({authReducer}) => authReducer);
    const navigate = useNavigate();

    useEffect(() => {
        const access = localStorage.getItem('access')
        access && navigate('/')
    }, [])

    return (
        <div className={css.display_center}>
            {
                isSentActivatedMail
                    ? <MessageInfo data={'Check your mail for activate'}/>
                    : <div className={css.content}>
                        <RegisterForm/>
                        <Link to={'/login'} className={css.display_center}>to login</Link>
                    </div>
            }
        </div>
    );
};

export {RegisterPage};