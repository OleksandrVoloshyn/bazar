import {axiosService, Res} from "./axios.service";

import {IBrand, ICategory, IProduct, IProductDetails, IQueryParams, IResponse} from "../interfaces";
import {urls} from "../constants";

const productService = {
    getAll: (QueryParamsObj: Partial<IQueryParams>): Res<IResponse<IProduct>> => axiosService.get(urls.products, {params: {...QueryParamsObj}}),
    create: (product: Partial<IProductDetails>) => axiosService.post(`${urls.products}/create`, product),
    getById: (pk: string) => axiosService.get(`${urls.products}/${pk}/details`),
    getMyProducts: () => axiosService.get(`${urls.products}/user/products`),
    update: (product: Partial<IProductDetails>): Res<IProductDetails> => axiosService.put(`${urls.products}/${product.id}/update`, product),
    removeById: (pk: string): Res<void> => axiosService.delete(`${urls.products}/${pk}/remove`,),

    getCategories: (): Res<IResponse<ICategory>> => axiosService.get(`${urls.products}/categories`),
    createCategory: (categoryTitle: string): Res<ICategory> => axiosService.post(`${urls.products}/categories`, {title: categoryTitle}),
    updateCategory: (title: string, pk: string): Res<ICategory> => axiosService.put(`${urls.products}/categories/${pk}`, {title}),
    removeCategory: (pk: string): Res<void> => axiosService.delete(`${urls.products}/categories/${pk}`),

    getBrands: (): Res<IResponse<IBrand>> => axiosService.get(`${urls.products}/brands`),
    createBrand: (brand: IBrand): Res<IBrand> => axiosService.post(`${urls.products}/brands`, {...brand}, {headers: {"Content-Type": "multipart/form-data"}}),
    updateBrand: (data: Partial<IBrand>, pk: string): Res<IBrand> => axiosService.patch(`${urls.products}/brands/${pk}`, {...data}, {headers: {"Content-Type": "multipart/form-data"}}),
    removeBrand: (pk: string): Res<void> => axiosService.delete(`${urls.products}/brands/${pk}`),

    getMyComments: () => axiosService.get(`${urls.products}/user/comments`),
    addComment: (text: string, pk: string) => axiosService.post(`${urls.products}/${pk}/add_comment`, {text}),
    deleteComment: (pk: string): Res<void> => axiosService.delete(`${urls.products}/comments/${pk}/remove`,),

    addProductImage: (productId: string, file: File) => axiosService.post(`${urls.products}/${productId}/add_image`, {file}),
    removeImageById: (pk: string) => axiosService.delete(`${urls.products}/images/${pk}/remove`),
}

export {productService}