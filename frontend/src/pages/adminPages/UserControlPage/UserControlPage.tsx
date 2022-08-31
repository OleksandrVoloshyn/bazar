import {FC, useState} from "react"
import {BsSearch} from 'react-icons/bs'

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {userActions} from "../../../redux";
import {Profile, Users} from "../../../components";


const UserControlPage: FC = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const dispatch = useAppDispatch();

    const searchUsers = async () => {
        if (searchValue) {
            dispatch(userActions.searchUsers(searchValue))
        }
    }

    return (
        <div>
            <Profile/>
            <div>
                <label>Looking for users by name surname or email: </label>
                <br/>
                <input type="search" onChange={(e) => setSearchValue(e.target.value)} value={searchValue}/>
                <BsSearch onClick={searchUsers}/>
            </div>
            <Users/>
        </div>
    );
};

export {UserControlPage};