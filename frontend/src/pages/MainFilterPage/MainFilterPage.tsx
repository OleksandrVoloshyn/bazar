import {FC} from "react"
import {FilterSideBar, Products} from "../../components";

const MainFilterPage: FC = () => {
    return (
        <div style={{display: 'flex'}}>
            <FilterSideBar/>
            <Products/>
        </div>
    );
};

export {MainFilterPage};