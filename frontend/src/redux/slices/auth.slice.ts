import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {authService, userService} from "../../services";
import {IToken, IUser} from "../../interfaces";

interface IState {
    registerErrors: null | any
    isSentActivatedMail: boolean,
    isSuccessActivated: null | boolean,
    isAuth: null | boolean,
    loginError: null | boolean,
    isSentRecoveryMail: boolean,
    hasSentRecoveryMailError: null | boolean
}

const initialState: IState = {
    registerErrors: null,
    isSentActivatedMail: false,
    isSuccessActivated: null,
    isAuth: null,
    loginError: null,
    isSentRecoveryMail: false,
    hasSentRecoveryMailError: null
}

const register = createAsyncThunk<any, { user: IUser }>(
    'authSlice/register',
    async ({user}) => {
        try {
            await userService.create(user);
        } catch (e: any) {
            //    here can be error with the same email
            return e.response.data
        }
    }
)

const activate = createAsyncThunk<void, { token: string }>(
    'authSlice/activate',
    async ({token}) => {
        await authService.activate(token)
    }
)

const login = createAsyncThunk<IToken, { user: Partial<IUser> }>(
    'authSlice/login',
    async ({user}) => {
        const {data} = await authService.login(user);
        return data;
    }
);

const recovery = createAsyncThunk<void, { email: string }>(
    'authSlice/recovery',
    async ({email}) => {
        await authService.sendRecoveryToEmail(email)
    }
)
const changePassword = createAsyncThunk<void, { token: string, newPassword: string }>(
    'authSlice/changePassword',
    async ({token, newPassword}) => {
        await authService.recoveryPassword(token, newPassword)
    }
)

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.isAuth = action.payload
        },
        setError: (state) => {
            state.registerErrors = null
            state.loginError = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isSentActivatedMail = false
                    state.registerErrors = action.payload
                } else {
                    state.registerErrors = null
                    state.isSentActivatedMail = true
                }
            //    todo how to get error in regected case
            //     action.error
            //    todo check lection
            })
            .addCase(activate.fulfilled, state => {
                state.isSuccessActivated = true
            })
            .addCase(activate.rejected, state => {
                state.isSuccessActivated = false
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isAuth = true
                state.loginError = false
                const {access, refresh} = action.payload;
                localStorage.setItem('access', access)
                localStorage.setItem('refresh', refresh)
            })
            .addCase(login.rejected, (state) => {
                state.loginError = true
            })
            .addCase(recovery.fulfilled, state => {
                state.isSentRecoveryMail = true
                state.hasSentRecoveryMailError = false
                localStorage.setItem('doRecovery', 'true')
            })
            .addCase(recovery.rejected, state => {
                state.isSentRecoveryMail = false
                state.hasSentRecoveryMailError = true
            })
    }
});

const {reducer: authReducer, actions: {setAuth, setError,}} = authSlice;
const authActions = {login, setAuth, setError, activate, register, recovery, changePassword}

export {authReducer, authActions}