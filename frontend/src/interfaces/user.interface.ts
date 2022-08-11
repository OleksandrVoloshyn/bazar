import {IUserProfile} from "./user_profile.interface";

export interface IUser {
    email: string,
    password: string,
    profile:IUserProfile
}
