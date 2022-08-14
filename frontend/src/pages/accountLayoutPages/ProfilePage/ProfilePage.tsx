import {FC, useEffect} from "react"
import {useAppSelector} from "../../../hook";
import {Link} from "react-router-dom";
import {urls} from "../../../constants";

const ProfilePage: FC = () => {
    // todo повна інфа про юзера з можливістю змінни полів і аватарки
    const {user} = useAppSelector(({userReducer}) => userReducer);

    const avatarSrc: string = urls.media + user?.profile.avatar

    useEffect(() => {
    }, [user])

    return (
        <div>
            {user &&
                <div>
                    {user.profile.avatar
                        ? <div><img src={avatarSrc} alt={'Avatar'} style={{height: '400px'}}/></div>
                        : <div><img src={'https://lightwidget.com/wp-content/uploads/local-file-not-found.png'}
                                    alt={'Avatar'} style={{height: '400px'}}/></div>}
                    <div>
                        <div>Name: {user.profile.name}</div>
                        <div>Surname: {user.profile.surname}</div>
                        <div>Age: {user.profile.age}</div>
                        <div>Phone: {user.profile.phone}</div>
                    </div>
                </div>
            }
        </div>
    );
};

export {ProfilePage};