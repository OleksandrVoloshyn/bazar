import {axiosService, Res} from "./axios.service";

import {IProduct, IQueryParams, IResponce} from "../interfaces";
import {urls} from "../constants";

const productService = {
    getAll: (QueryParamsObj: Partial<IQueryParams>): Res<IResponce<IProduct>> => axiosService.get(urls.products, {params: {...QueryParamsObj}}),
    create: (product: Partial<IProduct>) => axiosService.post(`${urls.products}/create`, product),
    getById: (pk: string) => axiosService.get(`${urls.products}/${pk}/details`),
    getCategories: () => axiosService.get(`${urls.products}/categories`),
    getBrands: () => axiosService.get(`${urls.products}/brands`),
    getMyProducts: () => axiosService.get(`${urls.products}/user/products`),
    addComment: (text: string, pk: string) => axiosService.post(`${urls.products}/${pk}/add_comment`, {text})
}

export {productService}