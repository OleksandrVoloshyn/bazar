import {ICategory} from "./category.interface";
import {IUser} from "./user.interface";
import {IBrand} from "./brand.interface";
import {IComment} from "./comment.interface";

export interface IProductImage {
    id: string,
    image: string,
}

export interface IProduct {
    id: string,
    title: string,
    price: number,
    size: string,
    images?: IProductImage[]
}

export interface IProductDetails {
    id: string,
    title: string,
    description: string,
    price: number,
    color: string,
    size: string,
    gender: string,
    created_at: string,
    category: ICategory,
    owner: IUser,
    brand: IBrand,
    comments: IComment[],
    images?: IProductImage[]
}