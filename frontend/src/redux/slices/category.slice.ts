import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {ICategory, IResponse} from "../../interfaces";
import {categoryService} from "../../services";

interface IState {
    categories: ICategory[]
}

const initialState: IState = {
    categories: []
}

const getCategories = createAsyncThunk<IResponse<ICategory>, void>(
    'productSlice/getCategories',
    async () => {
        const {data} = await categoryService.getCategories();
        return data
    }
)

const createCategory = createAsyncThunk<ICategory, { title: string }>(
    'productSlice/createCategory',
    async ({title}) => {
        const {data} = await categoryService.createCategory(title)
        return data
    }
)
const updateCategory = createAsyncThunk<ICategory, { pk: string, title: string }>(
    'productSlice/updateCategory',
    async ({pk, title}) => {
        const {data} = await categoryService.updateCategory(title, pk);
        return data
    }
)
const removeCategory = createAsyncThunk<void, { pk: string }>(
    'productSlice/removeCategory',
    async ({pk}, {dispatch}) => {
        await categoryService.removeCategory(pk)
        dispatch(removeCategoryFromState(pk))
    }
)

const categorySlice = createSlice({
        name: 'categorySlice',
        initialState,
        reducers: {
            removeCategoryFromState: (state, action) => {
                const index = state.categories.findIndex(item => item.id === action.payload);
                state.categories.splice(index, 1)
            },
        },
        extraReducers: (builder) => {
            builder
                .addCase(getCategories.fulfilled, (state, action) => {
                    state.categories = action.payload.data
                })
                .addCase(createCategory.fulfilled, (state, action) => {
                    state.categories.push(action.payload)
                })
                .addCase(updateCategory.fulfilled, (state, action) => {
                    const index = state.categories.findIndex(item => item.id === action.payload.id)
                    state.categories.splice(index, 1, action.payload)
                })
        }
    })
;

const {reducer: categoryReducer, actions: {removeCategoryFromState}} = categorySlice;
const categoryActions = {getCategories, createCategory, updateCategory, removeCategory}

export {categoryReducer, categoryActions}