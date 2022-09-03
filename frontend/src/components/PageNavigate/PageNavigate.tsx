import {FC} from "react"
import {useSearchParams} from "react-router-dom";
import {FcNext, FcPrevious} from 'react-icons/fc'
import {ImCross} from 'react-icons/im'

import {useAppSelector} from "../../hooks";
import css from './PageNavigate.module.css'

const PageNavigate: FC = () => {
    const {products} = useAppSelector(({productReducer}) => productReducer);
    const [query, setQuery] = useSearchParams({page: '1'});
    const queryObj = Object.fromEntries(query.entries())

    const prevPage = (): void => {
        queryObj.page = (+queryObj.page - 1).toString()
        setQuery(queryObj)
    }

    const nextPage = (): void => {
        queryObj.page = (+queryObj.page + 1).toString()
        setQuery(queryObj)
    }

    return (
        <div>
            {products?.prev ? <FcPrevious onClick={prevPage} className={css.click_btn}/> : <ImCross/>}
            {products?.next ? <FcNext onClick={nextPage} className={css.click_btn}/> : <ImCross/>}
            <span> We've found {products?.total_items} items</span>
        </div>
    );
};

export {PageNavigate};