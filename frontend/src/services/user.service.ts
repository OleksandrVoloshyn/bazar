import {axiosService, Res} from "./axios.service";

import {urls} from "../constants";
import {IUser, IUserProfile} from "../interfaces";

const userService = {
    create: (user: IUser): Res<IUser> => axiosService.post(urls.users, user),
    current: (): Res<IUser> => axiosService.get(`${urls.users}/current`),
    addAvatar: (avatar: any): Res<any> => axiosService.patch(`${urls.users}/avatars`, {avatar}),
    update: (body: Partial<IUserProfile>): Res<any> => axiosService.put(`${urls.users}/profile`, {body})
}

export {userService}