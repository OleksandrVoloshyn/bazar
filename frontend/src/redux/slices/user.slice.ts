import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IUser, IUserProfile} from "../../interfaces";
import {userService} from "../../services";

interface IState {
    user: IUser | null
}

const initialState: IState = {
    user: null
}

const getCurrent = createAsyncThunk<IUser, void>(
    'userSlice/getCurrent',
    async () => {
        const {data} = await userService.current();
        return data
    }
);

const addAvatar = createAsyncThunk<any, any>(
    'userSlice/addAvatar',
    async ({avatar}) => {
        await userService.addAvatar(avatar)
    }
)

const updateAccount = createAsyncThunk<Partial<IUserProfile>, { body: Partial<IUserProfile> }>(
    'userSlice/updateAccount',
    async ({body}) => {
        // @ts-ignore
        const {data} = userService.update(body)
        return data
    }
)

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCurrent.fulfilled, (state, action) => {
                // @ts-ignore
                state.user = action.payload
            })
            .addCase(addAvatar.fulfilled, (state, action) => {
                if (state.user) {
                    state.user.profile.avatar = action.payload
                }
            })
            .addCase(updateAccount.fulfilled, (state, action) => {
                // @ts-ignore
                state.user.profile = action.payload
            })
    }
});


const {reducer: userReducer} = userSlice;
const userActions = {getCurrent, addAvatar, updateAccount}

export {userReducer, userActions}