import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IResponse, IUser, IUserProfile} from "../../interfaces";
import {userService} from "../../services";

interface IState {
    user?: IUser,
    updateProfileErrors?: string
    users?: IResponse<IUser>,
    candidate?: IUser
}


const initialState: IState = {
    user: undefined,
    updateProfileErrors: undefined,
    users: undefined,
    candidate: undefined
}

const getCurrent = createAsyncThunk<IUser, void>(
    'userSlice/getCurrent',
    async () => {
        const {data} = await userService.getCurrent();
        return data
    }
);
const getById = createAsyncThunk<IUser, { pk: string }>(
    'userSlice/getById',
    async ({pk}) => {
        const {data} = await userService.getById(pk);
        return data
    }
)
const searchUsers = createAsyncThunk<IResponse<IUser>, { searchValue: string, page: string }>(
    'userSlice/searchUsers',
    async ({searchValue, page}) => {
        const {data} = await userService.searchUsers({search: searchValue, page})
        return data
    }
);

const updateProfile = createAsyncThunk<IUserProfile, Partial<IUserProfile>>(
    'userSlice/updateProfile',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await userService.updateProfile(body)
            return data
        } catch (e) {
            const axErr = e as AxiosError
            return rejectWithValue(axErr.response?.data)
        }

    }
)
const toAdmin = createAsyncThunk<IUser, { pk: string }>(
    'userSlice/toAdmin',
    async ({pk}) => {
        const {data} = await userService.toAdmin(pk)
        return data
    }
)
const toLower = createAsyncThunk<IUser, { pk: string }>(
    'userSlice/toLower',
    async ({pk}) => {
        const {data} = await userService.toLower(pk)
        return data
    }
)

const removeUser = createAsyncThunk<void, { pk: string }>(
    'userSlice/removeUser',
    async ({pk}, {dispatch}) => {
        await userService.removeUser(pk)
        dispatch(removeCandidate())
    }
)

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        makeCandidate: (state, action: PayloadAction<IUser>) => {
            state.candidate = action.payload
        },
        resetCandidate: state => {
            state.candidate = undefined
        },
        resetUsers: state => {
            state.users = undefined
        },
        removeCandidate: (state) => {
            if (state.users) {
                const index = state.users.data.findIndex(item => item.id == state.candidate?.id);
                state.users.data.splice(index, 1)
            }
            state.candidate = undefined
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCurrent.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.candidate = action.payload
            })
            .addCase(searchUsers.fulfilled, (state, action) => {
                state.users = action.payload
                state.candidate = undefined
            })

            .addCase(updateProfile.fulfilled, (state, action) => {
                state.updateProfileErrors = undefined
                state.user && (state.user.profile = action.payload)
            })
            .addCase(updateProfile.rejected, (state, action) => {
                const {name} = action.payload as { name: string[] }
                state.updateProfileErrors = name[0]
            })

            .addCase(toAdmin.fulfilled, (state, action) => {
                state.candidate && (state.candidate.is_staff = true)
            })
            .addCase(toLower.fulfilled, (state, action) => {
                state.candidate && (state.candidate.is_staff = false)
            })
    }
});


const {reducer: userReducer, actions: {makeCandidate, resetCandidate, resetUsers, removeCandidate}} = userSlice;
const userActions = {
    getCurrent,
    updateProfile,
    searchUsers,
    makeCandidate,
    resetCandidate,
    toAdmin,
    toLower,
    removeUser,
    resetUsers,
    getById
}

export {userReducer, userActions}