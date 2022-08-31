import {FC} from "react"
import {IComment} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {productActions} from "../../redux";

interface IProps {
    comment: IComment
}

const Comment: FC<IProps> = ({comment}) => {
    const {user} = useAppSelector(({userReducer}) => userReducer);
    const isOwner = user?.id === comment.owner.id
    const dispatch = useAppDispatch();

    const removeComment = () => {
        dispatch(productActions.deleteComment({pk:comment.id}))
    }
    return (
        <div>
            {comment.id} -- {comment.text} -- {comment.owner.profile.name} {isOwner &&
            <span onClick={removeComment}>X</span>}
        </div>
    );
};

export {Comment};