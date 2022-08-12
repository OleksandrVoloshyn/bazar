import {FC} from "react"

interface IProps {
    data: string
}

const Info: FC<IProps> = ({data}) => {
    return (
        <h2>{data}</h2>
    );
};

export {Info};