import {FC, useState} from "react"
import {useAppDispatch, useAppSelector} from "../../../hook";
import {userActions} from "../../../redux";

const ChangeRolePage: FC = () => {
    // todo userForChange  make separat component to find user
    const {userForRemove, userNotFound} = useAppSelector(({userReducer}) => userReducer);
    const [userEmail, setUserEmail] = useState<string>('');
    const dispatch = useAppDispatch();

    const searchCandidate = () => {
        dispatch(userActions.getCandidate(userEmail))
    }

    const toAdmin = () => {
        if (userForRemove?.id){
            dispatch(userActions.toAdmin(userForRemove?.id))
        }
    }
    const toLower = () => {
        if(userForRemove?.id){
            dispatch(userActions.toLower(userForRemove?.id))
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
                ? <div>{userForRemove.id} -- {userForRemove.email} <span onClick={toAdmin}>Admin</span> <span
                    onClick={toLower}>not admin</span></div>
                : userNotFound && <div>User with this email is not exist</div>
            }
        </div>
    );
};

export {ChangeRolePage};