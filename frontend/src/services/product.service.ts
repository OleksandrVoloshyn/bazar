import {axiosService, Res} from "./axios.service";

import {IBrand, IProduct, IProductDetails, IQueryParams, IResponse} from "../interfaces";
import {urls} from "../constants";
//todo add TS
//todo change names
const productService = {
    getAll: (QueryParamsObj: Partial<IQueryParams>): Res<IResponse<IProduct>> => axiosService.get(urls.products, {params: {...QueryParamsObj}}),
    //todo change name to get
    create: (product: Partial<IProductDetails>) => axiosService.post(`${urls.products}/create`, product),
    // {headers: {"Content-Type": "multipart/form-data"}}
    // todo  try form data only for form with images
    getById: (pk: string) => axiosService.get(`${urls.products}/${pk}/details`),
    getMyProducts: () => axiosService.get(`${urls.products}/user/products`),
    update: (product: Partial<IProductDetails>): Res<IProductDetails> => axiosService.put(`${urls.products}/${product.id}/update`, product),
    removeById: (pk: string): Res<void> => axiosService.delete(`${urls.products}/${pk}/remove`,),

    getCategories: () => axiosService.get(`${urls.products}/categories`),
    createCategory: (categoryTitle: string) => axiosService.post(`${urls.products}/categories/create`, {title: categoryTitle}),
    removeCategory: (pk: string) => axiosService.delete(`${urls.products}/categories/${pk}/remove`),

    getBrands: () => axiosService.get(`${urls.products}/brands`),
    removeBrand: (pk: string): Res<void> => axiosService.delete(`${urls.products}/brands/${pk}/remove`),
    createBrand: (newBrand: IBrand): Res<IBrand> => axiosService.post(`${urls.products}/brands/create`, {...newBrand}, {headers: {"Content-Type": "multipart/form-data"}}),

    getMyComments: () => axiosService.get(`${urls.products}/user/comments`),
    addComment: (text: string, pk: string) => axiosService.post(`${urls.products}/${pk}/add_comment`, {text}),
    deleteComment: (pk: string): Res<void> => axiosService.delete(`${urls.products}/comments/${pk}/remove`,),

    addProductImage: (productId: string, file: File) => axiosService.post(`${urls.products}/${productId}/add_image`, {file}),
    removeImageById: (pk: string) => axiosService.delete(`${urls.products}/images/${pk}/remove`),
}

export {productService}