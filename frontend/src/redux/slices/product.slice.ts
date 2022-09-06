import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {productService} from "../../services";
import {IComment, IProduct, IProductDetails, IProductImage, IQueryParams, IResponse} from "../../interfaces";

interface IState {
    products?: IResponse<IProduct>,
    chosenProduct?: IProductDetails,
    myComments?: IResponse<IComment>,
    orders: IProduct[],
}


const initialState: IState = {
    products: undefined,
    chosenProduct: undefined,
    myComments: undefined,
    orders: [],
}

const getAll = createAsyncThunk<IResponse<IProduct>, { QueryParamsObj: Partial<IQueryParams> }>(
    'productSlice/getAll',
    async ({QueryParamsObj}) => {
        const {data} = await productService.getProducts(QueryParamsObj);
        return data
    }
);
const getClientProducts = createAsyncThunk<void, Partial<IQueryParams>>(
    'productSlice/getClientProducts',
    async (params, {dispatch}) => {
        const {data} = await productService.getClientProducts(params);
        dispatch(appendProducts(data))
    }
)
const getProductById = createAsyncThunk<IProductDetails, { pk: string }>(
    'productSlice/getProductById',
    async ({pk}) => {
        const {data} = await productService.getProductById(pk)
        return data
    }
)
const createProduct = createAsyncThunk<void, { product: Partial<IProductDetails> }>(
    'productSlice/createProduct',
    async ({product}) => {
        await productService.createProduct(product)
    }
)
const updateProduct = createAsyncThunk<IProductDetails, Partial<IProductDetails>>(
    'productSlice/updateProduct',
    async (product) => {
        const {data} = await productService.updateProduct(product);
        return data
    }
)
const removeProduct = createAsyncThunk<void, { pk: string }>(
    'productSlice/removeProduct',
    async ({pk}, {dispatch}) => {
        await productService.removeProduct(pk)
        dispatch(removeProductFromState(pk))
    }
)

const addImageToProduct = createAsyncThunk<IProductImage, { productId: string, file: File }>(
    'productSlice/addImageToProduct',
    async ({productId, file}) => {
        const {data} = await productService.addProductImage(productId, file)
        return data
    }
)
const removeProductImage = createAsyncThunk<void, { pk: string }>(
    'productSlice/removeProductImage',
    async ({pk}, {dispatch}) => {
        await productService.removeImageById(pk)
        dispatch(removeChosenProductImageFromState(pk))
    }
)

const getClientComments = createAsyncThunk<IResponse<IComment>, Partial<IQueryParams>>(
    'productSlice/getClientComments',
    async (params) => {
        const {data} = await productService.getClientComments(params)
        return data
    }
)
const addComment = createAsyncThunk<IComment, { text: string, pk: string }>(
    'productSlice/addComment',
    async ({text, pk}) => {
        const {data} = await productService.addComment(text, pk)
        return data
    }
)
const deleteComment = createAsyncThunk<void, { pk: string }>(
    'productSlice/deleteComment',
    async ({pk}, {dispatch}) => {
        await productService.deleteComment(pk)
        dispatch(removeCommentFromState(pk))
    }
)
const addToBasket = createAsyncThunk<IProduct, IProduct>(
    'productSlice/addToBasket',
    async (product, {dispatch}) => {
        await dispatch(getBasket())
        return product
    }
)

const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        removeProductFromState: (state, action) => {
            if (state.products) {
                const index = state.products.data.findIndex(item => item.id === action.payload);
                state.products.data.splice(index, 1)
            }
        },
        clearProducts: state => {
            state.products = undefined
        },
        removeChosenProductFromState: (state) => {
            state.chosenProduct = undefined
        },
        removeChosenProductImageFromState: (state, action) => {
            if (state.chosenProduct && state.chosenProduct.images) {
                const index = state.chosenProduct.images.findIndex(item => item.id === action.payload)
                state.chosenProduct.images.splice(index, 1)
            }
        },
        removeCommentFromState: (state, action) => {
            if (state.chosenProduct) {
                const index = state.chosenProduct?.comments.findIndex(item => item.id === action.payload)
                state.chosenProduct.comments?.splice(index, 1)
            }
        },
        appendProducts: (state, action) => {
            state.products = action.payload
        },

        getBasket: (state) => {
            const jsonBasket = localStorage.getItem('basket');
            state.orders = jsonBasket?.length ? JSON.parse(jsonBasket) : []
        },
        removeFromBasket: (state, action) => {
            const index = state.orders.findIndex(item => item.id === action.payload.id);
            state.orders.splice(index, 1)
            localStorage.setItem('basket', JSON.stringify(state.orders))
        },
        clearBasket: (state) => {
            state.orders = []
            localStorage.removeItem('basket')
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.products = action.payload
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.chosenProduct = action.payload
            })
            .addCase(addImageToProduct.fulfilled, (state, action) => {
                if (state.chosenProduct && state.chosenProduct.images) {
                    state.chosenProduct.images.push(action.payload)
                }
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                if (state.products) {
                    const index = state.products.data.findIndex(item => item.id === action.payload.id);
                    state.products.data.splice(index, 1, action.payload)
                }
            })

            .addCase(getClientComments.fulfilled, (state, action) => {
                state.myComments = action.payload
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.chosenProduct?.comments.push(action.payload)
            })

            .addCase(addToBasket.fulfilled, (state, action) => {
                let isInBasket = false
                state.orders.forEach(item => (item.id === action.payload.id) && (isInBasket = true))
                !isInBasket && state.orders.push(action.payload)
                localStorage.setItem('basket', JSON.stringify(state.orders))
            })
    }
});

const {
    reducer: productReducer,
    actions: {
        appendProducts,
        removeProductFromState,
        removeFromBasket,
        removeChosenProductFromState,
        removeChosenProductImageFromState,
        removeCommentFromState,
        getBasket,
        clearBasket,
        clearProducts
    }
} = productSlice;

const productActions = {
    clearBasket,
    getAll,
    getProductById,
    createProduct,
    getClientProducts,
    addComment,
    addToBasket,
    removeFromBasket,
    removeProduct,
    getClientComments,
    deleteComment,
    updateProduct,
    removeProductImage,
    addImageToProduct,
    appendProducts,
    removeProductFromState,
    removeChosenProductFromState,
    removeChosenProductImageFromState,
    removeCommentFromState,
    getBasket,
    clearProducts
}

export {productReducer, productActions}