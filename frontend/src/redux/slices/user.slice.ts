import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {IUser, IUserProfile} from "../../interfaces";
import {userService} from "../../services";

interface IState {
    user?: IUser,
    users?: IUser[],
    userForRemove?: IUser,
    userNotFound: boolean
}

const initialState: IState = {
    user: undefined,
    users: [],
    userForRemove: undefined,
    userNotFound: false
}

const getCurrent = createAsyncThunk<IUser, void>(
    'userSlice/getCurrent',
    async () => {
        const {data} = await userService.current();
        return data
    }
);

const getCandidate = createAsyncThunk<IUser, string>(
    'userSlice/getCandidate',
    async (userEmail) => {
        const {data} = await userService.getForRemove(userEmail)
        return data
    }
)

const updateAccount = createAsyncThunk<IUserProfile, Partial<IUserProfile>>(
    'userSlice/updateAccount',
    async (body) => {
        const {data} = await userService.updateProfile(body)
        return data
    }
)

const toAdmin = createAsyncThunk<IUser, string>(
    'userSlice/toAdmin',
    async (id) => {
        const {data} = await userService.toAdmin(id)
        return data
    }
)
const toLower = createAsyncThunk<IUser, string>(
    'userSlice/toLower',
    async (id) => {
        const {data} = await userService.toLower(id)
        return data
    }
)

const removeUser = createAsyncThunk<void, string>(
    'userSlice/removeUser',
    async (pk) => {
        await userService.removeUser(pk)
    }
)

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCurrent.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(updateAccount.fulfilled, (state, action) => {
                if (state.user) {
                    state.user.profile = action.payload
                }
            })
            .addCase(getCandidate.fulfilled, (state, action) => {
                state.userForRemove = action.payload
                state.userNotFound = false
            })
            .addCase(getCandidate.rejected, (state, action) => {
                state.userNotFound = true
            })
            .addCase(removeUser.fulfilled, (state) => {
                state.userForRemove = undefined
            })
            .addCase(toAdmin.fulfilled, (state, action) => {
                state.userForRemove = action.payload
            })
            .addCase(toLower.fulfilled, (state, action) => {
                state.userForRemove = action.payload
            })
    }
});


const {reducer: userReducer} = userSlice;
const userActions = {getCurrent, updateAccount, getCandidate, removeUser, toAdmin, toLower}

export {userReducer, userActions}