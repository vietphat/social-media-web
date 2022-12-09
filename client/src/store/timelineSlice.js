import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import store from './index';

const initialState = {
    posts: [],
};

const timelineSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setTimelinePosts(state, action) {
            state.posts = action.payload;
        },
        createPost(state, action) {
            state.posts = [action.payload, ...state.posts];
        },
    },
});

export const fetchTimelinePosts = (jwt) => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:8800/api/posts/get-timeline-posts', {
            headers: {
                Authorization: 'Bearer ' + jwt,
            },
        });

        if (res.status === 200) {
            dispatch(timelineSlice.actions.setTimelinePosts(res.data.data));
        }
    };
};

export const { setTimelinePosts, createPost } = timelineSlice.actions;

export default timelineSlice.reducer;
