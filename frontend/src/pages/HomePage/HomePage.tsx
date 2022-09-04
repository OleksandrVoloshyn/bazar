import {FC} from "react"
import {useSearchParams} from "react-router-dom";

import {Products, CategoryBar, FilterSideBar, PageNavigate} from "../../components";

const HomePage: FC = () => {
    const [query] = useSearchParams();
    const queryObj = Object.fromEntries(query.entries())
    const hasCategory = queryObj.category

    return (
        <div style={{'display': "flex"}}>
            {hasCategory
                ? <FilterSideBar/>
                : <CategoryBar/>
            }
            <Products/>
        </div>
    );
};

export {HomePage};