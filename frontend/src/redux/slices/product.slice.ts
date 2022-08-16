import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {productService} from "../../services";

interface IState {
    prev: any,
    next: any,
    total_items: any,
    total_pages: any,
    products: []
}

const initialState: IState = {
    prev: null,
    next: null,
    total_items: null,
    total_pages: null,
    products: []
}

const getAll = createAsyncThunk(
    'productSlice/getAll',
    async () => {
        const {data} = await productService.getAll();
        return data
    }
);

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
    }
});

const {reducer: productReducer} = productSlice;
const productActions = {getAll}

export {productReducer, productActions}