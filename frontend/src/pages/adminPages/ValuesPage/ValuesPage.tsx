import {FC} from "react"

import {BrandsControl, CategoriesControl} from "../../../components";

const ValuesPage: FC = () => {
    return (
        <div style={{minWidth: '250px'}}>
            <CategoriesControl/>
            <BrandsControl/>
        </div>
    );
};

export {ValuesPage};