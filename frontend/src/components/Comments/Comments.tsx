import {FC} from "react"
import {IComment, IResponse} from "../../interfaces";
import {Comment} from "../Comment/Comment";

interface IProps {
    comments: IComment[],
    isProduct?:boolean
}

const Comments: FC<IProps> = ({comments,isProduct}) => {
    return (
        <div>
            {comments && comments.map(comment => <Comment key={comment.id} comment={comment} isProduct={isProduct}/>)}
        </div>
    );
};

export {Comments};