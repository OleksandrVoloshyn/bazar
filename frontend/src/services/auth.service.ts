import {axiosService, Res} from "./axios.service";
import {urls} from "../constants";
import {IUser} from "../interfaces";

const authService = {
    login: (user: Partial<IUser>): Res<any> => axiosService.post(urls.auth, user),
    refresh: (refresh: string): Res<any> => axiosService.post(`${urls.auth}/refresh`, refresh),
    activate: (token: string): Res<any> => axiosService.get(`${urls.auth}/activate/${token}`),
    sendRecoveryToEmail: (email: string): Res<any> => axiosService.post(`${urls.auth}/recovery`, {email}),
    recoveryPassword: (token: string, newPassword: string): Res<any> => axiosService.post(`${urls.auth}/recovery/${token}`, {password: newPassword})
}
//todo TS Res
export {
    authService
}