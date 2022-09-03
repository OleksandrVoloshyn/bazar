import {axiosService, Res} from "./axios.service";

import {urls} from "../constants";
import {IResponse, IUser, IUserProfile} from "../interfaces";

const userService = {
    current: (): Res<IUser> => axiosService.get(`${urls.users}/current`),
    create: (user: IUser): Res<void> => axiosService.post(urls.users, user),
    updateProfile: (body: Partial<IUserProfile>): Res<IUserProfile> => axiosService.patch(`${urls.users}/profile/update`,
        {...body}, {headers: {"Content-Type": "multipart/form-data"}}),
    searchUsers: (searchField: string): Res<IResponse<IUser>> => axiosService.get(`${urls.users}`, {params: {search: searchField}}),
    // searching by name,surname or email

    toAdmin: (pk: string): Res<IUser> => axiosService.patch(`${urls.users}/${pk}/to_admin`),
    toLower: (pk: string): Res<IUser> => axiosService.patch(`${urls.users}/${pk}/to_lower`),
    getById: (pk: string): Res<IUser> => axiosService.get(`${urls.users}/${pk}/target`),
    removeUser: (pk: string): Res<void> => axiosService.delete(`${urls.users}/${pk}/target`),
}


export {userService}