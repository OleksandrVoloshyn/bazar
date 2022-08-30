import {axiosService, Res} from "./axios.service";

import {urls} from "../constants";
import {IToken, IUser} from "../interfaces";

const authService = {
    login: (user: Partial<IUser>): Res<IToken> => axiosService.post(urls.auth, user),
    activate: (token: string): Res<void> => axiosService.get(`${urls.auth}/activate/${token}`),
    refresh: (refresh: string): Res<IToken> => axiosService.post(`${urls.auth}/refresh`, refresh),
    sendRecoveryToEmail: (email: string): Res<void> => axiosService.post(`${urls.auth}/recovery`, {email}),
    recoveryPassword: (token: string, newPassword: string): Res<void> => axiosService.post(`${urls.auth}/recovery/${token}`, {password: newPassword}),
    logout: (): void => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
    }
}
export {
    authService
}