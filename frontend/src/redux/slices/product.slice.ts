import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {productService} from "../../services";
import {
    IBrand,
    ICategory,
    IComment,
    IProduct,
    IProductDetails,
    IProductImage,
    IQueryParams,
    IResponse
} from "../../interfaces";

interface IState {
    brands: IBrand[],
    categories: ICategory[],
    products?: IResponse<IProduct>,
    chosenProduct?: IProductDetails,

    orders: IProduct[],
    myComments?: IResponse<IComment>,
}


const initialState: IState = {
    brands: [],
    categories: [],
    products: undefined,
    chosenProduct: undefined,

    orders: [],
    myComments: undefined,
}

const getAll = createAsyncThunk<IResponse<IProduct>, { QueryParamsObj: Partial<IQueryParams> }>(
    'productSlice/getAll',
    async ({QueryParamsObj}) => {
        const {data} = await productService.getAll(QueryParamsObj);
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


const addComment = createAsyncThunk<any, { text: string, pk: string }>(
    'productSlice/addComment',
    async ({text, pk}) => {
        const {data} = await productService.addComment(text, pk)
        return data
    }
)
const getClientComments = createAsyncThunk<IResponse<IComment>, void>(
    'productSlice/getClientComments',
    async () => {
        const {data} = await productService.getClientComments()
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
        removeProductFromState: (state, action) => {
            if (state.products) {
                const index = state.products.data.findIndex(item => item.id === action.payload);
                state.products.data.splice(index, 1)
            }
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

        addToOrder: (state, action) => {
            state.orders.forEach(item => (item.id === action.payload.id) && state.orders.push(action.payload))
        },
        deleteFromOrder: (state, action) => {
            const index = state.orders.findIndex(item => item.id === action.payload.id);
            state.orders.splice(index, 1)
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

            .addCase(getClientComments.fulfilled, (state, action) => {
                state.myComments = action.payload
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.chosenProduct?.comments.push(action.payload)
            })
    }
});

const {
    reducer: productReducer,
    actions: {
        removeCategoryFromState,
        removeBrandFromState,
        appendProducts,
        removeProductFromState,
        addToOrder,
        deleteFromOrder,
        removeChosenProductFromState,
        removeChosenProductImageFromState,
        removeCommentFromState
    }
} = productSlice;

const productActions = {
    getAll,
    getCategories,
    getBrands,
    getProductById,
    createProduct,
    getClientProducts,
    addComment,
    addToOrder,
    deleteFromOrder,
    removeProduct,
    getClientComments,
    deleteComment,
    updateProduct,
    removeProductImage,
    addImageToProduct,
    removeCategory,
    createCategory,
    removeBrand,
    createBrand,
    removeCategoryFromState,
    updateCategory,
    removeBrandFromState,
    updateBrand,
    appendProducts,
    removeProductFromState,
    removeChosenProductFromState,
    removeChosenProductImageFromState,
    removeCommentFromState
}
//todo remove useless from export

export {productReducer, productActions}