import {FC, useEffect} from "react"
import {useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {productActions} from "../../../redux";
import {Comments, PagePagination} from "../../../components";

const CommentListPage: FC = () => {
    const {myComments} = useAppSelector(({productReducer}) => productReducer);
    const dispatch = useAppDispatch();
    const [query] = useSearchParams();
    const queryObj = Object.fromEntries(query.entries())

    useEffect(() => {
        dispatch(productActions.getClientComments({page: queryObj.page}))
    }, [queryObj.page])

    return (
        <div>
            {myComments && <div>
                <PagePagination next={myComments.next} prev={myComments.prev} total_pages={myComments.total_pages}
                                total_items={myComments.total_pages}/>
                <Comments comments={myComments.data} isProduct={true}/>
            </div>}
        </div>
    );
};

export {CommentListPage};