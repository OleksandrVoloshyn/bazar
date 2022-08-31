import {FC} from "react"
import {IUser} from "../../interfaces";
import {Link} from "react-router-dom";
import {AdminPanelForProfile} from "../AdminPanelForProfile/AdminPanelForProfile";
import {useAppDispatch} from "../../hooks";
import {userActions} from "../../redux";

interface IProps {
    candidate: IUser
}

const User: FC<IProps> = ({candidate}) => {
    const dispatch = useAppDispatch();

    const makeCandidate = () => {
        dispatch(userActions.makeCandidate(candidate))
    }

    return (
        <div>
            {candidate.profile.name} {candidate.profile.surname} {candidate.email}
            <button onClick={makeCandidate}>show details</button>
        </div>
    );
};

export {User};