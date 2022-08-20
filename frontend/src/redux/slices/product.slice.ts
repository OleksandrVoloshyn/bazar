import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {productService} from "../../services";
import {IBrand, ICategory, IProduct, IProductDetails, IQueryParams, IResponce} from "../../interfaces";

interface IState {
    prev: boolean,
    next: boolean,
    total_items: number | null,
    total_pages: number | null,
    products: IProduct[],
    categories: ICategory[],
    brands: IBrand[],
    chosenProduct: IProductDetails | null
}

const initialState: IState = {
    prev: false,
    next: false,
    total_items: null,
    total_pages: null,
    products: [],
    categories: [],
    brands: [],
    chosenProduct: null
}

const getAll = createAsyncThunk<IResponce<IProduct>, { QueryParamsObj: Partial<IQueryParams> }>(
    'productSlice/getAll',
    async (QueryParamsObj) => {
        const {data} = await productService.getAll(QueryParamsObj);
        return data
    }
);

const create = createAsyncThunk<any, { product: Partial<IProductDetails> }>(
    'productSlice/create',
    async ({product}) => {
        const {data} = await productService.create(product)
        return data
    }
)

const getMyProducts = createAsyncThunk<IResponce<IProduct>, void>(
    'productSlice/getMyProducts',
    async () => {
        const {data} = await productService.getMyProducts()
        return data
    }
)

const getById = createAsyncThunk<IProductDetails, { pk: string }>(
    'productSlice/getById',
    async ({pk}) => {
        const {data} = await productService.getById(pk)
        return data
    }
)

const getCategories = createAsyncThunk<IResponce<ICategory>, void>(
    'productSlice/getCategories',
    async () => {
        const {data} = await productService.getCategories();
        console.log(data)
        return data
    }
)

const getBrands = createAsyncThunk<IResponce<IBrand>, void>(
    'productSlice/getBrands',
    async () => {
        const {data} = await productService.getBrands()
        return data
    }
)

const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.products = action.payload.data
                state.prev = action.payload.prev
                state.next = action.payload.next
                state.total_items = action.payload.total_items
                state.total_pages = action.payload.total_pages
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categories = action.payload.data
            })
            .addCase(getBrands.fulfilled, (state, action) => {
                state.brands = action.payload.data
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.chosenProduct = action.payload
            })
            .addCase(getMyProducts.fulfilled, (state, action) => {
                state.prev = action.payload.prev
                state.next = action.payload.next
                state.products = action.payload.data
                state.total_items = action.payload.total_items
                state.total_pages = action.payload.total_pages
            })
    }
});

const {reducer: productReducer} = productSlice;
const productActions = {getAll, getCategories, getBrands, getById, create, getMyProducts}

export {productReducer, productActions}