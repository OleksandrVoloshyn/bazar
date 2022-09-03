import {FC, useEffect} from "react"
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {productActions} from "../../../redux";
import {Comments, PageNavigate} from "../../../components";

const CommentListPage: FC = () => {
    const {myComments} = useAppSelector(({productReducer}) => productReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(productActions.getClientComments())
    }, [])

    return (
        <div>
            {myComments?.data && <Comments comments={myComments.data} isProduct={true}/>}
        </div>
    );
};

export {CommentListPage};