import {FC, useEffect} from "react"

import {useAppDispatch, useAppSelector} from "../../hooks";
import {User} from "../User/User";
import {userActions} from "../../redux";

const Users: FC = () => {
    const {users} = useAppSelector(({userReducer}) => userReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        return () => {
            dispatch(userActions.resetUsers())
        }
    }, [])

    return (
        <div>
            {users?.data && users.data.map(candidate => <User key={candidate.id} candidate={candidate}/>)}
        </div>
    );
};

export {Users};