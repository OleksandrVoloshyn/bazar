import {axiosService} from "./axios.service";
import {urls} from "../constants";
import {IUser} from "../interfaces";

const authService = {
    login: (user: Partial<IUser>) => axiosService.post(urls.auth, user),
    refresh: (refresh: string) => axiosService.post(`${urls.auth}/refresh`, {refresh}),
    activate: (token: string) => axiosService.get(`${urls.auth}/activate/${token}`),
    sendRecoveryToEmail: (email: string) => axiosService.post(`${urls.auth}/recovery`, {email}),
    recoveryPassword: (token: string, newPassword: string) => axiosService.post(`${urls.auth}/recovery/${token}`, {password: newPassword})
}

export {
    authService
}