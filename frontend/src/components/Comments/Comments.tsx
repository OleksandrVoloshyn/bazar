import {FC} from "react"
import {IComment} from "../../interfaces";
import {Comment} from "../Comment/Comment";

interface IProps {
    comments: IComment[]
}

const Comments: FC<IProps> = ({comments}) => {
    return (
        <div>
            {comments && comments.map(comment => <Comment key={comment.id} comment={comment}/>)}
        </div>
    );
};

export {Comments};