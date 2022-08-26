import {FC, useState} from "react"
import {useAppDispatch, useAppSelector} from "../../../hook";
import {userActions} from "../../../redux";

const UserControlPage: FC = () => {
    const {userForRemove, userNotFound} = useAppSelector(({userReducer}) => userReducer);
    const [userEmail, setUserEmail] = useState<string>('');
    const dispatch = useAppDispatch();

    const searchCandidate = () => {
        dispatch(userActions.getCandidate(userEmail))
    }
    const removeUser = () => {
        if (userForRemove?.id) {
            dispatch(userActions.removeUser(userForRemove?.id))
        }
    }

    return (
        <div>
            <div><label>
                User Email: <input type="search" onChange={(e) => setUserEmail(e.target.value)}
                                   value={userEmail}/></label>
            </div>
            <button onClick={searchCandidate}>search</button>
            {userForRemove
                ? <div>{userForRemove.id} {userForRemove.email}
                    <span onClick={removeUser}>X</span>
                </div>
                : userNotFound && <div>User with this email is not exist</div>
            }
        </div>
    );
};

export {UserControlPage};