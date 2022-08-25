import {axiosService, Res} from "./axios.service";

import {IProduct, IProductDetails, IQueryParams, IResponce} from "../interfaces";
import {urls} from "../constants";

const productService = {
    getAll: (QueryParamsObj: Partial<IQueryParams>): Res<IResponce<IProduct>> => axiosService.get(urls.products, {params: {...QueryParamsObj}}),
    create: (product: Partial<IProductDetails>) => axiosService.post(`${urls.products}/create`, product),
    // {headers: {"Content-Type": "multipart/form-data"}}
    getById: (pk: string) => axiosService.get(`${urls.products}/${pk}/details`),
    getCategories: () => axiosService.get(`${urls.products}/categories`),
    getBrands: () => axiosService.get(`${urls.products}/brands`),
    getMyProducts: () => axiosService.get(`${urls.products}/user/products`),
    getMyComments: () => axiosService.get(`${urls.products}/user/comments`),
    addComment: (text: string, pk: string) => axiosService.post(`${urls.products}/${pk}/add_comment`, {text}),
    removeById: (pk: string): Res<void> => axiosService.delete(`${urls.products}/${pk}/remove`,),
    deleteComment: (pk: string): Res<void> => axiosService.delete(`${urls.products}/comments/${pk}/remove`,),
    update: (product: Partial<IProductDetails>): Res<IProductDetails> => axiosService.put(`${urls.products}/${product.id}/update`, product),
    removeImageById: (pk: string) => axiosService.delete(`${urls.products}/images/${pk}/remove`),
    addProductImage: (productId: string, file: File) => axiosService.post(`${urls.products}/${productId}/add_image`, {file}),
    removeCategory: (pk: string) => axiosService.delete(`${urls.products}/categories/${pk}/remove`),
    createCategory: (categoryTitle: string) => axiosService.post(`${urls.products}/categories/create`, {title: categoryTitle})
}

export {productService}