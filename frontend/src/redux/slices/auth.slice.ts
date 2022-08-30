import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {authService, userService} from "../../services";
import {IToken, IUser} from "../../interfaces";
import {AxiosError} from "axios";

// todo add ts
// todo remove some init states
interface IRegisterErrors {
    email: string[],
    profile: string[]
}

interface IState {
    registerErrors?: Partial<IRegisterErrors>
    isSentActivatedMail: boolean,
    isSuccessActivated?: boolean,
    activatedError?: string,

    isSentRecoveryMail: boolean,
    isRecoveryMailError: boolean,
    isChangePasswordError: boolean,

    isLoginError: boolean,
    isAuth: boolean,
}

const initialState: IState = {
    registerErrors: undefined,
    isSentActivatedMail: false,
    isSuccessActivated: undefined,
    activatedError: undefined,

    isSentRecoveryMail: false,
    isRecoveryMailError: false,
    isChangePasswordError: false,

    isLoginError: false,
    isAuth: false
}

const register = createAsyncThunk<void, { user: IUser }>(
    'authSlice/register',
    async ({user}, {rejectWithValue}) => {
        try {
            await userService.create(user);
        } catch (e) {
            const axErr = e as AxiosError
            return rejectWithValue(axErr.response?.data)
        }
    }
)

const activate = createAsyncThunk<void, { token: string }>(
    'authSlice/activate',
    async ({token}, {rejectWithValue}) => {
        try {
            await authService.activate(token)
        } catch (e) {
            const axiosErr = e as AxiosError
            return rejectWithValue(axiosErr.response?.data)
        }
    }
)

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

const login = createAsyncThunk<IToken, { user: Partial<IUser> }>(
    'authSlice/login',
    async ({user}) => {
        const {data} = await authService.login(user);
        return data;
    }
);


const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        resetErrors: (state) => {
            state.registerErrors = undefined
            state.isLoginError = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state) => {
                state.registerErrors = undefined
                state.isSentActivatedMail = true
            })
            .addCase(register.rejected, (state, action) => {
                state.registerErrors = action.payload as Partial<IRegisterErrors>;
                state.isSentActivatedMail = false
            })

            .addCase(activate.fulfilled, (state) => {
                state.isSuccessActivated = true
            })
            .addCase(activate.rejected, (state, action) => {
                state.isSuccessActivated = false
                const {details} = action.payload as { details: string }
                state.activatedError = details
            })

            .addCase(recovery.fulfilled, state => {
                state.isSentRecoveryMail = true
            })
            .addCase(recovery.rejected, state => {
                state.isSentRecoveryMail = false
                state.isRecoveryMailError = true
            })

            .addCase(changePassword.rejected, state => {
                state.isChangePasswordError = true
            })

            .addCase(login.fulfilled, (state, action) => {
                state.isLoginError = false
                state.isAuth = true
                const {access, refresh} = action.payload;
                localStorage.setItem('access', access)
                localStorage.setItem('refresh', refresh)
            })
            .addCase(login.rejected, (state) => {
                state.isLoginError = true
            })

    }
});

const {reducer: authReducer, actions: {resetErrors}} = authSlice;
const authActions = {register, resetErrors, activate, recovery, changePassword, login}

export {authReducer, authActions}