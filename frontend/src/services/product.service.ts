import {axiosService, Res} from "./axios.service";

import {
    IBrand,
    ICategory,
    IComment,
    IProduct,
    IProductDetails,
    IProductImage,
    IQueryParams,
    IResponse
} from "../interfaces";
import {urls} from "../constants";

const productService = {
    getAll: (QueryParamsObj: Partial<IQueryParams>): Res<IResponse<IProduct>> => axiosService.get(urls.products, {params: {...QueryParamsObj}}),
    createProduct: (product: Partial<IProductDetails>): Res<void> => axiosService.post(`${urls.products}/create`, product),
    getClientProducts: (params: Partial<IQueryParams>): Res<IResponse<IProduct>> => axiosService.get(`${urls.products}/client/products`, {params}),
    getProductById: (pk: string): Res<IProductDetails> => axiosService.get(`${urls.products}/${pk}/target`),
    updateProduct: (product: Partial<IProductDetails>): Res<IProductDetails> => axiosService.patch(`${urls.products}/${product.id}/target`, product),
    removeProduct: (pk: string): Res<void> => axiosService.delete(`${urls.products}/${pk}/target`),

    addProductImage: (productId: string, file: File): Res<IProductImage> => axiosService.post(`${urls.products}/${productId}/add_image`, {image: file}, {headers: {"Content-Type": "multipart/form-data"}}),
    removeImageById: (pk: string): Res<void> => axiosService.delete(`${urls.products}/images/${pk}`),

    getCategories: (): Res<IResponse<ICategory>> => axiosService.get(`${urls.products}/categories`),
    createCategory: (categoryTitle: string): Res<ICategory> => axiosService.post(`${urls.products}/categories`, {title: categoryTitle}),
    updateCategory: (title: string, pk: string): Res<ICategory> => axiosService.put(`${urls.products}/categories/${pk}`, {title}),
    removeCategory: (pk: string): Res<void> => axiosService.delete(`${urls.products}/categories/${pk}`),

    getBrands: (): Res<IResponse<IBrand>> => axiosService.get(`${urls.products}/brands`),
    createBrand: (brand: IBrand): Res<IBrand> => axiosService.post(`${urls.products}/brands`, {...brand}, {headers: {"Content-Type": "multipart/form-data"}}),
    updateBrand: (data: Partial<IBrand>, pk: string): Res<IBrand> => axiosService.patch(`${urls.products}/brands/${pk}`, {...data}, {headers: {"Content-Type": "multipart/form-data"}}),
    removeBrand: (pk: string): Res<void> => axiosService.delete(`${urls.products}/brands/${pk}`),

    getClientComments: (): Res<IResponse<IComment>> => axiosService.get(`${urls.products}/user/comments`),
    addComment: (text: string, pk: string): Res<IComment> => axiosService.post(`${urls.products}/${pk}/add_comment`, {text}),
    deleteComment: (pk: string): Res<void> => axiosService.delete(`${urls.products}/comments/${pk}`,),
}

export {productService}