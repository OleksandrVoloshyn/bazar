import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IBrand, IResponse} from "../../interfaces";
import {brandService} from "../../services";

interface IState {
    brands: IBrand[]
}

const initialState: IState = {
    brands: []
}

const getBrands = createAsyncThunk<IResponse<IBrand>, void>(
    'productSlice/getBrands',
    async () => {
        const {data} = await brandService.getBrands()
        return data
    }
)
const createBrand = createAsyncThunk<IBrand, { brand: IBrand }>(
    'productSlice/createBrand',
    async ({brand}) => {
        const {data} = await brandService.createBrand(brand)
        return data
    }
)
const updateBrand = createAsyncThunk<IBrand, { newBrandData: IBrand, pk: string }>(
    'productSlice/updateBrand',
    async ({newBrandData, pk}) => {
        const {data} = await brandService.updateBrand(newBrandData, pk)
        return data
    }
)
const removeBrand = createAsyncThunk<void, { pk: string }>(
    'productSlice/removeBrand',
    async ({pk}, {dispatch}) => {
        await brandService.removeBrand(pk)
        dispatch(removeBrandFromState(pk))
    }
)

const brandSlice = createSlice({
    name: 'brandSlice',
    initialState,
    reducers: {
        removeBrandFromState: (state, action) => {
            const index = state.brands.findIndex(item => item.id === action.payload);
            state.brands.splice(index, 1)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBrands.fulfilled, (state, action) => {
                state.brands = action.payload.data
            })
            .addCase(createBrand.fulfilled, (state, action) => {
                state.brands.push(action.payload)
            })
            .addCase(updateBrand.fulfilled, (state, action) => {
                const index = state.brands.findIndex(item => item.id === action.payload.id)
                state.brands.splice(index, 1, action.payload)
            })
    }
});

const {reducer: brandReducer, actions: {removeBrandFromState}} = brandSlice;
const brandActions = {getBrands, createBrand, updateBrand, removeBrand}

export {brandReducer, brandActions}