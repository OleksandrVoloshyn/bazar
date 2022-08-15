import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IUser} from "../../interfaces";
import {userService} from "../../services";

interface IState {
    user?: IUser
}

const initialState: IState = {
    user: undefined
}

const getCurrent = createAsyncThunk<IUser, void>(
    'userSlice/getCurrent',
    async () => {
        const {data} = await userService.current();
        return data
    }
);

const updateAccount = createAsyncThunk<any, any>(
    'userSlice/updateAccount',
    async (body) => {
        const {data} = await userService.updateProfile(body)
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
                state.user = action.payload
            })
            .addCase(updateAccount.fulfilled, (state, action) => {
                if (state.user) {
                    state.user.profile = action.payload
                }
                console.log(action.payload)
            })
    }
});


const {reducer: userReducer} = userSlice;
const userActions = {getCurrent, updateAccount}

export {userReducer, userActions}