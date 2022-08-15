import {axiosService, Res} from "./axios.service";

import {urls} from "../constants";
import {IUser, IUserProfile} from "../interfaces";

const userService = {
    create: (user: IUser): Res<IUser> => axiosService.post(urls.users, user),
    current: (): Res<IUser> => axiosService.get(`${urls.users}/current`),
    updateProfile: (body: Partial<IUserProfile>): Res<IUserProfile> => axiosService.patch(`${urls.users}/profile/update`, {...body})
}


export {userService}