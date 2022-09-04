import {FC} from "react"

import {Header, MessageInfo} from "../../components";

const NotFoundPage: FC = () => {
    return (
        <div>
            <Header/>
            <MessageInfo data={'Oooops something wrong'}/>
        </div>
    )
};

export {NotFoundPage};