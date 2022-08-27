import {IUserProfile} from "./user_profile.interface";

export interface IUser {
    id: string,
    email: string,
    password: string,
    is_staff: boolean,
    profile: IUserProfile
}
