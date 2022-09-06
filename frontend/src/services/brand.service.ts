import {axiosService, Res} from "./axios.service";

import {IBrand, IResponse} from "../interfaces";
import {urls} from "../constants";


const brandService = {
    getBrands: (): Res<IResponse<IBrand>> => axiosService.get(`${urls.brands}`, {params: {pagination: '60'}}),
    createBrand: (brand: IBrand): Res<IBrand> => axiosService.post(`${urls.brands}`, {...brand}, {headers: {"Content-Type": "multipart/form-data"}}),
    updateBrand: (data: Partial<IBrand>, pk: string): Res<IBrand> => axiosService.patch(`${urls.brands}/${pk}`, {...data}, {headers: {"Content-Type": "multipart/form-data"}}),
    removeBrand: (pk: string): Res<void> => axiosService.delete(`${urls.brands}/${pk}`),
}

export {brandService}