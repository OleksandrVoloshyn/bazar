import {IUserProfile} from "./user_profile.interface";

export interface IUser {
    id: string,
    email: string,
    password: string,
    profile: IUserProfile
}
