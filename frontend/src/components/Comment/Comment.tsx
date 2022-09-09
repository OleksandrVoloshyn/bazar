import {FC, useEffect} from "react"
import {BsTrash} from 'react-icons/bs'
import {Link} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {IComment} from "../../interfaces";
import {productActions, userActions} from "../../redux";

interface IProps {
    comment: IComment,
    isProduct?: boolean
}

const Comment: FC<IProps> = ({comment, isProduct}) => {
    const {user} = useAppSelector(({userReducer}) => userReducer);
    const dispatch = useAppDispatch();
    const isOwner = user?.id === comment.owner.id

    const deleteComment = async () => await dispatch(productActions.deleteComment({pk: comment.id}))

    useEffect(() => {
        !user && dispatch(userActions.getCurrent())
    }, [])

    return (
        <div>
            {isProduct
                ? <span><Link to={`/products/${comment.product.id}/details`}>{comment.product.title}</Link></span>
                : <span>
                    <Link to={`/users/${comment.owner.id}`}>
                        {comment.owner.profile.name} {comment.owner.profile.surname}
                    </Link></span>}
            -- {comment.text}
            {(isOwner || user?.is_staff) && <BsTrash onClick={deleteComment}/>}
        </div>
    );
};

export {Comment};