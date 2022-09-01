import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {productService} from "../../services";
import {IBrand, ICategory, IComment, IProduct, IProductDetails, IQueryParams, IResponse} from "../../interfaces";
import {string} from "joi";

interface IState {
    prev: boolean,
    next: boolean,
    total_items: number | null,
    total_pages: number | null,
    products: IProduct[],
    categories: ICategory[],
    brands: IBrand[],
    chosenProduct: IProductDetails | null,
    orders: IProduct[],
    myComments: IComment[],
}


const initialState: IState = {
    prev: false,
    next: false,
    total_items: null,
    total_pages: null,
    products: [],
    categories: [],
    brands: [],
    chosenProduct: null,
    orders: [],
    myComments: [],
}

// todo TS
//todo change orders
const getAll = createAsyncThunk<IResponse<IProduct>, { QueryParamsObj: Partial<IQueryParams> }>(
    'productSlice/getAll',
    async ({QueryParamsObj}) => {
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

const addProductImage = createAsyncThunk<any, { productId: string, file: File }>(
    'productSlice/addProductImage',
    async ({productId, file}) => {
        const {data} = await productService.addProductImage(productId, file)
        return data
    }
)

const update = createAsyncThunk<void, Partial<IProductDetails>>(
    'productSlice/update',
    async (product) => {
        await productService.update(product)
    }
)
const addComment = createAsyncThunk<any, { text: string, pk: string }>(
    'productSlice/addComment',
    async ({text, pk}) => {
        const {data} = await productService.addComment(text, pk)
        return data
    }
)

const getMyProducts = createAsyncThunk<IResponse<IProduct>, void>(
    'productSlice/getMyProducts',
    async () => {
        const {data} = await productService.getMyProducts()
        return data
    }
)

const getMyComments = createAsyncThunk(
    'productSlice/getMyComments',
    async () => {
        const {data} = await productService.getMyComments()
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

const getCategories = createAsyncThunk<IResponse<ICategory>, void>(
    'productSlice/getCategories',
    async () => {
        const {data} = await productService.getCategories();
        return data
    }
)
const createCategory = createAsyncThunk<ICategory, { categoryTitle: string }>(
    'productSlice/createCategory',
    async ({categoryTitle}) => {
        const {data} = await productService.createCategory(categoryTitle)
        return data
    }
)
const updateCategory = createAsyncThunk<ICategory, { pk: string, title: string }>(
    'productSlice/updateCategory',
    async ({pk, title}) => {
        const {data} = await productService.updateCategory(title, pk);
        return data
    }
)
const removeCategory = createAsyncThunk<void, { pk: string }>(
    'productSlice/removeCategory',
    async ({pk}, {dispatch}) => {
        await productService.removeCategory(pk)
        dispatch(removeCategoryFromState(pk))
    }
)

const getBrands = createAsyncThunk<IResponse<IBrand>, void>(
    'productSlice/getBrands',
    async () => {
        const {data} = await productService.getBrands()
        return data
    }
)
const createBrand = createAsyncThunk<IBrand, { newBrand: IBrand }>(
    'productSlice/createBrand',
    async ({newBrand}) => {
        const {data} = await productService.createBrand(newBrand)
        return data
    }
)
const updateBrand = createAsyncThunk<IBrand, { newBrandData: Partial<IBrand>, pk: string }>(
    'productSlice/updateBrand',
    async ({newBrandData, pk}) => {
        const {data} = await productService.updateBrand(newBrandData, pk)
        return data
    }
)
const removeBrand = createAsyncThunk<void, { pk: string }>(
    'productSlice/removeBrand',
    async ({pk}, {dispatch}) => {
        await productService.removeBrand(pk)
        dispatch(removeBrandFromState(pk))
    }
)

const removeProduct = createAsyncThunk<string, { pk: string }>(
    'productSlice/removeProduct',
    async ({pk}) => {
        await productService.removeById(pk)
        return pk
    }
)
const removeProductImage = createAsyncThunk<string, { pk: string }>(
    'productSlice/removeProductImage',
    async ({pk}) => {
        await productService.removeImageById(pk)
        return pk
    }
)

const deleteComment = createAsyncThunk<string, { pk: string }>(
    'productSlice/deleteComment',
    async ({pk}) => {
        await productService.deleteComment(pk)
        return pk
    }
)

const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        removeCategoryFromState: (state, action) => {
            const index = state.categories.findIndex(item => item.id === action.payload);
            state.categories.splice(index, 1)
        },
        removeBrandFromState: (state, action) => {
            const index = state.brands.findIndex(item => item.id === action.payload);
            state.brands.splice(index, 1)
        },

        //todo orders to local storage
        addToOrder: (state, action) => {
            // let isInOrders = false
            // state.orders.forEach(item => (item.id === action.payload.id) && (isInOrders = true))
            state.orders.forEach(item => (item.id === action.payload.id) && state.orders.push(action.payload))
            // !isInOrders && state.orders.push(action.payload)
        },
        deleteFromOrder: (state, action) => {
            const index = state.orders.findIndex(item => item.id === action.payload.id);
            state.orders.splice(index, 1)
        }
    },
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
            .addCase(createCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload)
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                const index = state.categories.findIndex(item => item.id === action.payload.id)
                state.categories.splice(index, 1, action.payload)
            })

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
            .addCase(addComment.fulfilled, (state, action) => {
                state.chosenProduct?.comments.push(action.payload)
            })
            .addCase(removeProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(item => item.id === action.payload);
                state.products.splice(index, 1)
            })
            .addCase(getMyComments.fulfilled, (state, action) => {
                state.myComments = action.payload.data
                state.prev = action.payload.prev
                state.next = action.payload.next
                state.total_items = action.payload.total_items
                state.total_pages = action.payload.total_pages
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                const index = state.myComments.findIndex(item => item.id === action.payload);
                state.myComments.splice(index, 1)
            })
            .addCase(removeProductImage.fulfilled, (state, action) => {
                if (state.chosenProduct && state.chosenProduct.images) {
                    const index = state.chosenProduct.images.findIndex(item => item.id === action.payload)
                    state.chosenProduct.images.splice(index, 1)
                }
            })
            .addCase(addProductImage.fulfilled, (state, action) => {
                if (state.chosenProduct && state.chosenProduct.images) {
                    state.chosenProduct.images.push(action.payload)
                }
            })
    }
});

const {
    reducer: productReducer,
    actions: {removeCategoryFromState, removeBrandFromState, addToOrder, deleteFromOrder}
} = productSlice;
const productActions = {
    getAll,
    getCategories,
    getBrands,
    getById,
    create,
    getMyProducts,
    addComment,
    addToOrder,
    deleteFromOrder,
    removeProduct,
    getMyComments,
    deleteComment,
    update,
    removeProductImage,
    addProductImage,
    removeCategory,
    createCategory,
    removeBrand,
    createBrand,
    removeCategoryFromState,
    updateCategory,
    removeBrandFromState,
    updateBrand
}

export {productReducer, productActions}