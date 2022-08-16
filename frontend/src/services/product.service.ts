import {axiosService} from "./axios.service";
import {urls} from "../constants";

const productService = {
    getAll: () => axiosService.get(urls.products)
}

export {productService}