import {IProduct} from "./product.interface";
import {IUser} from "./user.interface";

export interface IComment {
    id: string,
    text: string,
    created_at: string,
    product: IProduct,
    owner: IUser
}