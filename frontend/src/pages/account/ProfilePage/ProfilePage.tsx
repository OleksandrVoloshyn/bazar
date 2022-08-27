import {FC, useRef, useState} from "react"

import {useAppDispatch, useAppSelector} from "../../../hook";
import {notFoundImage} from "../../../constants";
import {ChangeProfileField} from "../../../components";
import {userActions} from "../../../redux";

const ProfilePage: FC = () => {
    const {user} = useAppSelector(({userReducer}) => userReducer);
    const [isChangeAvatar, setIsChangeAvatar] = useState<boolean>(false);
    const avatar = useRef<any>();
    const dispatch = useAppDispatch();

    const changeAvatar = async () => {
        avatar.current.files[0] && await dispatch(userActions.updateAccount({avatar: avatar.current.files[0]}))
        setIsChangeAvatar(false)
    }

    // todo make usual profile component and with change  onClick
    return (
        <div>
            {user &&
                <div>

                    <div>
                        <img src={user.profile.avatar || notFoundImage} alt={'Avatar'} style={{height: '400px'}}/>
                        {isChangeAvatar
                            ? <div>
                                <input type="file" ref={avatar}/>
                                <button onClick={changeAvatar}>save</button>
                            </div>
                            : <button onClick={() => setIsChangeAvatar(true)}>change</button>
                        }
                    </div>

                    <div>
                        <ChangeProfileField fieldName={'name'} validators={{isEmpty: true, isNameError: true}}
                                            initialState={user.profile.name} profile={user.profile}
                                            errors={'nameError'}/>
                        <ChangeProfileField fieldName={'surname'} validators={{isEmpty: true, isNameError: true}}
                                            initialState={user.profile.surname} profile={user.profile}
                                            errors={'nameError'}/>
                        <ChangeProfileField fieldName={'age'} errors={'ageError'}
                                            initialState={user.profile.age.toString()}
                                            validators={{isEmpty: true, isAgeError: true}}
                                            inputType={'number'} profile={user.profile}/>
                        <ChangeProfileField fieldName={'phone'} validators={{isEmpty: true, isPhoneError: true}}
                                            initialState={user.profile.phone} profile={user.profile}
                                            errors={'phoneError'}/>
                    </div>
                </div>
            }
        </div>
    );
};

export {ProfilePage};