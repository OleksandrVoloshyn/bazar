import {axiosService, Res} from "./axios.service";

import {ICategory, IResponse} from "../interfaces";
import {urls} from "../constants";

const categoryService = {
    getCategories: (): Res<IResponse<ICategory>> => axiosService.get(`${urls.categories}`, {params: {pagination: '60'}}),
    createCategory: (title: string): Res<ICategory> => axiosService.post(`${urls.categories}`, {title}),
    updateCategory: (title: string, pk: string): Res<ICategory> => axiosService.put(`${urls.categories}/${pk}`, {title}),
    removeCategory: (pk: string): Res<void> => axiosService.delete(`${urls.categories}/${pk}`),
}

export {categoryService}