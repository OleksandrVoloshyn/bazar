import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {productService} from "../../services";

interface IState {
    prev: any,
    next: any,
    total_items: any,
    total_pages: any,
    products: [],
    categories: [],
    brands: [],
    chosenProduct: any
}

const initialState: IState = {
    prev: null,
    next: null,
    total_items: null,
    total_pages: null,
    products: [],
    categories: [],
    brands: [],
    chosenProduct: null
}

const getAll = createAsyncThunk<any, any>(
    'productSlice/getAll',
    async (QueryParamsObj) => {
        const {data} = await productService.getAll(QueryParamsObj);
        return data
    }
);

const getById = createAsyncThunk<any, any>(
    'productSlice/getById',
    async (pk) => {
        const {data} = await productService.getById(pk)
        return data
    }
)

const getCategories = createAsyncThunk(
    'productSlice/getCategories',
    async () => {
        const {data} = await productService.getCategories();
        return data
    }
)

const getBrands = createAsyncThunk(
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
    }
});

const {reducer: productReducer} = productSlice;
const productActions = {getAll, getCategories, getBrands, getById}

export {productReducer, productActions}