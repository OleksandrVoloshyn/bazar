import axios, {AxiosResponse} from "axios";
import {createBrowserHistory} from 'history'

import {baseURL} from "../constants";
import {authService} from "./auth.service";
import {localStorageService} from "./localStorage.service";

const history = createBrowserHistory();
const axiosService = axios.create({baseURL, headers: {"Content-Type": "multipart/form-data"}});

let isRefreshing = false
axiosService.interceptors.request.use((config) => {
    const access = localStorageService.getAccess()
    if (access) {
        config.headers!.Authorization = `Bearer ${access}`
    }
    return config
})

axiosService.interceptors.response.use((config) => {
        return config
    },
    async (error) => {
        const refreshToken = localStorageService.getRefresh()
        if (error.response?.status === 401 && error.config && !isRefreshing && refreshToken) {
            isRefreshing = true
            try {
                const {data} = await authService.refresh(refreshToken);
                const {access, refresh} = data;
                localStorageService.setAccess(access)
                localStorageService.setRefresh(refresh)
            } catch (e) {
                localStorageService.logout()
                history.replace('/login')
            }
            isRefreshing = false
            return axiosService.request(error.config)
        }
        return Promise.reject(error)
    })

export type Res<T> = Promise<AxiosResponse<T>>
export {axiosService, history}