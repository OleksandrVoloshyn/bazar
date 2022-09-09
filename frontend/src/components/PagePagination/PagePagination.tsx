import {FC} from "react"
import {GrFormPreviousLink, GrFormNextLink, GrFormClose} from 'react-icons/gr'
import {useSearchParams} from "react-router-dom";
import css from './PagePagination.module.css'

interface IProps {
    next: boolean,
    prev: boolean,
    total_pages: number,
    total_items: number
}

const PagePagination: FC<IProps> = ({prev, next, total_pages, total_items}) => {
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
            {prev ? <span className={css.nav}><GrFormPreviousLink onClick={prevPage}/></span> : <GrFormClose/>}
            {next ? <span className={css.nav}><GrFormNextLink onClick={nextPage}/></span> : <GrFormClose/>}
            <span className={css.total}>total pages: {total_pages}</span>
            <span className={css.total}>total items: {total_items}</span>
        </div>
    );
};

export {PagePagination};