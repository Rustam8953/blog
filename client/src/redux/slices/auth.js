import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchAuth = createAsyncThunk('/auth/fetchUserData', async (params) => {
    const {data} = await axios.post('/auth/login', params)
    return data;
})

export const fetchReg = createAsyncThunk('/auth/fetchReg', async (params) => {
    const {data} = await axios.post('/auth/reg', params)
    return data;
})

export const fetchAuthMe = createAsyncThunk('/auth/fetchUserMe', async () => {
    const {data} = await axios.get('/auth/me')
    return data;
})

const initialState = {
    data: null,
    status: 'loading'
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        }
    },
    extraReducers: {
        [fetchAuth.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuth.fulfilled]: (state, actions) => {
            state.data = actions.payload;
            state.status = 'loaded';
        },
        [fetchAuth.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
        [fetchAuthMe.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuthMe.fulfilled]: (state, actions) => {
            state.data = actions.payload;
            state.status = 'loaded';
        },
        [fetchAuthMe.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
        [fetchReg.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchReg.fulfilled]: (state, actions) => {
            state.data = actions.payload;
            state.status = 'loaded';
        },
        [fetchReg.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
    }
})

export const selectIsAuth = state => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
export const {logout} = authSlice.actions;