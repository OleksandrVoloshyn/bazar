import {FC} from "react"

interface IProps {
    data: string
}

const Info: FC<IProps> = ({data}) => {
    return (
        <h2 style={{textAlign: "center"}}>{data}</h2>
    );
};

export {Info};