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
        // subscribe(state, action) {
        //   // un
        //   if (state.currentUser.subscribedUsers.includes(action.payload)) {
        //     state.currentUser.subscribedUsers.splice(
        //       state.currentUser.subscribedUsers.findIndex(
        //         (channelId) => channelId === action.payload
        //       ),
        //       1
        //     );
        //     //sub
        //   } else {
        //     state.currentUser.subscribedUsers.push(action.payload);
        //   }
        // },
    },
});

export const { loginStart, loginSuccess, loginFailed, logout } = userSlice.actions;

export default userSlice.reducer;
