import {FC, useState} from "react"

import {productActions} from "../../redux";
import {useAppDispatch} from "../../hooks";

interface IProps {
    pk: string,
    setAddComment: CallableFunction
}

const AddComment: FC<IProps> = ({pk, setAddComment}) => {
    const [text, setText] = useState<string>('')
    const dispatch = useAppDispatch();

    const comment = async () => {
        await dispatch(productActions.addComment({text, pk}))
        setAddComment(false)
    }

    return (
        <div>
            <textarea onChange={(e) => setText(e.target.value)} value={text}/>
            <button onClick={comment} disabled={!text}>comment</button>
        </div>
    );
};

export {AddComment};