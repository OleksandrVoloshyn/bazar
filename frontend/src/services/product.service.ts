import {axiosService} from "./axios.service";

import {urls} from "../constants";

const productService = {
    getAll: (QueryParamsObj: any) => axiosService.get(urls.products, {params: {...QueryParamsObj}}),
    getById: (pk: string) => axiosService.get(`${urls.products}/${pk}/details`),
    getCategories: () => axiosService.get(`${urls.products}/categories`),
    getBrands: () => axiosService.get(`${urls.products}/brands`)
}

export {productService}