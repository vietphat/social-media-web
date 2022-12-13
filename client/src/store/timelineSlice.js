import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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
        likePost(state, action) {
            state.posts[state.posts.findIndex((post) => post._id === action.payload._id)] = action.payload;
        },
        unlikePost(state, action) {
            const unlikedPostIndex = state.posts.findIndex((post) => post._id === action.payload.postId);

            state.posts[unlikedPostIndex].likes.splice(action.payload.userId, 1);
        },
        addComment(state, action) {
            state.posts[action.payload.postIndex].comments.push(action.payload.comment);
        },
        likeComment(state, action) {
            state.posts[action.payload.postIndex].comments[action.payload.commentIndex] = action.payload.comment;
        },
        unlikeComment(state, action) {
            state.posts[action.payload.postIndex].comments[action.payload.commentIndex].likes.splice(
                action.payload.likeIndex,
                1,
            );
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

export const { setTimelinePosts, createPost, likePost, unlikePost, addComment, likeComment, unlikeComment } =
    timelineSlice.actions;

export default timelineSlice.reducer;
