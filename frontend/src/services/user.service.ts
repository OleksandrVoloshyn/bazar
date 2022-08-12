import {axiosService, Res} from "./axios.service";

import {urls} from "../constants";
import {IUser} from "../interfaces";

const userService = {
    create: (user: IUser):Res<any> => axiosService.post(urls.users, user)
}

export {userService}