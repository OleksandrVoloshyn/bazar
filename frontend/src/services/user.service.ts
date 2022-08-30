import {axiosService, Res} from "./axios.service";

import {urls} from "../constants";
import {IUser, IUserProfile} from "../interfaces";

const userService = {
    current: (): Res<IUser> => axiosService.get(`${urls.users}/current`),
    getForRemove: (userEmail: string): Res<IUser> => axiosService.get(`${urls.users}/${userEmail}`),

    create: (user: IUser): Res<void> => axiosService.post(urls.users, user),

    updateProfile: (body: Partial<IUserProfile>): Res<IUserProfile> => axiosService.patch(`${urls.users}/profile/update`, {...body}),
    toAdmin: (pk: string): Res<IUser> => axiosService.patch(`${urls.users}/${pk}/to_admin`),
    toLower: (pk: string): Res<IUser> => axiosService.patch(`${urls.users}/${pk}/to_lower`),
    removeUser: (pk: string): Res<void> => axiosService.delete(`${urls.users}/${pk}/remove`),
}


export {userService}