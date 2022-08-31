import {FC, useRef, useState} from "react"
import {GrUpdate} from 'react-icons/gr'

import {useAppDispatch} from "../../hooks";
import {userActions} from "../../redux";
import {notFoundImage} from "../../constants";
import css from './ProfileAvatar.module.css'

interface IProps {
    currentAvatar?: string,
    isOwner: boolean
}

const ProfileAvatar: FC<IProps> = ({currentAvatar, isOwner}) => {
    const dispatch = useAppDispatch();
    const avatar = useRef<any>();

    const [isUpdateAvatar, setIsUpdateAvatar] = useState<boolean>(false);

    const updateAvatar = async () => {
        avatar.current.files[0] && await dispatch(userActions.updateProfile({avatar: avatar.current.files[0]}))
        setIsUpdateAvatar(false)
    }

    return (
        <div className={css.wrap}>
            <img src={currentAvatar || notFoundImage} alt={'Avatar'} style={{width: '400px'}}/>
            {isUpdateAvatar
                ? <div className={css.m_left10}>
                    <input type="file" ref={avatar}/>
                    <button onClick={updateAvatar}>save</button>
                </div>
                : isOwner && <GrUpdate onClick={() => setIsUpdateAvatar(true)} className={css.m_left10}/>}
        </div>
    );
};

export {ProfileAvatar};