import {createAsyncThunk, createSlice, isAllOf} from "@reduxjs/toolkit";

import {productService} from "../../services";
import {IBrand, ICategory, IComment, IProduct, IProductDetails, IQueryParams, IResponce} from "../../interfaces";

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
    myComments: IComment[]
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
    myComments: []
}

const getAll = createAsyncThunk<IResponce<IProduct>, { QueryParamsObj: Partial<IQueryParams> }>(
    'productSlice/getAll',
    async ({QueryParamsObj}) => {
        const {data} = await productService.getAll(QueryParamsObj);
        return data
    }
);

const create = createAsyncThunk<any, { product: Partial<IProductDetails> }>(
    'productSlice/create',
    async ({product}) => {
        console.log(product)
        const {data} = await productService.create(product)
        return data
    }
)
const createCategory = createAsyncThunk<any, string>(
    'productSlice/createCategory',
    async (categoryTitle) => {
        const {data} = await productService.createCategory(categoryTitle)
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

const getMyProducts = createAsyncThunk<IResponce<IProduct>, void>(
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

const getCategories = createAsyncThunk<IResponce<ICategory>, void>(
    'productSlice/getCategories',
    async () => {
        const {data} = await productService.getCategories();
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

const removeCategory = createAsyncThunk<string, string>(
    'productSlice/removeCategory',
    async (pk) => {
        await productService.removeCategory(pk)
        return pk
    }
)

const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        addToOrder: (state, action) => {
            let isInOrders = false
            state.orders.forEach(item => (item.id === action.payload.id) && (isInOrders = true))
            !isInOrders && state.orders.push(action.payload)
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
            .addCase(addComment.fulfilled, (state, action) => {
                if (state.chosenProduct) {
                    state.chosenProduct.comments.push(action.payload)
                }
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
            .addCase(removeCategory.fulfilled, (state, action) => {
                const index = state.categories.findIndex(item => item.id === action.payload);
                state.categories.splice(index, 1)
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload)
            })
    }
});

const {reducer: productReducer, actions: {addToOrder, deleteFromOrder}} = productSlice;
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
    createCategory
}

export {productReducer, productActions}