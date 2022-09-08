import {axiosService, Res} from "./axios.service";

import {urls} from "../constants";
import {IQueryParams, IResponse, IUser, IUserProfile} from "../interfaces";

const userService = {
    getCurrent: (): Res<IUser> => axiosService.get(`${urls.users}/current`),
    getById: (pk: string): Res<IUser> => axiosService.get(`${urls.users}/${pk}/target`),
    searchUsers: (params: Partial<IQueryParams>): Res<IResponse<IUser>> => axiosService.get(`${urls.users}`, {params}),
    create: (user: IUser): Res<void> => axiosService.post(urls.users, user),
    updateProfile: (body: Partial<IUserProfile>): Res<IUserProfile> => axiosService.patch(`${urls.users}/profile/update`,
        {...body}, {headers: {"Content-Type": "multipart/form-data"}}),
    toAdmin: (pk: string): Res<IUser> => axiosService.patch(`${urls.users}/${pk}/to_admin`),
    toLower: (pk: string): Res<IUser> => axiosService.patch(`${urls.users}/${pk}/to_lower`),
    removeUser: (pk: string): Res<void> => axiosService.delete(`${urls.users}/${pk}/target`),
}


export {userService}