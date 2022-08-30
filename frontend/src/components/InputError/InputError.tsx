import {FC} from "react"
import css from './InputError.module.css'

interface IProps {
    errorMsg: string
}

const InputError: FC<IProps> = ({errorMsg}) => {
    return (
        <div className={css.error}>{errorMsg}</div>
    );
};

export {InputError};