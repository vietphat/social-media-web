import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    jwt: '',
    currentUser: null,
    loading: false,
    error: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart(state) {
            state.loading = true;
        },
        loginSuccess(state, action) {
            state.currentUser = action.payload.currentUser;
            state.jwt = action.payload.jwt;
            state.isLoggedIn = true;
            state.loading = false;
        },
        loginFailed(state) {
            state.loading = false;
            state.error = true;
        },
        logout(state) {
            state.currentUser = null;
            state.jwt = '';
            state.isLoggedIn = false;
            state.loading = false;
            state.error = false;
        },
        follow(state, action) {
            state.currentUser.following = action.payload;
        },
        unfollow(state, action) {
            state.currentUser.following.splice(
                state.currentUser.following.findIndex((item) => item._id === action.payload),
                1,
            );
        },
        replaceUserData(state, action) {
            state.currentUser = action.payload;
        },
    },
});

export const { loginStart, loginSuccess, loginFailed, logout, follow, unfollow, replaceUserData } = userSlice.actions;

export default userSlice.reducer;
