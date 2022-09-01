import {FC, useEffect, useState} from "react"
import {useLocation} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {UpdateProfileForm} from "../UpdateProfileForm/UpdateProfileForm";
import {ProfileAvatar} from "../ProfileAvatar/ProfileAvatar";
import {AdminPanelForProfile} from "../AdminPanelForProfile/AdminPanelForProfile";
import {userActions} from "../../redux";

const Profile: FC = () => {
    // todo  check from comment or check product owner
    const {user, updateProfileErrors, candidate} = useAppSelector(({userReducer}) => userReducer);
    const [isUpdateProfile, setIsUpdateProfile] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const {pathname} = useLocation();
    const isAdminPage = pathname.includes('admin')

    const target = candidate || user
    const isOwner = !candidate || (candidate.id === user?.id)

    useEffect(() => {
        return () => {
            dispatch(userActions.resetCandidate())
        }
    }, [])

    return (
        <div>
            {target && !(isAdminPage && !candidate) && <div>
                <ProfileAvatar currentAvatar={target.profile.avatar} isOwner={isOwner}/>

                {isUpdateProfile || updateProfileErrors
                    ? <UpdateProfileForm profile={target.profile} setIsUpdateProfile={setIsUpdateProfile}/>
                    : <div>
                        <div>Name: {target.profile.name}</div>
                        <div>Surname: {target.profile.surname}</div>
                        <div>Age: {target.profile.age}</div>
                        <div>Phone: {target.profile.phone}</div>

                        {isOwner && <div onClick={() => setIsUpdateProfile(true)}>
                            <button>Change profile</button>
                        </div>}
                    </div>}
                {user?.is_staff && candidate && <AdminPanelForProfile/>}
            </div>}
        </div>
    );
};

export {Profile};