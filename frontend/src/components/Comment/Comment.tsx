import {FC, useEffect} from "react"
import {IComment} from "../../interfaces";
import {BsTrash} from 'react-icons/bs'

import {useAppDispatch, useAppSelector} from "../../hooks";
import {productActions, userActions} from "../../redux";
import {Link} from "react-router-dom";

interface IProps {
    comment: IComment,
    isProduct?: boolean
}

const Comment: FC<IProps> = ({comment, isProduct}) => {
    const {user} = useAppSelector(({userReducer}) => userReducer);
    const dispatch = useAppDispatch();
    const isOwner = user?.id === comment.owner.id

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
            : {comment.text}
            {(isOwner || user?.is_staff) && <BsTrash onClick={() => dispatch(productActions.deleteComment({pk: comment.id}))}/>}
        </div>
    );
};

export {Comment};