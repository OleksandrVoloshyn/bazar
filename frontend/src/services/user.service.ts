import {axiosService} from "./axios.service";
import {urls} from "../constants";
import {IUser} from "../interfaces";

const userService = {
    create: (user: IUser) => axiosService.post(urls.users, user)
}

export {userService}