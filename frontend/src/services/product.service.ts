import {axiosService, Res} from "./axios.service";

import {IProduct, IResponce} from "../interfaces";
import {urls} from "../constants";

const productService = {
    getAll: (QueryParamsObj: any): Res<IResponce<IProduct>> => axiosService.get(urls.products, {params: {...QueryParamsObj}}),
    create: (product: any) => axiosService.post(`${urls.products}`, product),
    getById: (pk: string) => axiosService.get(`${urls.products}/${pk}/details`),
    getCategories: () => axiosService.get(`${urls.products}/categories`),
    getBrands: () => axiosService.get(`${urls.products}/brands`),
    getMyProducts: () => axiosService.get(`${urls.products}/user/products`)
}

export {productService}