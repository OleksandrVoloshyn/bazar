import {FC, useEffect} from "react"
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {productActions} from "../../../redux";
import {Comments} from "../../../components";

const CommentListPage: FC = () => {
    const {myComments} = useAppSelector(({productReducer}) => productReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(productActions.getMyComments())
    }, [dispatch])
    return (
        <div>
            <Comments comments={myComments}/>
        </div>
    );
};

export {CommentListPage};