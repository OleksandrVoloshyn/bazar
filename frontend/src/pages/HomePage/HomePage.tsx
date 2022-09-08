import {FC} from "react"
import {useSearchParams} from "react-router-dom";

import {Products, CategoryBar, FilterSideBar} from "../../components";

const HomePage: FC = () => {
    const [query] = useSearchParams();
    const queryObj = Object.fromEntries(query.entries())

    const homePageBar = queryObj.category ? <FilterSideBar/> : <CategoryBar/>

    return (
        <div style={{'display': "flex"}}>
            {homePageBar}
            <Products/>
        </div>
    );
};

export {HomePage};