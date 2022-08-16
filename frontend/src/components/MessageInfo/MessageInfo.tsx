import {FC} from "react"

interface IProps {
    data: string
}

const MessageInfo: FC<IProps> = ({data}) => {
    return (
        <h2 style={{textAlign: "center"}}>{data}</h2>
    );
};

export {MessageInfo};