import axios, {AxiosResponse} from "axios";
import {createBrowserHistory} from 'history'

import {baseURL} from "../constants";
import {authService} from "./auth.service";

const history = createBrowserHistory();
const axiosService = axios.create({baseURL});

let isRefreshing = false
axiosService.interceptors.request.use((config) => {
    // todo окремий сервіс на локалсторедж
    const access = localStorage.getItem('access');
    if (access) {
        config.headers!.Authorization = `Bearer ${access}`
    }
    return config
})

axiosService.interceptors.response.use((config) => {
        return config
    },
    async (error) => {
        const refreshToken = localStorage.getItem('refresh');
        if (error.response?.status === 401 && error.config && !isRefreshing && refreshToken) {
            isRefreshing = true
            try {
                const {data} = await authService.refresh(refreshToken);
                const {access, refresh} = data;
                localStorage.setItem('access', access)
                localStorage.setItem('refresh', refresh)
            } catch (e) {
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
                history.replace('/login')
                // history.replace('/login?expSession=true')
            }
            isRefreshing = false
            return axiosService.request(error.config)
        }
        return Promise.reject(error)
    })

export type Res<T> = Promise<AxiosResponse<T>>
export {axiosService, history}