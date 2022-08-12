import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {authService, localStorageService, userService} from "../../services";
import {IToken, IUser} from "../../interfaces";

interface IState {
    isAuth: null | boolean,
    loginError: boolean,
    isRegister: boolean,
    registerEmailError: null | string
}

const initialState: IState = {
    isAuth: null,
    loginError: false,
    isRegister: false,
    registerEmailError: null

}

const register = createAsyncThunk<any, IUser>(
    'authSlice/register',
    async (user) => {
        await userService.create(user);
    }
)

const login = createAsyncThunk<IToken, Partial<IUser>>(
    'authSlice/login',
    async (user) => {
        const {data} = await authService.login(user);
        return data;
    }
);

const activate = createAsyncThunk<void, string>(
    'authSlice/activate',
    async (token) => {
        await authService.activate(token)
    }
)

const recovery = createAsyncThunk<void, string>(
    'authSlice/recovery',
    async (email) => {
        await authService.sendRecoveryToEmail(email)
    }
)
const changePassword = createAsyncThunk<void, { token: any, newPassword: string }>(
    'authSlice/changePassword',
    async ({token, newPassword}) => {
        await authService.recoveryPassword(token, newPassword)
    }
)

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setAuth: (state) => {
            state.isAuth = true
        },
        setError: (state) => {
            state.loginError = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isAuth = true
                state.loginError = false
                const {access, refresh} = action.payload;
                localStorageService.setAccess(access)
                localStorageService.setRefresh(refresh)
            })
            .addCase(login.rejected, (state) => {
                state.loginError = true
            })
            .addCase(register.fulfilled, (state) => {
                state.isRegister = true
            })
            .addCase(register.rejected, (state) => {
                state.registerEmailError = 'Користувач з даною поштою уже зареєстрований'
            })
    }
});

const {reducer: authReducer, actions: {setAuth, setError}} = authSlice;
const authActions = {login, setAuth, setError, activate, register, recovery, changePassword}

export {authReducer, authActions}