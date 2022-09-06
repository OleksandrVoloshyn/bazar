import {FC} from "react"

import {BrandsControl, CategoriesControl} from "../../components";
import css from './ValuesPage.module.css'

const ValuesPage: FC = () => {
    return (
        <div className={css.wrap}>
            <CategoriesControl/>
            <BrandsControl/>
        </div>
    );
};

export {ValuesPage};