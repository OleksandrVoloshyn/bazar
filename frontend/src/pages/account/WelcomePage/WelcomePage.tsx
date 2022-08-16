import {FC} from "react"

import {useAppSelector} from "../../../hook";

const WelcomePage: FC = () => {
    const {user} = useAppSelector(({userReducer}) => userReducer);

    return (
        <div> {user?.profile.name} glad to see u</div>
    );
};

export {WelcomePage};