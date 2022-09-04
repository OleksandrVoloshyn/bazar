import {axiosService, Res} from "./axios.service";

import {IComment, IProduct, IProductDetails, IProductImage, IQueryParams, IResponse} from "../interfaces";
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

    getClientComments: (): Res<IResponse<IComment>> => axiosService.get(`${urls.products}/user/comments`),
    addComment: (text: string, pk: string): Res<IComment> => axiosService.post(`${urls.products}/${pk}/add_comment`, {text}),
    deleteComment: (pk: string): Res<void> => axiosService.delete(`${urls.products}/comments/${pk}`,),
}

export {productService}