import {FC} from "react"

import {Profile, Users} from '../../components';

const UserControlPage: FC = () => {
    return (
        <div>
            <Profile/>
            <Users/>
        </div>
    );
};

export {UserControlPage};