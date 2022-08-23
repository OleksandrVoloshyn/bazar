import {FC} from "react"
import {IComment} from "../../interfaces";

interface IProps {
    comment: IComment
}

const Comment: FC<IProps> = ({comment}) => {
    return (
        <div>
            {comment.id} -- {comment.text} -- {comment.owner.profile.name}
        </div>
    );
};

export {Comment};