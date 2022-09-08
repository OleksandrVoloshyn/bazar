import {FC} from "react"

import {useAppDispatch, useAppSelector} from "../../hooks";
import {userActions} from "../../redux";
import css from './AdminPanelForProfile.module.css'

const AdminPanelForProfile: FC = () => {
    const {candidate, user} = useAppSelector(({userReducer}) => userReducer);
    const dispatch = useAppDispatch();

    const removeUser = async () => candidate && await dispatch(userActions.removeUser({pk: candidate.id}))
    const toAdmin = async () => candidate && await dispatch(userActions.toAdmin({pk: candidate.id}))
    const toLower = async () => candidate && await dispatch(userActions.toLower({pk: candidate.id}))

    return (
        <div className={css.panel}>
            {candidate && <div className={css.panel}>
                <div> Email: {candidate.email}</div>
                <div> Is Admin: {candidate.is_staff.toString()}</div>
                <div> Is Super User: {candidate.is_superuser.toString()}</div>

                {(!candidate.is_staff || user?.is_superuser) && <button onClick={removeUser}>Remove User</button>}
                {user?.is_superuser && !candidate.is_superuser && <span>
                        <button onClick={toAdmin}>User to Admin</button>
                        <button onClick={toLower}>Admin to User</button>
                    </span>}
            </div>}
        </div>
    );
};

export {AdminPanelForProfile};